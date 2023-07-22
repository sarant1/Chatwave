import { util } from "@aws-appsync/utils";

export function request(ctx) {
  const values = ctx.arguments;
  const user = ctx.identity.claims.sub;
  return getRoomItemsFromDdb(user);
}

export function response(ctx) {
  return ctx.result;
}

function getRoomItemsFromDdb(user) {
  return {
    operation: "Query",
    query: {
      expression: "pk = :pk AND begins_with(sk, :sk)",
      expressionValues: {
        ":pk": { S: user },
        ":sk": { S: "ROOM#" },
      },
    },
  };
}
