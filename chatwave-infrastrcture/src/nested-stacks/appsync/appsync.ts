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
  // public createMessageCode: appsync.AppsyncFunction;
  // public createRoomCode: appsync.AppsyncFunction;

  constructor(scope: Construct, id: string, props: AppSyncNestedStackProps) {
    super(scope, id, props);

    this.api = new appsync.GraphqlApi(this, "Api", {
      name: "chatwave-appsync-api",
      schema: appsync.SchemaFile.fromAsset(
        path.join(__dirname, "graphql/schema.graphql")
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
      "DynamoDataSource",
      props.dynamoDbTable.table
    );

    this.sourceTable.createResolver("createMessageResolver", {
      typeName: "Mutation",
      fieldName: "createRoom",
      code: appsync.Code.fromAsset(
        path.join(__dirname, "graphql/functions/createMessage.js")
      ),
    });

    this.sourceTable.createResolver("createRoomResolver", {
      typeName: "Mutation",
      fieldName: "createRoom",
      code: appsync.Code.fromAsset(
        path.join(__dirname, "graphql/functions/createRoomForUser.js")
      ),
    });
    // this.createMessageCode = new appsync.AppsyncFunction(this, "createMessageFunction", {
    //   name: "createMessage",
    //   api: this.api,
    //   dataSource: this.sourceTable,
    //   code: appsync.Code.fromAsset(
    //     path.join(__dirname, "functions/createMessage")
    //   ),
    //   runtime: appsync.FunctionRuntime.JS_1_0_0,
    // });

    // this.createRoomCode = new appsync.AppsyncFunction(this, "createRoomFunction", {
    //   name: "createRoomForUser",
    //   api: this.api,
    //   dataSource: this.sourceTable,
    //   code: appsync.Code.fromAsset(
    //     path.join(__dirname, "functions/createRoomForUser")
    //   ),
    //   runtime: appsync.FunctionRuntime.JS_1_0_0,
    // });
  }
}
