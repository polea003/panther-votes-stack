const express = require('express')
const mongodb = require('mongodb')
const { ObjectId } = require('mongodb/lib/bson')
const anchorClient = require('../../AnchorClient/tests/AnchorMethods.js')
const router = express.Router()

var mongoPool = require( '../../config/mongoPool' );
var electionCollection; 
var keypairsCollection;

router.get('/elections', (req, res) => {
	mongoPool.getElectionColl()
	.then((elections) => {
            console.log('Elections', elections);
            electionCollection = elections;
        });
});

router.get('/elections', (req, res) => {
	mongoPool.getKeypairsColl()
	.then((keypairs) => {
            console.log('Keypairs', keypairs);
            keypairsCollection = keypairs;
        });
});
/*var db = mongoPool.getDb();
console.log(db)
router.get('/', (req, res, next) => {  
    db.collection('elections').find().toArray((err, results) => {
        if (err) return console.log(err)
            res.render('elections', {elections: results, title: "Elections"})
    });
});

router.post('/', (req, res) => {
  db.collection('elections').save(req.body, (err, result) => {
    if (err) return console.log(err)
    res.redirect('/elections')
  })
});*/

/*const db = require('../../config/mongoPool').getDb()
const electionCollection = db.db('panther-db').collection('elections')
const keypairsCollection = db.db('panther-db').collection('keypairs')*/
//var db = require('../../app')
//var DB = db.getDB()


//const db = require('../../dbPool/dbs')
//const db = require('../../config/dbPool')
//const appjs = require('../../app')
//console.log(appjs)
//console.log(req.app.locals.dbs)
//const workPlease = appjs.dbs 
//const connectDB = require('../../config/db')
/*const app = express()

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

/*
var MongoClient = require('mongodb').MongoClient;
var db;
const url = "mongodb+srv://panther123:panther123@panther-db.gfe61.mongodb.net/panther-db?retryWrites=true&w=majority"
const options ={maxPoolSize: 100 }

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
*/

//Get
router.get('/', async (req, res) => {
    const elections = await electionCollection
    res.send(await elections.find({keys: {$exists: true}}).toArray())
})

//Get all votes from blockchain
router.get('/solana/', async (req, res) => {
    res.send(await anchorClient.getVotes())
})

router.get('/solana/:electionId', async (req, res) => {
    const elections = await loadElectionsCollection()
    const election = await elections.findOne({_id: new mongodb.ObjectId(req.params.electionId)})
    res.send(await anchorClient.getVotes(election.keys))
})


router.put('/:electionid/:Canadent_Number/:userid', async (req, res) => {
    const elections = await loadElectionsCollection()
    const election = await elections.findOne({ _id: new mongodb.ObjectId(req.params.electionid)})
    console.log(req.params.Canadent_Number)
    number = req.params.Canadent_Number
    console.log(req.params.userid)
    await anchorClient.addVote(parseInt(number), req.params.userid, election.keys)
    await elections.updateOne( {_id :  new mongodb.ObjectId(req.params.electionid)},{$inc: { [`Vote.${number - 1}.value`]  : 1 }}, {upsert: true})
    res.status(200).send()
})



//Add
router.post('/', async (req, res) => {
    const elections = await loadElectionsCollection()
    const keypairs = await loadKeypairCollection()
    const keypair = await keypairs.findOne({ inUse: false })
    await elections.insertOne({
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
    const elections = await loadElectionsCollection()
    await elections.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
    res.status(200).send()
})

async function loadElectionsCollection() {
    /*connectDB('mongodb+srv://panther123:panther123@panther-db.gfe61.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true
    })*/
   /*const client = await mongodb.MongoClient.connect
    ('mongodb+srv://panther123:panther123@panther-db.gfe61.mongodb.net/panther-db?retryWrites=true&w=majority', {
        useNewUrlParser: true
    })*/
    /*router.get('/elections', (req, res) => {
        db.get().db('panther-db').collection('elections').find({}).toArray()
        .then((elections) => {
                console.log('Elections:', elections);
                return elections
            });
    });*/
    /*var db = mongoPool.getDb();
    console.log(db)
    router.get('/', (req, res, next) => {  
    db.collection('elections').find().toArray((err, results) => {
        if (err) return console.log(err)
            res.render('elections', {elections: results, title: "Elections"})
            console.log(elections)
    });
});
console.log(db.collection('elections'))
    //console.log(elections)*/
    //return db.db('panther-db').collection('elections')
    return electionCollection

}

async function loadKeypairCollection() {
    /*const client = await mongodb.MongoClient.connect
    ('mongodb+srv://panther123:panther123@panther-db.gfe61.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true
    })*/
  /*connectDB('mongodb+srv://panther123:<password>@panther-db.gfe61.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true
})*/

   /* router.get('/keypairs', (req, res) => {
        db.get().db('panther-db').collection('keypairs').find({}).toArray()
        .then((keypairs) => {
            console.log('Keypairs:', keypairs);
            return keypairs
        });
    });
*/
    return keypairsCollection
    //return db.db('panther-db').collection('keypairs')
  }

module.exports = router