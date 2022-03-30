const anchor = require('@project-serum/anchor');
const { Program } = anchor
const { Keypair, SystemProgram } = anchor.web3;
// const { Connection, PublicKey, clusterApiUrl } = require('@solana/web3.js');
const { PublicKey } = require('@solana/web3.js');
const baseKP = require('../baseAccountKeypair.json')
const idl = require('./anchor_client.json');
require('dotenv').config();
const progID = require('../target/deploy/anchor_client-keypair.json')
const { binary_to_base58 } = require('base58-js')
const mongodb = require('mongodb')
const { ObjectId } = require('mongodb/lib/bson')
const fs = require('fs');

// Below added for cleanup after anchor build
const keyToStr = (key) => {
    const arr = Object.values(key)
    const secret = new Uint8Array(arr)
    const accountKeyPair = Keypair.fromSecretKey(secret)
    const pubKeyStr = binary_to_base58(accountKeyPair._keypair.publicKey)
    return pubKeyStr
}

async function loadKeypairCollection() {
  const client = await mongodb.MongoClient.connect
  ('mongodb+srv://panther123:panther123@panther-db.gfe61.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
      useNewUrlParser: true
  })

  return client.db('panther-db').collection('keypairs')
}


const main = async() => {
  console.log("🚀 Starting test...");

  const provider = anchor.Provider.env()
  anchor.setProvider(provider);
  const program = anchor.workspace.AnchorClient;


  const arr = Object.values(baseKP._keypair.secretKey)
  const secret = new Uint8Array(arr)
  const baseAccount = Keypair.fromSecretKey(secret)

  // Can comment below out after initial run because account is already initialized
  let tx = await program.rpc.initialize({
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
    },
    signers: [baseAccount],
  });

  console.log("📝 Your cd .. signature", tx);
}

const runMain = async () => {
  try {


    await main();

    // put in database
    baseAccountPubkKeyStr = keyToStr(baseKP._keypair.secretKey)
    programPubKeyStr = keyToStr(progID)
    const keypairs = await loadKeypairCollection()
    await keypairs.insertOne({
        baseAccount: baseAccountPubkKeyStr,
        progId: programPubKeyStr,
        inUse: false
    })

    //rename
    console.log('base account:')
    console.log(keyToStr(baseKP._keypair.secretKey))
    console.log('program id:')
    console.log(keyToStr(progID))
    fs.rename('baseAccountKeypair.json', `./baseAccounts/${baseAccountPubkKeyStr}.json`, () => {})
    fs.rename('./target/deploy/anchor_client-keypair.json', `./target/deploy/${programPubKeyStr}.json`, () => {})

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();