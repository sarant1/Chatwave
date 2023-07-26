// @ts-nocheck
import { randomUUID } from "crypto";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { S3Client } from "@aws-sdk/client-s3";

export async function handler(event) {
  console.log(event);
  const client = new S3Client({ region: "us-east-1" });
  const bucket = "assets.chatwave.com";
  const key = randomUUID() + "." + event.headers.type;
  const { url, fields } = await createPresignedPost(client, {
    Bucket: bucket,
    Key: key,
    Expires: 60 * 5, //Seconds before the presigned post expires. 3600 by default.
    ContentDisposition: "inline",
  });
  return {
    statusCode: 200,
    body: JSON.stringify({
      url: url,
      fields: fields,
    }),
  };
}
