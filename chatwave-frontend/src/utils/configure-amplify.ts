// replace the user pool region, id, and app client id details
import { Amplify } from "aws-amplify";

const awsExports = {
  aws_project_region: process.env.NEXT_PUBLIC_AWS_REGION, // amplify
  aws_cognito_region: process.env.NEXT_PUBLIC_AWS_REGION,
  aws_user_pools_id: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID, // replace with correct user pool id
  aws_user_pools_web_client_id: process.env.NEXT_PUBLIC_COGNITO_WEB_CLIENT_ID, // replace with correct user pool client id
  oauth: {},
  aws_appsync_graphqlEndpoint: process.env.NEXT_PUBLIC_APPSYNC_GRAPHQL_ENDPOINT,
  aws_appsync_region: process.env.NEXT_PUBLIC_AWS_REGION,
  aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
  aws_appsync_apiKey: null,
};

const amplifyConfigure = () => {
  try {
    Amplify.configure(awsExports);
    console.log("Amplify Configured!");
  } catch (error) {
    console.log("Error setting up Amplify");
  }
};

export default amplifyConfigure;
