import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { CognitoNestedStack } from "./nested-stacks/auth/cognito";
import { DynamoDBTableStack } from "./nested-stacks/dynamodb-table/dynamodb";
import { AppSyncNestedStack } from "./nested-stacks/appsync/appsync";
import { IUserPool } from "aws-cdk-lib/aws-cognito";
interface RootStackProps extends cdk.StackProps {}

export class RootStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: RootStackProps) {
    super(scope, id, props);

    this.createCognitoStack("Cognito");
    this.createDynamoDbStack("DynamoDbStack");
    // this.createAppSyncStack(
    //   "AppSync",
    //   dynamodDbTable,
    //   cognitoUserPool.userPool
    // );
  }

  createCognitoStack(name: string) {
    return new CognitoNestedStack(this, name, {});
  }

  createDynamoDbStack(name: string) {
    return new DynamoDBTableStack(this, name, {});
  }
  createAppSyncStack(
    name: string,
    dynamoDbTable: DynamoDBTableStack,
    userpool: IUserPool
  ) {
    return new AppSyncNestedStack(this, name, { dynamoDbTable, userpool });
  }
}
