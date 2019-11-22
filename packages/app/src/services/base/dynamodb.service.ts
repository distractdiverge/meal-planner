import * as AWS from 'aws-sdk';
import { PutItemInputAttributeMap, PutItemOutput } from 'aws-sdk/clients/dynamodb';
import { GlobalConfigInstance } from 'aws-sdk/lib/config';
import { AwsConfiguration } from './settings.service';
import { AWSError, PromiseResult } from 'aws-sdk';

const readSystemCredentials = (awsProfileName: string): AWS.SharedIniFileCredentials =>
    new AWS.SharedIniFileCredentials({ profile: awsProfileName });

const configureAws = (aws: GlobalConfigInstance, config: AwsConfiguration): void => {
  aws.credentials = readSystemCredentials(config.profileName);
  aws.update({ region: config.region });
};

const getClient = (awsConfig: AwsConfiguration): AWS.DynamoDB => {
  configureAws(AWS.config, awsConfig);
  return new AWS.DynamoDB({
    apiVersion: awsConfig.dynamoDbApiVersion,
    endpoint: awsConfig.endpoint,
  });
};

const createItem = (client: AWS.DynamoDB, tableName: string, item: PutItemInputAttributeMap): Promise<PromiseResult<PutItemOutput, AWSError>> =>
    client
        .putItem({
          Item: item,
          TableName: tableName,
        })
        .promise();

export {
    configureAws,
    createItem,
    getClient,
    readSystemCredentials,
};
