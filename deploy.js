const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')

const {abiCode, bytecode} = require('./compile')
const {mnemonic,endpoint} = require('./config')

const provider = new HDWalletProvider(
    mnemonic,
    endpoint,
    0
)

const web3 = new Web3(provider);

const INIT_MESSAGE = 'Hello world!'

const deploy = async () => {
    const accounts = await web3.eth.getAccounts()
    console.log(`Attempting to deploy from account`,accounts[0])
    const inboxContract = await new web3.eth.Contract(abiCode)
        .deploy({
            data: bytecode,
            arguments: [INIT_MESSAGE]
        })
        .send({
            gas: '1000000',
            from: accounts[0]
        })
    console.log('Contract deployed to ', inboxContract.options.address)
    provider.engine.stop()
}

deploy()