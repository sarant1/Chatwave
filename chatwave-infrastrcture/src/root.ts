import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CognitoNestedStack } from './nested-stacks/auth/cognito';
import { DynamoDBTable } from './nested-stacks/dynamodb-table/dynamodb';

interface RootStackProps extends cdk.StackProps {}

export class RootStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: RootStackProps) {
    super(scope, id, props);

    this.createCognitoStack('Cognito')
    this.createDynamoDbStack('DynamoDb')
  }

  createCognitoStack(name: string): cdk.NestedStack {
    return new CognitoNestedStack(this, name, {});
  }

  createDynamoDbStack(name: string): cdk.NestedStack {
    return new DynamoDBTable(this, name, {})
  }
}