# AWS Serverless Chat Application

## Overview

This is a fully serverless real-time chat application that could scale with minimal effort.

## Tech Stack

- Appsync, DynamoDB, S3, Cognito, Cloudfront
- AWS Amplify Library
- NextJs
- Typescript (Frontend & CDK)
- Projen CDK
- Docker compose

## Getting Started

1. Set your environment variables

## Useful commands

To configure your graphql schema in the frontend, use this command with your appsync apiId.

```bash
amplify add codegen --apiId <appsyncId>
```

Then you can use the code below when you update your schema

```bash
amplify codegen
```

## My Struggles

1. **Creating a room between two users**

   the main issue is that I need to find a way to query the user who did not create the conversation.

- first I created a gsi with user email as the pk.
- Now I need to find a way to query the database within the resolvers.

## Resources

- AWS CDK [Link](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_appsync-readme.html)
- AWS Amplify [Link](https://docs.amplify.aws/lib/graphqlapi/getting-started/q/platform/js/)
- AWS Example Solution [Link](https://github.com/aws-samples/amplify-nextjs-chat-app)

## TODO

- Subscription to new rooms being created including that user
- update room latest message when a new message is sent
- Delete room(conversation) possibly delete messages
- Update latest messsages when querying rooms
