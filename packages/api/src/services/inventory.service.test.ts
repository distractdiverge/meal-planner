import inventoryService from './inventory.service';

describe('InventoryService#extractItems', () => {
  it('should return an empty array given undefined', () => {
    const input = undefined;
    const output = inventoryService.extractItems('test')(input);
    expect(output).toBeInstanceOf(Array);
    expect(output).toHaveLength(0);
  });

  it('should return an empty array given null', () => {
    const input = null;
    const output = inventoryService.extractItems('test')(input);
    expect(output).toBeInstanceOf(Array);
    expect(output).toHaveLength(0);
  });

  it('should return an empty array given an empty object', () => {
    const input = {};
    const output = inventoryService.extractItems('test')(input);
    expect(output).toBeInstanceOf(Array);
    expect(output).toHaveLength(0);
  });

  it('should return an empty array given an object without the property', () => {
    const input = { other: [ {name: 'testName', count: 0 }] };
    const output = inventoryService.extractItems('test')(input);
    expect(output).toBeInstanceOf(Array);
    expect(output).toHaveLength(0);
  });

  it('should return an empty array given an object with property, but no items', () => {
    const input = {'test': []};
    const output = inventoryService.extractItems('test')(input);
    expect(output).toBeInstanceOf(Array);
    expect(output).toHaveLength(0);
  });

  it('should return a single valid item', () => {
    const input = {'test': [{name:'test name', count: 0}]};
    const output = inventoryService.extractItems('test')(input);
    expect(output).toHaveLength(1);

    expect(output[0]).toHaveProperty('name', 'test name');
    expect(output[0]).toHaveProperty('count', 1);
  });
});

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

  it('should return an empty array when file is empty.', async () => {
    const filepath = '';
    const output = await inventoryService.getFridgeItems(filepath);
    expect(output).not.toBeNull();
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

