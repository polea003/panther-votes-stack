const anchor = require('@project-serum/anchor');
const { Program } = anchor
const { Keypair, SystemProgram } = anchor.web3;
// const { Connection, PublicKey, clusterApiUrl } = require('@solana/web3.js');
const { PublicKey } = require('@solana/web3.js');
const baseKP = require('../baseAccountKeypair.json')
const idl = require('./anchor_client.json');
require('dotenv').config();
// const payer = require("/Users/PAT/.config/solana/id.json");

const main = async() => {
  console.log("🚀 Starting test...");

  const provider = anchor.Provider.env()
  anchor.setProvider(provider);
  const program = anchor.workspace.AnchorClient;

  // const programID = new PublicKey(idl.metadata.address);
  // const program = new Program(idl, programID, provider);

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

  // Fetch data from the account.
  // let account = await program.account.baseAccount.fetch(baseAccount.publicKey);

  // Call add_vote!
  await program.rpc.addVote(7, '_test-353456345634563456', {
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
    },
  });

  // Get the account again to see what changed.
  let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log('👀 Vote Count', account.totalVotes.toString())
  console.log('👀 Votes', account.votes)
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// runMain(); 


exports.addVote = async (selection, electionId) => {
  console.log("🚀 addVote Called...");

  const provider = anchor.Provider.env()
  anchor.setProvider(provider);

  const programID = new PublicKey(idl.metadata.address);
  const program = new Program(idl, programID, provider);

  const arr = Object.values(baseKP._keypair.secretKey)
  const secret = new Uint8Array(arr)
  const baseAccount = Keypair.fromSecretKey(secret)

  // Call add_vote!
  await program.rpc.addVote(selection, electionId, {
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
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

    const programID = new PublicKey(idl.metadata.address);
    const program = new Program(idl, programID, provider);

    const arr = Object.values(baseKP._keypair.secretKey)
    const secret = new Uint8Array(arr)
    const baseAccount = Keypair.fromSecretKey(secret)
    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    
    return account.votes

  } catch (err) {
    console.log("Error in getElection: ", error)
    return null;
  }
} 