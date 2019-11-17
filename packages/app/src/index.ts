import * as R from 'ramda';
import inventory from './services/inventory';
import { logDebug, logError, logInfo } from './services/logging';

const main = async (inventoryFilepath: string) => {
  logInfo('Reading Inventory', { filepath: inventoryFilepath });

  let result;

  try {
    result = await inventory.readFile(inventoryFilepath);
  } catch (error) {
    throw new Error(`Error Reading Inventory: ${error.message}`);
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
