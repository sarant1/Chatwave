# AWS Serverless Chat Application

## Overview

## Tech Stack

- Appsync
- AWS Amplify Library
- Cognito
- NextJs
- Typescript (Frontend & CDK)

## Getting Started

## Useful commands

To configure your graphql schema in the frontend, use this command with your appsync apiId.

```bash
amplify add codegen --apiId <appsyncId>
```

## My Struggles

1. **Creating a room between two users**

   the main issue is that I need to find a way to query the user who did not create the conversation.

- first I created a gsi with user email as the pk.
- Now I need to find a way to query the database within the resolvers.

## Resources

- AWS Amplify [Link](https://docs.amplify.aws/lib/graphqlapi/getting-started/q/platform/js/)
- AWS Example Solution [Link](https://github.com/aws-samples/amplify-nextjs-chat-app)
