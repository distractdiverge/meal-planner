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

export const extractItems = (arrayKey: string): (content: any) => ReadonlyArray<Item> => 
        R.pipe(
            R.prop(arrayKey),
            R.ifElse(
                R.has(arrayKey),    
                R.map((rawItem: any) => <Item>({
                    name: R.prop('name', rawItem),
                    count: R.prop('count', rawItem),
                })),
                () => [],
            ),
        );

export const readFileAsJson = (filepath: string): Promise<object> =>
    readFileAsync(filepath)
        .then(buffer => buffer.toString())
        .then(JSON.parse);

const getFridgeItems = async (filepath: string): Promise<ReadonlyArray<Item>> => {
    const content = await readFileAsJson(filepath);
    return extractItems('fridge')(content);
};

const getPantryItems = async (filepath: string): Promise<ReadonlyArray<Item>> => {
    const content = await readFileAsJson(filepath);
    return extractItems('pantry')(content);
};

export default {
    extractItems, // TODO: Move to its own file?
    readFileAsync, // TODO: Move tjis to its own file
    readFileAsJson, // TODO: Extract to its own file
    getFridgeItems,
    getPantryItems,
};