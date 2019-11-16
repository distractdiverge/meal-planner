import convict from 'convict';

export enum Environment {
    Development = 'development',
    Production = 'production',
    Test = 'test',
}

const config = convict({
  env: {
    default: Environment.Development,
    doc: 'Node Environment',
    env: 'NODE_ENV',
    format: [Environment.Development, Environment.Production, Environment.Test],
  },
  aws: {
    profileName: {
      default: 'meal-planner',
      doc: 'AWS Profile name for credentials',
      env: 'AWS_PROFILE',
      format: 'string',
    },
    region: {
      default: 'us-east',
      doc: 'AWS Region Name',
      env: 'AWS_REGION',
      format: 'string',
    },
    dynamoDbApiVersion: {
      default: '2012-08-10',
      doc: 'The DynamoDB API Version "Date", e.g. "2012-08-10"',
      env: 'AWS_DYNAMODB_API_VERSION',
      format: 'string',
    },
  },

});

export interface AwsConfiguration {
  profileName: string;
  region: string;
  dynamoDbApiVersion: string;
}

export const getEnv: () => Environment = () => config.get('env') as Environment;
export const getAwsConfig: () => AwsConfiguration = () => config.get('aws') as AwsConfiguration;
