import * as AWS from 'aws-sdk';
import { GlobalConfigInstance } from 'aws-sdk/lib/config';
import { AwsConfiguration } from './settings.service';
import { PutItemInputAttributeMap } from 'aws-sdk/clients/dynamodb';

const readSystemCredentials = (awsProfileName: string) => new AWS.SharedIniFileCredentials({ profile: awsProfileName});

const configureAws = (aws: GlobalConfigInstance, config: AwsConfiguration) => {
    aws.credentials = readSystemCredentials(config.profileName);
    aws.update({ region: config.region });
};

const getClient = (awsConfig: AwsConfiguration) => {
    configureAws(AWS.config, awsConfig);
    return new AWS.DynamoDB({ apiVersion: awsConfig.dynamoDbApiVersion });
};

const createItem = (client: AWS.DynamoDB, tableName: string, item: PutItemInputAttributeMap) =>
    client
        .putItem({
            TableName: tableName,
            Item: item
        })
        .promise();

export {
    configureAws,
    createItem,
    getClient,
    readSystemCredentials,
};