const express = require('express')
const mongodb = require('mongodb')
const { ObjectId } = require('mongodb/lib/bson')
const anchorClient = require('../../AnchorClient/tests/AnchorMethods.js')
const router = express.Router()
<<<<<<< HEAD
const Election = require('../../Models/electionModel')
//const db = require('../../dbPool/dbs')
//const db = require('../../config/dbPool')
//const appjs = require('../../app')
//console.log(appjs)
//console.log(req.app.locals.dbs)
//const workPlease = appjs.dbs 
//const connectDB = require('../../config/db')
/*const app = express()
=======
const elections = loadElectionsCollection()
const keypairsVar = loadKeypairCollection()

>>>>>>> Testbranch

const initializeDatabases = require('../../dbPool/dbs')
const routes = require('../../dbPool/routes')

initializeDatabases().then(dbs => {
  // Initialize the application once database connections are ready.
  routes(app, dbs).listen(3000, () => console.log('Listening on port 3000'))
}).catch(err => {
  console.error('Failed to make all database connections!')
  console.error(err)
  process.exit(1)
})*/

//http://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html#mongoclient-connect
var MongoClient = require('mongodb').MongoClient;
var db;
const url = "mongodb+srv://panther123:panther123@panther-db.gfe61.mongodb.net/panther-db?retryWrites=true&w=majority"
var options ={maxPoolSize: 100 }

// Initialize connection once 
MongoClient.connect(url, options, function(err, database){
  if(err) throw err;

    db = database;
    //coll = db.collection('elections');
    //app.listen(3000);
    //console.log('Listening on port 3000');
    console.log('Connected!...maybe election.js pool')
})
//https://blog.mlab.com/2013/11/deep-dive-into-connection-pooling/


// const Election = await loadElectionCollection()
//Get

router.get('/', async (req, res) => {
<<<<<<< HEAD
    res.send(await Election.find({keys: {$exists: true}}))
=======
    //const elections = await loadElectionsCollection()
    const election = await elections
    res.send(await election.find({keys: {$exists: true}}).toArray())
     //elections.close()
>>>>>>> Testbranch
})

//Get all votes from blockchain
router.get('/solana/', async (req, res) => {
    res.send(await anchorClient.getVotes())
})

router.get('/solana/:electionId', async (req, res) => {
<<<<<<< HEAD
    const election = await Election.findOne({_id: new mongodb.ObjectId(req.params.electionId)})
    res.send(await anchorClient.getVotes(election.keys))
=======
    //const elections = await loadElectionsCollection()
    const election = await elections
    const ele = await election.findOne({_id: new mongodb.ObjectId(req.params.electionId)})
    res.send(await anchorClient.getVotes(ele.keys))
>>>>>>> Testbranch
})


router.put('/:electionid/:Canadent_Number/:userid', async (req, res) => {
<<<<<<< HEAD
    const election = await Election.findOne({ _id: new mongodb.ObjectId(req.params.electionid)})
    console.log(req.params.Canadent_Number)
    number = req.params.Canadent_Number
    console.log(req.params.userid)
    await anchorClient.addVote(parseInt(number), req.params.userid, election.keys)
    await Election.updateOne( {_id :  new mongodb.ObjectId(req.params.electionid)},{$inc: { [`Vote.${number - 1}.value`]  : 1 }}, {upsert: true})
=======
   // const elections = await loadElectionsCollection()
   const election = await elections
    const ele = await election.findOne({ _id: new mongodb.ObjectId(req.params.electionid)})
    console.log(req.params.Canadent_Number)
    number = req.params.Canadent_Number
    console.log(req.params.userid)
    await anchorClient.addVote(parseInt(number), req.params.userid, ele.keys)
    await election.updateOne( {_id :  new mongodb.ObjectId(req.params.electionid)},{$inc: { [`Vote.${number - 1}.value`]  : 1 }}, {upsert: true})
>>>>>>> Testbranch
    res.status(200).send()

})



//Add
router.post('/', async (req, res) => {
<<<<<<< HEAD
    const keypairs = await loadKeypairCollection()
    const keypair = await keypairs.findOne({ inUse: false })
    await Election.insertOne({
=======
    //const elections = await loadElectionsCollection()
    const election = await elections
    //const keypairs = await loadKeypairCollection()
    const keypairs = await keypairsVar
    const keypair = await keypairs.findOne({ inUse: false })
    await election.insertOne({
>>>>>>> Testbranch
        text: req.body.text,
        club: req.body.club,
        Candidate1FirstName: req.body.Candidate1FirstName,
        Candidate1LastName: req.body.Candidate1LastName,
        Candidate2FirstName: req.body.Candidate2FirstName,
        Candidate2LastName: req.body.Candidate2LastName,
        Poisition: req.body.Poisition,
        createdAt: new Date(),
        Vote1: req.body.Vote1,
        Vote2: req.body.Vote2,
        FirstName: req.body.FirstName,
        LastName : req.body.LastName,
        keys: {
            baseAccount: keypair.baseAccount,
            programId: keypair.progId
        },
        FullName : req.body.FullName,
        NumberOfCandidates: req.body.NumberOfCandidates,
        Vote: req.body.Vote,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        UserProfile: req.body.UserProfile,
    })
    await keypairs.updateOne({ _id: keypair._id }, { $set: { inUse: true }})
    res.status(201).send()

})

//Delete
router.delete('/:id', async (req, res) => {
<<<<<<< HEAD
    await Election.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
=======
    //const elections = await loadElectionsCollection()
   const  election = await elections
    await election.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
>>>>>>> Testbranch
    res.status(200).send()

})

/*async function loadElectionsCollection() {
    /*connectDB('mongodb+srv://panther123:panther123@panther-db.gfe61.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true
    })*/
   /*const client = await mongodb.MongoClient.connect
    ('mongodb+srv://panther123:panther123@panther-db.gfe61.mongodb.net/panther-db?retryWrites=true&w=majority', {
        useNewUrlParser: true
    })*/

    /*return db.db('panther-db').collection('elections')
}*/

async function loadKeypairCollection() {
    /*const client = await mongodb.MongoClient.connect
    ('mongodb+srv://panther123:panther123@panther-db.gfe61.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true
<<<<<<< HEAD
    })*/
  /*connectDB('mongodb+srv://panther123:<password>@panther-db.gfe61.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true
})*/
    return db.db('panther-db').collection('keypairs')
=======
    })
  
    return client.db('panther-db').collection('keypairs') 
>>>>>>> Testbranch
  }

module.exports = router