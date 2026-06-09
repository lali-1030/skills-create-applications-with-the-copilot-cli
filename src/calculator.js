

// Node.js CLI Calculator
// Supported operations:
// - add: addition
// - subtract: subtraction
// - multiply: multiplication
// - divide: division

// Node.js CLI Calculator
// Supported operations:
// - add: addition
// - subtract: subtraction
// - multiply: multiplication
// - divide: division
// - modulo: remainder (a % b)
// - power: exponentiation (a ** b)
// - squareRoot: square root (sqrt(a))

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

function modulo(a, b) {
  if (b === 0) throw new Error('division by zero');
  return a % b;
}

function power(base, exponent) {
  return Math.pow(base, exponent);
}

function squareRoot(n) {
  if (n < 0) throw new Error('sqrt of negative number');
  return Math.sqrt(n);
}

module.exports = { add, subtract, multiply, divide, modulo, power, squareRoot };

// CLI wrapper: keep backward-compatible behavior when invoked directly
if (require.main === module) {
  const [, , cmd, aRaw, bRaw] = process.argv;

  function usage(code = 0) {
    console.log(`Usage: node src/calculator.js <operation> <a> <b>\n
Operations:
  add       addition (a + b)
  subtract  subtraction (a - b)
  multiply  multiplication (a * b)
  divide    division (a / b)
  mod       modulo/remainder (a % b)
  pow       exponentiation (a ** b)
  sqrt      square root (sqrt(a))\n
Examples:
  node src/calculator.js add 2 3       # 5
  node src/calculator.js divide 8 2    # 4
  node src/calculator.js mod 10 3      # 1
  node src/calculator.js pow 2 3       # 8
  node src/calculator.js sqrt 9        # 3
`);
    process.exit(code);
  }

  if (!cmd || cmd === '--help' || cmd === '-h') {
    usage(0);
  }

  // For sqrt (unary) allow a single operand; others require two
  const unaryOps = new Set(['sqrt', 'sqrtroot', 'sqr', '√']);
  const twoArgOps = new Set(['add', '+', 'subtract', 'sub', '-', 'multiply', 'mul', '*', 'divide', 'div', '/', 'mod', 'modulo', 'pow', 'power']);

  if (unaryOps.has(cmd.toLowerCase())) {
    if (!aRaw) {
      console.error('Error: one numeric operand is required for sqrt.');
      usage(2);
    }
  } else {
    if (!aRaw || !bRaw) {
      console.error('Error: two numeric operands are required.');
      usage(2);
    }
  }

  const a = aRaw !== undefined ? parseFloat(aRaw) : undefined;
  const b = bRaw !== undefined ? parseFloat(bRaw) : undefined;
  if ((a !== undefined && Number.isNaN(a)) || (b !== undefined && Number.isNaN(b))) {
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
      case 'mod':
      case 'modulo':
        result = modulo(a, b);
        break;
      case 'pow':
      case 'power':
        result = power(a, b);
        break;
      case 'sqrt':
        result = squareRoot(a);
        break;
      default:
        console.error(`Error: unknown operation \"${cmd}\".`);
        usage(2);
    }
  } catch (err) {
    const msg = err && err.message ? err.message : String(err);
    if (msg.includes('division by zero')) {
      console.error('Error: division by zero');
      process.exit(4);
    }
    if (msg.includes('sqrt of negative')) {
      console.error('Error: square root of negative number');
      process.exit(5);
    }
    console.error('Error:', msg);
    process.exit(1);
  }

  // Print result only
  console.log(result);
}
