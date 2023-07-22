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
  public messageResolver: appsync.Resolver;
  public roomResolver: appsync.Resolver;
  public getRoomResolver: appsync.Resolver;
  public listMessagesResolver: appsync.Resolver;

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
    const createMessageCode = new appsync.AppsyncFunction(
      this,
      "createMessageFunction",
      {
        name: "createMessage",
        api: this.api,
        dataSource: this.sourceTable,
        code: appsync.Code.fromAsset(
          path.join(__dirname, "graphql/functions/createMessage.js")
        ),
        runtime: appsync.FunctionRuntime.JS_1_0_0,
      }
    );
    const createRoomCode = new appsync.AppsyncFunction(
      this,
      "createRoomFunction",
      {
        name: "createRoomForUser",
        api: this.api,
        dataSource: this.sourceTable,
        code: appsync.Code.fromAsset(
          path.join(__dirname, "graphql/functions/createRoomForUser.js")
        ),
        runtime: appsync.FunctionRuntime.JS_1_0_0,
      }
    );
    const createRoomGetOtherUser = new appsync.AppsyncFunction(
      this,
      "getOtherUserFunction",
      {
        name: "getOtherUser",
        api: this.api,
        dataSource: this.sourceTable,
        code: appsync.Code.fromAsset(
          path.join(__dirname, "graphql/functions/getOtherUser.js")
        ),
        runtime: appsync.FunctionRuntime.JS_1_0_0,
      }
    );
    const getRoomCode = new appsync.AppsyncFunction(this, "getRoomFunction", {
      name: "getRoom",
      api: this.api,
      dataSource: this.sourceTable,
      code: appsync.Code.fromAsset(
        path.join(__dirname, "graphql/functions/getRooms.js")
      ),
      runtime: appsync.FunctionRuntime.JS_1_0_0,
    });
    const listMessagesCode = new appsync.AppsyncFunction(this, "getMessages", {
      name: "getMessages",
      api: this.api,
      dataSource: this.sourceTable,
      code: appsync.Code.fromAsset(
        path.join(__dirname, "graphql/functions/getMessages.js")
      ),
      runtime: appsync.FunctionRuntime.JS_1_0_0,
    });
    this.listMessagesResolver = new appsync.Resolver(
      this,
      "ListMessagesResolver",
      {
        api: this.api,
        typeName: "Query",
        fieldName: "listMessages",
        code: appsync.Code.fromAsset(
          path.join(__dirname, "graphql/resolvers/listMessagesResolver.js")
        ),
        runtime: appsync.FunctionRuntime.JS_1_0_0,
        pipelineConfig: [listMessagesCode],
      }
    );
    this.getRoomResolver = new appsync.Resolver(this, "GetRoomResolver", {
      api: this.api,
      typeName: "Query",
      fieldName: "listRooms",
      code: appsync.Code.fromAsset(
        path.join(__dirname, "graphql/resolvers/getRoomsForUserResolver.js")
      ),
      runtime: appsync.FunctionRuntime.JS_1_0_0,
      pipelineConfig: [getRoomCode],
    });
    this.messageResolver = new appsync.Resolver(
      this,
      "MessagePipelineResolver",
      {
        api: this.api,
        typeName: "Mutation",
        fieldName: "createMessage",
        code: appsync.Code.fromAsset(
          path.join(__dirname, "graphql/resolvers/createMessageResolver.js")
        ),
        runtime: appsync.FunctionRuntime.JS_1_0_0,
        pipelineConfig: [createMessageCode],
      }
    );
    this.roomResolver = new appsync.Resolver(this, "RoomPipelineResolver", {
      api: this.api,
      typeName: "Mutation",
      fieldName: "createRoom",
      code: appsync.Code.fromAsset(
        path.join(__dirname, "graphql/resolvers/createRoomForUserResolver.js")
      ),
      runtime: appsync.FunctionRuntime.JS_1_0_0,
      pipelineConfig: [createRoomGetOtherUser, createRoomCode],
    });
  }
}
