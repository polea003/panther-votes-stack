// run with $ node createKeyPair.js

const fs = require('fs')
const anchor = require("@project-serum/anchor")

const account = anchor.web3.Keypair.generate()

fs.writeFileSync('./baseAccountKeypair.json', JSON.stringify(account))