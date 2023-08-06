import * as s3 from "aws-cdk-lib/aws-s3";
import * as cdk from "aws-cdk-lib";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";
import { getAppRootDir } from "../../utils/get-app-root-dir";
interface S3StaticWebsiteProps extends cdk.NestedStackProps {}

export class S3StaticWebsiteStack extends cdk.NestedStack {
  public readonly bucket: s3.Bucket;
  public readonly cloudfrontDistribution: cloudfront.CloudFrontWebDistribution;

  constructor(scope: Construct, id: string, props: S3StaticWebsiteProps) {
    super(scope, id, props);

    const s3BucketWebsite = new s3.Bucket(this, "ChatwaveWebsiteBuket", {
      bucketName: "sudosam.com",
      websiteIndexDocument: "index.html",
      publicReadAccess: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS,
    });

    new s3deploy.BucketDeployment(this, "DeployWebsite", {
      sources: [
        s3deploy.Source.asset(`${getAppRootDir()}/../chatwave-frontend/out`),
      ],
      destinationBucket: s3BucketWebsite,
    });

    const cloudfrontDistribution = new cloudfront.CloudFrontWebDistribution(
      this,
      "chatwave-cloudfront-distribution",
      {
        originConfigs: [
          {
            customOriginSource: {
              domainName: s3BucketWebsite.bucketWebsiteDomainName,
              originProtocolPolicy: cloudfront.OriginProtocolPolicy.HTTP_ONLY,
            },
            behaviors: [{ isDefaultBehavior: true }],
          },
        ],
      }
    );

    this.bucket = s3BucketWebsite;
    this.cloudfrontDistribution = cloudfrontDistribution;
  }
}
