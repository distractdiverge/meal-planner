import inventory, { IInventory } from './inventory';

describe('Inventory#getFridgeItems', () => {
  it('should return undefined when given undefined', () => {
    const input: IInventory = undefined;
    const output = inventory.getFridgeItems(input);

    expect(output).toBeUndefined();
  });
});
