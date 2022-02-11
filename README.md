STEPS FOR A FRESH SPIN UP OF A NEW VOTING DAPP:

1. run createKeypair.js in anchor client to create base account keypair
2. in terminal, run "solana-keygen new --outfile ./serverWalletKeypair.json"
3. in terminal, run "solana-keygen pubkey ./serverWalletKeypair.json" to get wallet pubkey, then send it some SOL
4. delete target/deploy/anchor_client-keypair.json if there
5. run anchor build
6. get public address of programId solana address -k target/deploy/anchor_client-keypair.json for programId
7. update Anchor.toml, lib.rs with programId
8. run anchor build again
9. if idl does not contain "metadata", add it with programId like so:
"metadata": {
    "address": "8dRXv5ZruSWHJCskoTpKPcmrqgXhJMzQtQtYTtqBYX6c"
}
10. run "anchor test" to run AnchorDeploy.js. Make sure runMain() isn't commented out so the program runs
    and a base account is initialized. For now, it defaults to the local wallet to pay for deployment.
    After intializing the base account with "anchor test" comment out runMain() so it does not run again.
11. Spin up backend as usual with "npm run dev". Server is now writing to blockchain.