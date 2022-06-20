const path = require('path')
const fs = require('fs')
const solc = require('solc');

const inboxPath = path.resolve(__dirname,'contracts','Inbox.sol')
const source = fs.readFileSync(inboxPath,'utf-8')

const input = {
  language: 'Solidity',
  sources: {
    'Inbox.sol': {
      content: source
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

const abiCode = output.contracts['Inbox.sol']['Inbox'].abi
const bytecode = output.contracts['Inbox.sol']['Inbox'].evm.bytecode.object

module.exports = {
    abiCode,
    bytecode
}

// // `output` here contains the JSON output as specified in the documentation
// for (var contractName in output.contracts['Inbox.sol']) {
//   console.log(
//     contractName +
//       ': ' +
//       output.contracts['Inbox.sol'][contractName].evm.bytecode.object
//   );
// }