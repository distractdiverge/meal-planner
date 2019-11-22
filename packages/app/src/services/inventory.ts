import * as fs from 'fs';
import * as R from 'ramda';

export interface Inventory {
  readonly fridge: ReadonlyArray<InventoryItem>;
  readonly pantry: ReadonlyArray<InventoryItem>;
}

export interface InventoryItem {
  readonly name: string;
  readonly count: number;
}

const readFileBytes = (filepath: string): Promise<Buffer> => new Promise((resolve, reject) =>
   fs.readFile(filepath, (err, data) =>
       err
        ? reject(err)
        : resolve(data),
   ),
);

const parseFile = (buffer: Buffer): IInventory => JSON.parse(buffer.toString());

const readFile = (filepath: string): Promise<IInventory> =>
    readFileBytes(filepath)
        .then(parseFile);

const getFridgeItems = (inventory: IInventory): ReadonlyArray<IInventoryItem> => R.prop('fridge', inventory);
const getPantryItems = (inventory: IInventory): ReadonlyArray<IInventoryItem> => R.prop('pantry', inventory);

export default {
  getFridgeItems,
  getPantryItems,
  parseFile,
  readFile,
  readFileBytes,
};
