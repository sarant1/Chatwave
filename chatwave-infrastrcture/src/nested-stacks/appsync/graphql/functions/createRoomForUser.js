import { util } from "@aws-appsync/utils";

export function request(ctx) {
  const values = ctx.arguments;
  values.input.user = ctx.identity.claims.email;
  values.input.latestMessageTime = util.time.nowISO8601();
  return batchWriteItemToDynamoDb(values);
}

export function response(ctx) {
  return ctx.result;
}

function batchWriteItemToDynamoDb(values) {
  const uuid = util.autoId();
  return {
    operation: "BatchPutItem",
    tables: {
      ChatWave: [
        {
          pk: { S: "USER#" + values.input.user },
          sk: { S: "ROOM#" + uuid },
          title: { S: values.input.title },
          latestMessage: { S: values.input.message },
          latestMessageTime: { S: values.input.latestMessageTime },
        },
        {
          pk: { S: "USER#" + values.input.title },
          sk: { S: "ROOM#" + uuid },
          title: { S: values.input.user },
          latestMessage: { S: values.input.message },
          latestMessageTime: { S: values.input.latestMessageTime },
        },
        {
          pk: { S: "ROOM#" + uuid },
          sk: { S: "MSG#" + values.input.latestMessageTime },
          message: { S: values.input.message },
          key: { S: util.autoId() },
          sender_id: { S: values.input.user },
        },
      ],
    },
  };
}
