const { add, subtract, multiply, divide } = require('../calculator');

describe('Calculator basic operations', () => {
  test('2 + 3 => 5', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('10 - 4 => 6', () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test('45 * 2 => 90', () => {
    expect(multiply(45, 2)).toBe(90);
  });

  test('20 / 5 => 4', () => {
    expect(divide(20, 5)).toBe(4);
  });

  test('supports floating point operations', () => {
    expect(add(0.1, 0.2)).toBeCloseTo(0.3, 5);
    expect(divide(1.5, 0.5)).toBeCloseTo(3);
  });

  test('division by zero throws', () => {
    expect(() => divide(1, 0)).toThrow('division by zero');
  });

  test('invalid numeric inputs are handled by caller (library functions expect numbers)', () => {
    expect(add(Number('3'), Number('2'))).toBe(5);
  });
});
