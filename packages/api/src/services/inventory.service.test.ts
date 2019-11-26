import inventoryService from './inventory.service';

describe('Inventory#readFileAsync', () => {
  it('should throw error when file doesn\'t exist.', () => {
    
  });
  it('should return buffer for a valid file.', () => {

  });
});

describe('Inventory#readFileAsJson', () => {
  it('should return an object for a valid json file.', () => {

  });
});

describe('Inventory#getFridgeItems', () => {
  beforeEach(() => { });
  afterEach(() => { });

  it('should return an empty array when file is empty.', () => {
    const output = inventoryService.getFridgeItems();
  });

  it('should return an empty array when has no fridge items.', () => {

  });

  it('should return a valid array when file has fridge items.', () => {

  });
});

describe('Inventory#getPantryItems', () => {
  it('should return an empty array when file is empty.', () => {

  });

  it('should return an empty array when has no pantry items.', () => {

  });

  it('should return a valid array when file has pantry items.', () => {

  });
});

