import fs from 'fs';
import * as R from 'ramda';

export interface Item {
    name: string;
    count: number;
}

export interface InventoryService {
    getFridgeItems(filepath: string): ReadonlyArray<Item>;
    getPantryItems(filepath: string): ReadonlyArray<Item>;
};

export const readFileAsync = (filepath: string): Promise<Buffer> => 
    new Promise((resolve, reject) =>
        fs.readFile(filepath, (error, data) =>
            error
                ? reject(error)
                : resolve(data)
        )
    );

export const readFileAsJson = (filepath: string): Promise<object> =>
    readFileAsync(filepath)
        .then(buffer => buffer.toString())
        .then(JSON.parse);

const getFridgeItems = async (filepath: string): ReadonlyArray<Item> => {
    const content = await readFileAsJson(filepath);
    return R.prop('fridge', content);
};

const getPantryItems = async (filepath: string): ReadonlyArray<Item> => {
    const content = await readFileAsJson(filepath);
    return R.prop('pantry', content);
};

export default {
    readFileAsync, // TODO: Move tjis to its own file
    readFileAsJson, // TODO: Extract to its own file
    getFridgeItems,
    getPantryItems,
};