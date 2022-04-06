const express = require('express')
const mongodb = require('mongodb')
const { ObjectId } = require('mongodb/lib/bson')
const anchorClient = require('../../AnchorClient/tests/AnchorMethods.js')
const router = express.Router()
const Election = require('../../Models/electionModel')

// const Election = await loadElectionCollection()
//Get
router.get('/', async (req, res) => {
    res.send(await Election.find({keys: {$exists: true}}))
})

//Get all votes from blockchain
router.get('/solana/', async (req, res) => {
    res.send(await anchorClient.getVotes())
})

router.get('/solana/:electionId', async (req, res) => {
    const election = await Election.findOne({_id: new mongodb.ObjectId(req.params.electionId)})
    res.send(await anchorClient.getVotes(election.keys))
})


router.put('/:electionid/:Canadent_Number/:userid', async (req, res) => {
    const election = await Election.findOne({ _id: new mongodb.ObjectId(req.params.electionid)})
    console.log(req.params.Canadent_Number)
    number = req.params.Canadent_Number
    console.log(req.params.userid)
    await anchorClient.addVote(parseInt(number), req.params.userid, election.keys)
    await Election.updateOne( {_id :  new mongodb.ObjectId(req.params.electionid)},{$inc: { [`Vote.${number - 1}.value`]  : 1 }}, {upsert: true})
    res.status(200).send()
})



//Add
router.post('/', async (req, res) => {
    const keypairs = await loadKeypairCollection()
    const keypair = await keypairs.findOne({ inUse: false })
    await Election.insertOne({
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
        userProfile: req.body.userProfile,
    })
    await keypairs.updateOne({ _id: keypair._id }, { $set: { inUse: true }})
    res.status(201).send()
})

//Delete
router.delete('/:id', async (req, res) => {
    await Election.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
    res.status(200).send()
})

async function loadElectionCollection() {
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://panther123:panther123@panther-db.gfe61.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true
    })

    return client.db('panther-db').collection('Election')
}

async function loadKeypairCollection() {
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://panther123:panther123@panther-db.gfe61.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true
    })
  
    return client.db('panther-db').collection('keypairs')
  }

module.exports = router