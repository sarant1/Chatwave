import { util } from "@aws-appsync/utils";

export function request(ctx) {
  return getOtherUserId(ctx.arguments.input.otherUserEmail);
}

export function response(ctx) {
  ctx.stash.otherUserUuid = ctx.result.items[0]["pk"];
  return ctx;
}

function getOtherUserId(otherUserEmail) {
  const data = {
    operation: "Query",
    index: "EmailIndex",
    limit: 1,
    query: {
      expression: "gsiPk = :email",
      expressionValues: {
        ":email": { S: otherUserEmail },
      },
    },
  };

  // return other user uuid
  return data;
}
