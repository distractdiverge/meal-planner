import { logError, logInfo, logDebug } from "./logging";
import inventory from './inventory';

const inventoryFilepath = './assets/inventory.json';

const main = () => {
    // TODO: Figure out the right way to 'partial apply' or 'curry' log w/ optional 3rd param
    logInfo('Reading Inventory'); // ({ filepath: inventoryFilepath });
    return inventory.readFromFile(inventoryFilepath)
        .then(buffer => {
            logInfo('Read Complete') // , {});
            logDebug(buffer.toString());
        })
        .catch(err => logError(err)) //, {}));

};

main();