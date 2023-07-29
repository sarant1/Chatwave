import { Context, Callback, Handler } from "aws-lambda";

type CognitoUserStatus =
  | "UNCONFIRMED"
  | "CONFIRMED"
  | "EXTERNAL_PROVIDER"
  | "ARCHIVED"
  | "UNKNOWN"
  | "RESET_REQUIRED"
  | "FORCE_CHANGE_PASSWORD";

type CognitoTriggerEvent = {
  version: string;
  triggerSource: string;
  region: string;
  userPoolId: string;
  userName: string; // cognito username
  callerContext: {
    awsSdkVersion: string;
    clientId: string;
  };
  request: {
    userAttributes: {
      sub: string;
      "cognito:email_alias": string;
      "cognito:user_status": CognitoUserStatus; // We expect "CONFIRMED"
      email_verified: string;
      email: string;
    };
    codeParameter: string;
    linkParameter: string;
    usernameParameter: string | null;
  };
  response: {
    smsMessage: string | null;
    emailMessage: string | null;
    emailSubject: string | null;
  };
};

/*
Forgot Password Example

{
  "version": "1",
  "region": "us-east-1",
  "userPoolId": "us-east-1_89Qnen77h",
  "userName": "3f6ca9af-b39e-4995-a2c0-731dcc935969",
  "callerContext": {
    "awsSdkVersion": "aws-sdk-unknown-unknown",
    "clientId": "3qeid925blkcoqs9p76jrn3nlj"
  },
  "triggerSource": "CustomMessage_ForgotPassword",
  "request": {
    "userAttributes": {
      "sub": "3f6ca9af-b39e-4995-a2c0-731dcc935969",
      "cognito:email_alias": "samuel.arant10@gmail.com",
      "cognito:user_status": "CONFIRMED",
      "email_verified": "true",
      "email": "samuel.arant10@gmail.com"
    },
    "codeParameter": "{####}",
    "linkParameter": "{##Click Here##}",
    "usernameParameter": null
  },
  "response": { "smsMessage": null, "emailMessage": null, "emailSubject": null }
}
*/

// Forgot Password Email Trigger
export const handler: Handler<CognitoTriggerEvent, any> = (
  event: CognitoTriggerEvent,
  context: Context,
  callback: Callback<any>
): void => {
  console.log(context);
  console.log(callback);
  console.log(event);

  if (event.triggerSource === "CustomMessage_ForgotPassword") {
    const { email } = event.request.userAttributes;
    const encodedEmail = encodeURIComponent(email);
    const verificationCode = event.request.codeParameter;
    const resetUrl = `${process.env.BASE_URL}/auth/reset_password?email=${encodedEmail}&verificationCode=${verificationCode}`;
    console.log("RESET_URL", resetUrl);

    let message = `<a href=${resetUrl}>Click here to reset your password</a>`;

    event.response.emailSubject = "Chatwave Password Reset";
    event.response.emailMessage = message;
  }

  callback(null, event);
};
