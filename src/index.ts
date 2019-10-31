import * as R from 'ramda';
import inventory from './inventory';
import { logDebug, logError, logInfo } from './logging';

const inventoryFilepath = './assets/inventory.json';

const main = () => {
  logInfo('Reading Inventory', { filepath: inventoryFilepath });

  return inventory.readFile(inventoryFilepath)
        .then((result) => {
          logInfo('Read Complete');
          const fridgeItems = inventory.getFridgeItems(result);
          const pantryItems = inventory.getPantryItems(result);
          logDebug(`# Fridge Items: ${R.length(fridgeItems)}`, { fridge: fridgeItems });
          logDebug(`# Pantry Items: ${R.length(pantryItems)}`, { pantry: pantryItems });
        })
        .catch(logError);
};

main();
