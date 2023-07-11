import * as appsync from "aws-cdk-lib/aws-appsync";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import path from "path";
import { DynamoDBTableStack } from "../dynamodb-table/dynamodb";
import { IUserPool } from "aws-cdk-lib/aws-cognito";
interface AppSyncNestedStackProps extends cdk.NestedStackProps {
  dynamoDbTable: DynamoDBTableStack;
  userpool: IUserPool;
}

export class AppSyncNestedStack extends cdk.NestedStack {
  public api: appsync.GraphqlApi;
  public sourceTable: appsync.DynamoDbDataSource;

  constructor(scope: Construct, id: string, props: AppSyncNestedStackProps) {
    super(scope, id, props);

    this.api = new appsync.GraphqlApi(this, "Api", {
      name: "chatwave-appsync-api",
      schema: appsync.SchemaFile.fromAsset(
        path.join(__dirname, "schema/schema.graphql")
      ),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.USER_POOL,
          userPoolConfig: {
            userPool: props.userpool,
          },
        },
      },
      xrayEnabled: false,
    });

    this.sourceTable = this.api.addDynamoDbDataSource(
      "datasource",
      props.dynamoDbTable.table
    );
  }
}
