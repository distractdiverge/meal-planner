import * as R from 'ramda';
import * as DynamoDBFactory from './services/base/dynamodb.service';
import * as Settings from './services/base/settings.service';
import inventory, { IInventory, IInventoryItem } from './services/inventory';
import { logDebug, logError, logInfo } from './services/base/logging';
import { DynamoDB } from 'aws-sdk';
import { PutItemInputAttributeMap } from 'aws-sdk/clients/dynamodb';

const getDbClient = (): DynamoDB => {
  const config = Settings.getAwsConfig();
  // DynamoDB.configureAws(AWS.config, config);
  return DynamoDBFactory.getClient(config);
};

const makeDbItem = (location: string, id: number, item: IInventoryItem): PutItemInputAttributeMap => ({
  COUNT: { N: `${item.count}` },
  ID: { N: `${id}` },
  LOCATION: { S: location },
  NAME: { S: item.name },
});

const loadInventory = async (dbClient: DynamoDB, content: IInventory): Promise<void> => {
  let id = 1;
  const operations = content.fridge.map((item) => {
    const operation = DynamoDBFactory.createItem(dbClient, 'Inventory', makeDbItem('Fridge', id, item));
    id++;
    return operation;
  });

  const moreOperations = content.pantry.map((item) => {
    const operation = DynamoDBFactory.createItem(dbClient, 'Inventory', makeDbItem('Pantry', id, item));
    id++;
    return operation;
  });

  await Promise.all(operations);
  await Promise.all(moreOperations);
};

const main = async (inventoryFilepath: string): Promise<void> => {
  const dbClient = getDbClient();

  // TODO: Create Table
  // provisionTable(dbClient);

  logInfo('Reading Inventory', { filepath: inventoryFilepath });

  let result;

  try {
    result = await inventory.readFile(inventoryFilepath);
  } catch (error) {
    throw new Error(`Error Reading Inventory: ${error.message}`);
  }

  try {
    await loadInventory(dbClient, result);
  } catch (error) {
    throw new Error(`Error Loading Inventory to Database: ${error.message}`);
  }

  logInfo('Read Complete');
  const fridgeItems = inventory.getFridgeItems(result);
  logDebug(`# Fridge Items: ${R.length(fridgeItems)}`, { fridge: fridgeItems });

  const pantryItems = inventory.getPantryItems(result);
  logDebug(`# Pantry Items: ${R.length(pantryItems)}`, { pantry: pantryItems });
};

if (require.main === module) {
  const inventoryFilepath = './assets/inventory.json';

  main(inventoryFilepath)
    .then(() => process.exit(0))
    .catch((error) => {
      logError(error);
      process.exit(1);
    });
}

export default main;
