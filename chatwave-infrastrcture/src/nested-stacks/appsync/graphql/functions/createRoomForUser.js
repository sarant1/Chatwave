import { util } from "@aws-appsync/utils";

export function request(ctx) {
  const values = ctx.arguments;
  values.input.sub = ctx.identity.claims.sub;
  values.input.updatedAt = util.time.nowISO8601();
  values.input.avatarUrl =
    ctx.arguments.avatarUrl ||
    "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9";
  const otherUserUuid = ctx.stash.otherUserUuid;
  return batchWriteItemToDynamoDb(values, otherUserUuid);
}

export function response(ctx) {
  console.log("RESULT OF BATCHPUTITEM: ", ctx);
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
          roomId: { S: uuid },
          avatarUrl: { S: values.input.avatarUrl },
          message: { S: values.input.message },
          updatedAt: { S: values.input.updatedAt },
          senderEmail: { S: values.input.senderEmail },
        },
        {
          pk: { S: otherUserUuid },
          sk: { S: `ROOM#${uuid}` },
          roomId: { S: uuid },
          title: { S: values.input.senderEmail },
          avatarUrl: { S: values.input.avatarUrl },
          message: { S: values.input.message },
          updatedAt: { S: values.input.updatedAt },
          senderEmail: { S: values.input.senderEmail },
        },
        {
          pk: { S: "ROOM#" + uuid },
          sk: { S: "MSG#" + values.input.updatedAt },
          type: { S: values.input.type },
          message: { S: values.input.message },
          key: { S: util.autoId() },
          roomId: { S: uuid },
          updatedAt: { S: values.input.updatedAt },
          senderEmail: { S: values.input.senderEmail },
          otherUserEmail: { S: values.input.otherUserEmail },
        },
      ],
    },
  };
}
