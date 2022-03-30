#!/bin/bash

solana airdrop 2

node createKeypair.js

anchor build

node replaceProgramId.js $(solana address -k target/deploy/anchor_client-keypair.json)

anchor test

solana airdrop 2
