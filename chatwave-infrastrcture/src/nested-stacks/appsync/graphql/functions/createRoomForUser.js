import { util } from "@aws-appsync/utils";

export function request(ctx) {
  const values = ctx.arguments;
  values.input.sub = ctx.identity.claims.sub;
  values.input.latestMessageTime = util.time.nowISO8601();
  const otherUserUuid = ctx.stash.otherUserUuid;
  return batchWriteItemToDynamoDb(values, otherUserUuid);
}

export function response(ctx) {
  return ctx.result;
}

function batchWriteItemToDynamoDb(values, otherUserUuid) {
  const uuid = util.autoId();
  return {
    operation: "BatchPutItem",
    tables: {
      ChatWave: [
        {
          pk: { S: values.input.sub },
          sk: { S: `ROOM#${uuid}` },
          title: { S: values.input.title },
          latestMessage: { S: values.input.message },
          latestMessageTime: { S: values.input.latestMessageTime },
        },
        {
          pk: { S: otherUserUuid },
          sk: { S: `ROOM#${uuid}` },
          title: { S: values.input.otherUserEmail },
          latestMessage: { S: values.input.message },
          latestMessageTime: { S: values.input.latestMessageTime },
        },
        {
          pk: { S: "ROOM#" + uuid },
          sk: { S: "MSG#" + values.input.latestMessageTime },
          message: { S: values.input.message },
          key: { S: util.autoId() },
          sender_id: { S: values.input.sub },
        },
      ],
    },
  };
}
