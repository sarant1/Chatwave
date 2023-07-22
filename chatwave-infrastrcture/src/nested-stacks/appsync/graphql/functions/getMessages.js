import { util } from "@aws-appsync/utils";

export function request(ctx) {
  console.log("CTXINFO", ctx);
  const roomId = ctx.arguments.roomId;
  return getMessagesForRoom(roomId);
}

export function response(ctx) {
  return ctx.result;
}

function getMessagesForRoom(roomId) {
  return {
    operation: "Query",
    query: {
      expression: "pk = :pk AND begins_with(sk, :sk)",
      expressionValues: {
        ":pk": { S: `ROOM#${roomId}` },
        ":sk": { S: "MSG#" },
      },
    },
  };
}
