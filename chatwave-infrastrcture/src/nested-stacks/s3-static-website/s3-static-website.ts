import * as s3 from "aws-cdk-lib/aws-s3";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

interface S3StaticWebsiteProps extends cdk.NestedStackProps {}

export class S3StaticWebsite extends cdk.NestedStack {
  public readonly bucket: s3.Bucket;

  constructor(scope: Construct, id: string, props: S3StaticWebsiteProps) {
    super(scope, id, props);

    const s3Bucket = new s3.Bucket(this, "chatave-static-website", {
      bucketName: "sudosam.com",
      publicReadAccess: true,
      websiteIndexDocument: "index.html",
    });

    this.bucket = s3Bucket;
  }
}
