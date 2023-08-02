import { util } from "@aws-appsync/utils";

export function request(ctx) {
  const values = ctx.arguments;
  const senderId = ctx.identity.claims.sub;
  const otherUserId = ctx.stash.otherUserUuid;
  ctx.stash.currentTime = util.time.nowISO8601();
  const currentTime = ctx.stash.currentTime;
  return dynamoDbUpdateLatestMessage(
    values,
    senderId,
    otherUserId,
    currentTime
  );
}

export function response(ctx) {
  console.log("CTX RESULT FOR UPDATE: ", ctx);
  return ctx.result;
}

function dynamoDbUpdateLatestMessage(
  values,
  senderId,
  otherUserId,
  currentTime
) {
  return {
    operation: "TransactWriteItems",
    transactItems: [
      {
        table: "ChatWave",
        operation: "UpdateItem",
        key: {
          pk: { S: senderId },
          sk: { S: `ROOM#${values.input.roomId}` },
        },
        update: {
          expression: "SET message = :message, updatedAt = :time",
          expressionValues: util.dynamodb.toMapValues({
            ":message": values.input.message,
            ":time": currentTime,
          }),
        },
      },
      {
        table: "ChatWave",
        operation: "UpdateItem",
        key: {
          pk: { S: otherUserId },
          sk: { S: `ROOM#${values.input.roomId}` },
        },
        update: {
          expression: "SET message = :message, updatedAt = :time",
          expressionValues: util.dynamodb.toMapValues({
            ":message": values.input.message,
            ":time": currentTime,
          }),
        },
      },
    ],
  };
}
