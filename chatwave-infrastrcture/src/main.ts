import * as cdk from 'aws-cdk-lib';

import dotenv from 'dotenv';

dotenv.config();

import { RootStack } from './root';


// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new cdk.App();


new RootStack(app, 'ChatWave-infrastructure-dev', {
  env: devEnv,
});

app.synth();