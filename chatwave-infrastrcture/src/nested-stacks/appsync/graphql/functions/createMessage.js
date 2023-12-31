import { util } from "@aws-appsync/utils";

export function request(ctx) {
  console.log("CTX FOR CREATE MESSAGE", ctx);
  const values = ctx.arguments;
  values.input.key = util.autoId();
  values.input.updatedAt = ctx.stash.currentTime;
  return dynamodbPutRequest(values);
}

export function response(ctx) {
  return ctx.result;
}

/**
 * Helper function to create a new item
 * @returns a PutItem request
 */
function dynamodbPutRequest(values) {
  return {
    operation: "PutItem",
    key: {
      pk: { S: "ROOM#" + values.input.roomId },
      sk: { S: "MSG#" + util.time.nowISO8601() },
    },
    attributeValues: util.dynamodb.toMapValues(values.input),
  };
}
