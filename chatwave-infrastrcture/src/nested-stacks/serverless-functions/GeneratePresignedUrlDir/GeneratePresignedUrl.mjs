// @ts-nocheck
import { randomUUID } from "crypto";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { S3Client } from "@aws-sdk/client-s3";

export async function handler(event) {
  const uuid = randomUUID();
  const client = new S3Client({ region: "us-east-1" });
  const Bucket = "assets.chatwave.com";
  const Key = uuid;
  console.log("uuid: ", uuid);
  const { url, fields } = await createPresignedPost(client, {
    Bucket,
    Key,
    Expires: 60 * 5, //Seconds before the presigned post expires. 3600 by default.
  });
  return {
    statusCode: 200,
    body: JSON.stringify({
      url: url,
      fields: fields,
    }),
  };
}
