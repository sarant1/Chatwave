import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { CognitoNestedStack } from "./nested-stacks/auth/cognito";
import { DynamoDBTableStack } from "./nested-stacks/dynamodb-table/dynamodb";
import { AppSyncNestedStack } from "./nested-stacks/appsync/appsync";
import { ServerlessFunctionsNestedStack } from "./nested-stacks/serverless-functions/serverless-functions";
import { IUserPool } from "aws-cdk-lib/aws-cognito";
interface RootStackProps extends cdk.StackProps {}

export class RootStack extends cdk.Stack {
  public projectName: string;
  public dynamoDbTableName: string;

  constructor(scope: Construct, id: string, props: RootStackProps) {
    super(scope, id, props);
    this.projectName = "ChatWave";
    this.dynamoDbTableName = `${this.projectName}`;

    const dynamodDbTable = this.createDynamoDbStack("DynamoDbStack");
    const cognitoUserPool = this.createCognitoStack("Cognito");
    this.createAppSyncStack(
      "AppSync",
      dynamodDbTable,
      cognitoUserPool.userPool
    );
    this.createServerlessStack("ServerlessFunctions");
  }

  createDynamoDbStack(name: string) {
    return new DynamoDBTableStack(this, name, {
      dynmaoDbTableName: this.dynamoDbTableName,
    });
  }

  createCognitoStack(name: string) {
    return new CognitoNestedStack(this, name, {
      dynamoDbTableName: this.dynamoDbTableName,
    });
  }

  createAppSyncStack(
    name: string,
    dynamoDbTable: DynamoDBTableStack,
    userpool: IUserPool
  ) {
    return new AppSyncNestedStack(this, name, { dynamoDbTable, userpool });
  }
  createServerlessStack(name: string) {
    return new ServerlessFunctionsNestedStack(this, name, {
      projectName: this.projectName,
    });
  }
}
