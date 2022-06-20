const dotenv = require('dotenv')

dotenv.config()

module.exports = {
    mnemonic: process.env.MNEMONIC,
    endpoint: process.env.ENDPOINT
}