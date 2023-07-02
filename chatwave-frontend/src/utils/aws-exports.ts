// replace the user pool region, id, and app client id details
const awsExports = {
  aws_project_region: process.env.NEXT_PUBLIC_AWS_REGION, // amplify
  aws_cognito_region: process.env.NEXT_PUBLIC_AWS_REGION,
  aws_user_pools_id: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID, // replace with correct user pool id
  aws_user_pools_web_client_id: process.env.NEXT_PUBLIC_COGNITO_WEB_CLIENT_ID, // replace with correct user pool client id
  oauth: {},
};

export default awsExports;