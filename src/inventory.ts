import fs from 'fs';

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

const readFromFile = (filepath:string) => readFileBytes(filepath)
    .then(buffer => {
        // TODO: something with the buffer .... to JSON?
        return buffer;
    });

const getFridgeItems = () => { return []; }

export default {
    readFileBytes,
    readFromFile,
    getFridgeItems,
};