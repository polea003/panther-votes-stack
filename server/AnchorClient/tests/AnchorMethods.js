const anchor = require('@project-serum/anchor');
const { Program } = anchor
const { Keypair, SystemProgram } = anchor.web3;
// const { Connection, PublicKey, clusterApiUrl } = require('@solana/web3.js');
const { PublicKey } = require('@solana/web3.js');
// const baseKP = require('../baseAccounts/BTiC9wJ2eVujEoTrbkcLeVR7drKX9Ws6RUxeyfCJTYmU.json')
const idl = require('./anchor_client.json');
require('dotenv').config();
// const payer = require("/Users/PAT/.config/solana/id.json");
// const PROGRAMID = '3APgHbVUurRJgBCuvxvEkmVYvv1hD4uhztFQjHknGsZs'
// const baseKP = require(`../${PROGRAMID}.json`)



exports.addVote = async (selection, userId, electionKeys) => {
  console.log("🚀 addVote Called...");

  const provider = anchor.Provider.env()
  anchor.setProvider(provider);

  const programID = new PublicKey(electionKeys.programId);
  const program = new Program(idl, programID, provider);

  const baseAccountKP = require(`../baseAccounts/${electionKeys.baseAccount}.json`)
  const arr = Object.values(baseAccountKP._keypair.secretKey)
  const secret = new Uint8Array(arr)
  const baseAccount = Keypair.fromSecretKey(secret)

  // Call add_vote!
  await program.rpc.addVote(selection, userId, {
    accounts: {
      baseAccount: baseAccount.publicKey
    },
  });
  let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log('👀 Vote Count', account.totalVotes.toString())
  console.log('👀 Votes', account.votes)
}

exports.getVotes = async () => {
  try {
    console.log("🚀 getVotes Called...");

    const provider = anchor.Provider.env()
    anchor.setProvider(provider);

    // const programID = new PublicKey(idl.metadata.address);
    const programID = new PublicKey(PROGRAMID);
    const program = new Program(idl, programID, provider);

    const arr = Object.values(baseKP._keypair.secretKey)
    const secret = new Uint8Array(arr)
    const baseAccount = Keypair.fromSecretKey(secret)
    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    
    return account.votes

  } catch (err) {
    console.log("Error in getElection: ", err)
    return null;
  }
}

exports.getVotes = async (electionKeys) => {
  try {
    console.log("🚀 getVotes Called...");

    const provider = anchor.Provider.env()
    anchor.setProvider(provider);

    // const programID = new PublicKey(idl.metadata.address);
    const programID = new PublicKey(electionKeys.programId);
    const program = new Program(idl, programID, provider);

    const baseAccountKP = require(`../baseAccounts/${electionKeys.baseAccount}.json`)
    const arr = Object.values(baseAccountKP._keypair.secretKey)
    const secret = new Uint8Array(arr)
    const baseAccount = Keypair.fromSecretKey(secret)
    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    
    return account.votes

  } catch (err) {
    console.log("Error in getElection: ", err)
    return null;
  }
} 