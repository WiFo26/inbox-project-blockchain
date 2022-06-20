const assert = require('assert')
const ganache = require('ganache')
const Web3 = require('web3')
const {abiCode,bytecode} = require('../compile')

const provider = ganache.provider()
const web3 = new Web3(provider)

let accounts;
let inbox;
const INIT_MESSAGE = 'Hello world!'
const NEW_MESSAGE = 'Bye world!'

beforeEach(async () => {
    accounts = await web3.eth.getAccounts()

    inbox = await new web3.eth.Contract(abiCode) // create the contract with the json Interface
        .deploy({                  // set the contract with the bytecode and the arguments to deploy 
            data: bytecode,             
            arguments: [INIT_MESSAGE]
        })
        .send({             // deploy the contract in the blockchain
            from: accounts[0],
            gas: '1000000'
        })
})

describe('Inbox', () => {
    it('can deploy a contract', () => {
        assert.ok(inbox.options.address)
    }),
    it('has a default message', async () => {
        const message = await inbox.methods.message().call()
        assert.equal(message,INIT_MESSAGE)
    }),
    it('can change message', async() => {
        await inbox.methods.setMessage(NEW_MESSAGE).send(
            {from : accounts[0]}
        )
        const message = await inbox.methods.message().call()
        assert.equal(message,NEW_MESSAGE)
    })
})