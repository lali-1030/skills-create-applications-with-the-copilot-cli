#!/usr/bin/env node

// Node.js CLI Calculator
// Supported operations:
// - add: addition
// - subtract: subtraction
// - multiply: multiplication
// - divide: division

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
switch (cmd.toLowerCase()) {
  case 'add':
  case '+':
    result = a + b;
    break;
  case 'subtract':
  case 'sub':
  case '-':
    result = a - b;
    break;
  case 'multiply':
  case 'mul':
  case '*':
    result = a * b;
    break;
  case 'divide':
  case 'div':
  case '/':
    if (b === 0) {
      console.error('Error: division by zero');
      process.exit(4);
    }
    result = a / b;
    break;
  default:
    console.error(`Error: unknown operation "${cmd}".`);
    usage(2);
}

// Print result only
console.log(result);
