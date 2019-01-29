import fs from 'fs';
import R from 'ramda';

export type Inventory = {
    fridge: InventoryItem[];
    pantry: InventoryItem[];
}

export type InventoryItem = {
  name: string;
  count: number;
};

const readFileBytes = (filepath:string):Promise<Buffer> => new Promise((resolve, reject) =>
   fs.readFile(filepath, (err, data) =>
       err
        ? reject(err)
        : resolve(data)
   )
);

const parseFile = (buffer:Buffer):Inventory => JSON.parse(buffer.toString());

const readFile = (filepath:string):Promise<Inventory> =>
    readFileBytes(filepath)
        .then(parseFile);

const getFridgeItems = (inventory:Inventory):InventoryItem[] => R.prop('fridge', inventory);
const getPantryItems = (inventory:Inventory):InventoryItem[] => R.prop('pantry', inventory);

export default {
    readFileBytes,
    parseFile,
    readFile,
    getFridgeItems,
    getPantryItems,
};