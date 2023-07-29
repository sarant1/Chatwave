import * as cdk from "aws-cdk-lib";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";

interface DynamoDbNestedStackProps extends cdk.NestedStackProps {
  dynmaoDbTableName: string;
}

export class DynamoDBTableStack extends cdk.NestedStack {
  public table: dynamodb.Table;
  constructor(scope: Construct, id: string, props: DynamoDbNestedStackProps) {
    super(scope, id, props);

    const table = new dynamodb.Table(this, props.dynmaoDbTableName, {
      tableName: props.dynmaoDbTableName,
      partitionKey: {
        name: "pk",
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: "sk",
        type: dynamodb.AttributeType.STRING,
      },
      readCapacity: 1,
      writeCapacity: 1,
      billingMode: dynamodb.BillingMode.PROVISIONED,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
    const gsiProps: dynamodb.GlobalSecondaryIndexProps = {
      indexName: "EmailIndex",
      partitionKey: {
        name: "gsiPk",
        type: dynamodb.AttributeType.STRING,
      },
      projectionType: dynamodb.ProjectionType.KEYS_ONLY,
      readCapacity: 1,
      writeCapacity: 1,
    };

    table.addGlobalSecondaryIndex(gsiProps);
    this.table = table;
  }
}
