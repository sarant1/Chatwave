import path from "path";
import * as cdk from "aws-cdk-lib";
import * as cognito from "aws-cdk-lib/aws-cognito";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as iam from "aws-cdk-lib/aws-iam";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { getAppRootDir } from "../../utils/get-app-root-dir";

interface CognitoNestedStackProps extends cdk.NestedStackProps {
  dynamoDbTableName: string;
}

export class CognitoNestedStack extends cdk.NestedStack {
  public userPool: cognito.IUserPool;
  public userPoolClient: cognito.IUserPoolClient;

  constructor(scope: Construct, id: string, props: CognitoNestedStackProps) {
    super(scope, id, props);

    // create cognito user pool and user pool client
    const forgotPasswordEntryPath = path.join(
      __dirname,
      "cognito-lambda-triggers",
      "forgot-password",
      "index.ts"
    );

    const postConfirmationEntryPath = path.join(
      __dirname,
      "cognito-lambda-triggers",
      "post-confirmation",
      "index.ts"
    );

    const forgotPasswordLambdaTrigger = this.createForgotPasswordLambdaTrigger(
      "CustomMessage_ForgotPassword-lambda-trigger",
      forgotPasswordEntryPath,
      getAppRootDir()
    );

    const postConfirmationLambdaTrigger =
      this.createPostConfirmationLambdaTrigger(
        "postConfirmation-lambda-trigger",
        postConfirmationEntryPath,
        getAppRootDir(),
        props.dynamoDbTableName
      );

    this.userPool = this.createCognitoUserPool(
      "chatwave-user-pool",
      forgotPasswordLambdaTrigger,
      postConfirmationLambdaTrigger
    );

    this.userPoolClient = this.createCognitoClient(
      this.userPool,
      "chatwave-user-pool-client"
    );
  }

  createPostConfirmationLambdaTrigger(
    triggerName: string,
    entryPath: string,
    rootAppDir: string,
    tableName: string
  ) {
    return new NodejsFunction(this, triggerName, {
      entry: entryPath,
      handler: "index.handler",
      runtime: lambda.Runtime.NODEJS_14_X,
      awsSdkConnectionReuse: true,
      depsLockFilePath: path.join(`${rootAppDir}`, "package-lock.json"),
      environment: {
        TABLE_NAME: tableName,
      },
      role: new iam.Role(this, "postConfirmation-lambda-role", {
        assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
        description: "Allow lambda to put item in dynamodb table",
        inlinePolicies: {
          dynamoDbPutItemPolicy: new iam.PolicyDocument({
            statements: [
              new iam.PolicyStatement({
                actions: [
                  "dynamodb:PutItem",
                  "logs:CreateLogGroup",
                  "logs:CreateLogStream",
                  "logs:PutLogEvents",
                ],
                resources: [
                  `arn:aws:dynamodb:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:table/${tableName}`,
                ],
              }),
            ],
          }),
        },
      }),
    });
  }

  createForgotPasswordLambdaTrigger(
    triggerName: string,
    entryPath: string,
    rootAppDir: string
  ) {
    return new NodejsFunction(this, triggerName, {
      entry: entryPath,
      handler: "index.handler",
      runtime: lambda.Runtime.NODEJS_18_X,
      depsLockFilePath: path.join(`${rootAppDir}`, "package-lock.json"),
      projectRoot: rootAppDir,
      awsSdkConnectionReuse: true,
      environment: {
        BASE_URL: process.env.BASE_URL as string,
      },
    });
  }

  createCognitoUserPool(
    userPoolName: string,
    forgotPasswordLambdaTrigger: lambda.IFunction,
    postConfirmationLambdaTrigger: lambda.IFunction
  ): cognito.UserPool {
    return new cognito.UserPool(this, userPoolName, {
      userPoolName: userPoolName,
      lambdaTriggers: {
        customMessage: forgotPasswordLambdaTrigger,
        postConfirmation: postConfirmationLambdaTrigger,
      },
      // case insensitive is preferred in most situations
      signInCaseSensitive: false,
      selfSignUpEnabled: true,
      // we want the user to be verified with a code on a different frontend page
      autoVerify: { email: true },
      signInAliases: {
        email: true,
      },
      // user verification message
      userVerification: {
        emailSubject: "Verify your email to access your ChatWave Account!",
        emailBody:
          "Thanks for signing up to ChatWave! Your verification code is {####}",
        emailStyle: cognito.VerificationEmailStyle.CODE,
      },
      email: cognito.UserPoolEmail.withCognito("noreply@chatwaveemail.com"),
      standardAttributes: {
        email: {
          required: true,
          mutable: true,
        },
      },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: true,
        tempPasswordValidity: cdk.Duration.days(3),
      },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
  }

  createCognitoClient(
    userPool: cognito.IUserPool,
    clientName: string
  ): cognito.IUserPoolClient {
    return userPool.addClient(clientName, {
      userPoolClientName: clientName,
      authFlows: {
        userPassword: true,
        userSrp: true,
      },
      preventUserExistenceErrors: true,
    });
  }
}
