import R from 'ramda';
import { logError, logInfo, logDebug } from "./logging";
import inventory from './inventory';

const inventoryFilepath = './assets/inventory.json';

const main = () => {
    logInfo('Reading Inventory', { filepath: inventoryFilepath });
    return inventory.readFile(inventoryFilepath)
        .then(result => {
            logInfo('Read Complete');
            const fridgeItems = inventory.getFridgeItems(result);
            const pantryItems = inventory.getPantryItems(result);
            logDebug(`# Fridge Items: ${R.length(fridgeItems)}, # Pantry Items: ${R.length(pantryItems)}`, {
                fridge: fridgeItems,
                pantry: pantryItems,
            });
        })
        .catch(err => logError(err));
};

main();