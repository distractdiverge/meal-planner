import inventory from '../src/inventory';

describe('Inventory#getFridgeItems', () => {
  it('should return undefined when given undefined', () => {
    const input = undefined;
    const output = inventory.getFridgeItems(input);

    expect(output).toBe(input);
  });
});
