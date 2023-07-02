import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

interface DynamoDbNestedStackProps extends cdk.NestedStackProps {}

export class DynamoDBTable extends cdk.NestedStack {
  constructor(scope: Construct, id: string, props: DynamoDbNestedStackProps) {
    super(scope, id, props);


    const table = new dynamodb.Table(this, 'ChatWave-Table', {
      tableName: 'ChatWave', 
      partitionKey: {
        name: 'pk', 
        type: dynamodb.AttributeType.STRING
      },
      sortKey: {
        name: 'sk',
        type: dynamodb.AttributeType.STRING
      },
      readCapacity: 1,
      writeCapacity: 1,
      billingMode: dynamodb.BillingMode.PROVISIONED,
    });

    const gsiProps: dynamodb.GlobalSecondaryIndexProps = {
      indexName: 'Conversation-Index',
      partitionKey: {
        name: 'pk',
        type: dynamodb.AttributeType.STRING
      },
      sortKey: {
        name: 'sk',
        type: dynamodb.AttributeType.STRING
      },
      readCapacity: 1,
      writeCapacity: 1,
    }

    table.addGlobalSecondaryIndex(gsiProps);
  }
}