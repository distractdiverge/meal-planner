import R from 'ramda';
import AWS from 'aws-sdk';
import {ServiceConfigurationOptions} from 'aws-sdk/lib/service';


const createTable = (client: AWS.DynamoDB, schema: AWS.DynamoDB.Types.CreateTableInput) =>
    client.createTable(schema).promise()
        .then(() => console.log(`Success, ${schema.TableName} was created.`))
        .catch((error) => {
            if (error.message === 'Cannot create preexisting table') { 
                console.log(`Table ${schema.TableName} already exists.`);
                return; 
            }
            else {
                throw error;
            }
        })
        .then(() => client);

const hasNonEmptyArray = R.curry(
    (property: string, input: any): boolean => 
        R.and(R.has(property, input), R.not(R.isEmpty(R.prop(property, input))))
);

const listTables = (client: AWS.DynamoDB): Promise<void> =>
    client.listTables().promise()
        .then(
            R.ifElse(
                hasNonEmptyArray('TableNames'),
                (tables) => {
                    console.log('Current Tables:');
                    R.forEach((tableName: string) => console.log(` - ${tableName}`), R.prop('TableNames', tables));
                },
                () => {
                    console.log('No Tables Exist');
                },
            )
        );

const getClient = () => {
    AWS.config.update(<ServiceConfigurationOptions>{
        region: 'us-east-1',
        endpoint: 'http://localhost:8000',
        accessKeyId: '1234',
    })

    return new AWS.DynamoDB();
};

const main = (): Promise<void> => {
    
    const db = getClient();

    const params = {
        TableName: 'Inventory',
        KeySchema: [
            { AttributeName: 'location', KeyType: 'HASH' },
            { AttributeName: 'name', KeyType: 'RANGE' },
        ],
        AttributeDefinitions: [
            { AttributeName: 'name', AttributeType: 'S' },
            { AttributeName: 'location', AttributeType: 'S' },
            /* { AttributeName: 'count', AttributeType: 'N' },*/
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 2,
            WriteCapacityUnits: 2,
        },
    };

    return createTable(db, params)
        .then(listTables);
};

if (require.main === module) {
    main()
        .catch((error) => {
            console.error(`Error creating Table: '${error.message}'`);
        });
}