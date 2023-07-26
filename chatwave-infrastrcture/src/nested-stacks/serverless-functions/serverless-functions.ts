import path from "path";
import * as cdk from "aws-cdk-lib";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as iam from "aws-cdk-lib/aws-iam";

import { Construct } from "constructs";
interface ServerlessFunctionsNestedStackProps extends cdk.NestedStackProps {
  projectName: string;
}

export class ServerlessFunctionsNestedStack extends cdk.NestedStack {
  public readonly api: apigw.LambdaRestApi;
  public readonly bucket: s3.Bucket;
  public readonly projectName: string;
  public readonly cloudfrontDistribtion: cloudfront.Distribution;

  constructor(
    scope: Construct,
    id: string,
    props: ServerlessFunctionsNestedStackProps
  ) {
    super(scope, id, props);
    this.projectName = props.projectName;
    // bucket container user uploads
    const assetsBucket = new s3.Bucket(
      this,
      `${this.projectName}AssetsBucket`,
      {
        bucketName: `assets.${this.projectName.toLowerCase()}.com`,
      }
    );
    const cloudWatchLogsPolicy = new iam.PolicyDocument({
      statements: [
        new iam.PolicyStatement({
          actions: [
            "logs:CreateLogGroup",
            "logs:CreateLogStream",
            "logs:PutLogEvents",
          ],
          resources: ["arn:aws:logs:*:*:*"],
        }),
      ],
    });
    const lambdaS3AccessPolicy = new iam.PolicyDocument({
      statements: [
        new iam.PolicyStatement({
          actions: ["s3:*"],
          resources: [assetsBucket.bucketArn, `${assetsBucket.bucketArn}/*`],
        }),
      ],
    });
    // lambda function that produces the presigned url to upload to s3
    const generatePresingedUrlLambda = new lambda.Function(
      this,
      `${this.projectName}GeneratePresingedUrlLambda`,
      {
        runtime: lambda.Runtime.NODEJS_18_X,
        handler: "GeneratePresignedUrl.handler",
        code: lambda.Code.fromAsset(
          path.join(__dirname, "GeneratePresignedUrlDir")
        ),
        role: new iam.Role(
          this,
          `${this.projectName}GeneratePresingedUrlRole`,
          {
            assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
            inlinePolicies: {
              s3Access: lambdaS3AccessPolicy,
              cloudWatchLogs: cloudWatchLogsPolicy,
            },
          }
        ),
      }
    );

    const api = new apigw.LambdaRestApi(
      this,
      `${this.projectName}GetPresignedUrl`,
      {
        handler: generatePresingedUrlLambda,
        proxy: true,
      }
    );
    // cloudfront distribution for assets buckets
    const assetsBucketDistribution = new cloudfront.Distribution(
      this,
      "AssetsBucketDistribution",
      {
        defaultBehavior: { origin: new origins.S3Origin(assetsBucket) },
      }
    );
    this.api = api;
    this.bucket = assetsBucket;
    this.cloudfrontDistribtion = assetsBucketDistribution;
  }
}
