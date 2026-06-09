

// Node.js CLI Calculator
// Supported operations:
// - add: addition
// - subtract: subtraction
// - multiply: multiplication
// - divide: division

// Exported functions for use in tests and other modules
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) throw new Error('division by zero');
  return a / b;
}

module.exports = { add, subtract, multiply, divide };

// CLI wrapper: keep backward-compatible behavior when invoked directly
if (require.main === module) {
  const [, , cmd, aRaw, bRaw] = process.argv;

  function usage(code = 0) {
    console.log(`Usage: node src/calculator.js <operation> <a> <b>\n
Operations:
  add       addition (a + b)
  subtract  subtraction (a - b)
  multiply  multiplication (a * b)
  divide    division (a / b)\n
Examples:
  node src/calculator.js add 2 3       # 5
  node src/calculator.js divide 8 2    # 4
`);
    process.exit(code);
  }

  if (!cmd || cmd === '--help' || cmd === '-h') {
    usage(0);
  }

  if (!aRaw || !bRaw) {
    console.error('Error: two numeric operands are required.');
    usage(2);
  }

  const a = parseFloat(aRaw);
  const b = parseFloat(bRaw);
  if (Number.isNaN(a) || Number.isNaN(b)) {
    console.error('Error: operands must be valid numbers.');
    process.exit(3);
  }

  let result;
  try {
    switch (cmd.toLowerCase()) {
      case 'add':
      case '+':
        result = add(a, b);
        break;
      case 'subtract':
      case 'sub':
      case '-':
        result = subtract(a, b);
        break;
      case 'multiply':
      case 'mul':
      case '*':
        result = multiply(a, b);
        break;
      case 'divide':
      case 'div':
      case '/':
        result = divide(a, b);
        break;
      default:
        console.error(`Error: unknown operation \"${cmd}\".`);
        usage(2);
    }
  } catch (err) {
    if (err && String(err).includes('division by zero')) {
      console.error('Error: division by zero');
      process.exit(4);
    }
    console.error('Error:', err && err.message ? err.message : err);
    process.exit(1);
  }

  // Print result only
  console.log(result);
}
