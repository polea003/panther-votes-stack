
// const baseKP = require('./baseAccounts/baseAccountKeypair.json')

const anchor = require('@project-serum/anchor');
const { Program } = anchor
const { Keypair, SystemProgram } = anchor.web3;
// const baseKP = require('./baseAccountKeypair.json')
// const progID = require('./target/deploy/anchor_client-keypair.json')
const { binary_to_base58 } = require('base58-js')
const fs = require('fs');

// const keyToStr = (key) => {
//     const arr = Object.values(key)
//     const secret = new Uint8Array(arr)
//     const accountKeyPair = Keypair.fromSecretKey(secret)
//     const pubKeyStr = binary_to_base58(accountKeyPair._keypair.publicKey)
//     return pubKeyStr
  
// }

// console.log('base account:')
// console.log(keyToStr(baseKP._keypair.secretKey))
// console.log('program id:')
// console.log(keyToStr(progID))

// fs.rename('baseAccountKeypair', `./baseAccounts/${baseAccountPubKeyStr}.json`, () => {})
// fs.rename('./target/deploy/anchor_client-keypair.json', `./target/deploy/${programPubKeyStr}.json`, () => {})

fs.readFile('Anchor.toml', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(/anchor_client = ".\w+"/g, `anchor_client = "${process.argv[2]}"`);

  fs.writeFile('Anchor.toml', result, 'utf8', function (err) {
     if (err) return console.log(err);
  });
});

fs.readFile('./programs/AnchorClient/src/lib.rs', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    var result = data.replace(/declare_id!\(".\w+"\)/g, `declare_id!("${process.argv[2]}")`);
  
    fs.writeFile('./programs/AnchorClient/src/lib.rs', result, 'utf8', function (err) {
       if (err) return console.log(err);
    });
  });