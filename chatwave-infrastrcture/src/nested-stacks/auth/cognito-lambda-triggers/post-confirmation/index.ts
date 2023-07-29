import { Context } from "aws-lambda";
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

type CognitoTriggerEvent = {
  version: string;
  region: string;
  userPoolId: string;
  userName: string;
  callerContext: {
    awsSdkVersion: string;
    clientId: string;
  };
  triggerSource: string;
  request: {
    userAttributes: {
      sub: string;
      email_verified: string;
      "cognito:user_status": string;
      "cognito:email_alias": string;
      email: string;
    };
  };
  response: {};
};

export const handler = async (
  event: CognitoTriggerEvent,
  context: Context
): Promise<void> => {
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      pk: event.request.userAttributes.sub,
      sk: "Attributes",
      gsiPk: event.request.userAttributes.email,
    },
  };
  if (event.triggerSource === "PostConfirmation_ConfirmSignUp") {
    try {
      await docClient.put(params).promise();
    } catch (error) {
      console.error(error);
    }
  }
};
