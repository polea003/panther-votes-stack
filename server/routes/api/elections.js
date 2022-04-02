const express = require('express')
const mongodb = require('mongodb')
const { ObjectId } = require('mongodb/lib/bson')
const anchorClient = require('../../AnchorClient/tests/AnchorMethods.js')
const router = express.Router()
const elections = loadElectionsCollection()
const keypairsVar = loadKeypairCollection()


//Get

router.get('/', async (req, res) => {
    //const elections = await loadElectionsCollection()
    const election = await elections
    res.send(await election.find({keys: {$exists: true}}).toArray())
   elections.close
})

//Get all votes from blockchain
router.get('/solana/', async (req, res) => {
    res.send(await anchorClient.getVotes())
})

router.get('/solana/:electionId', async (req, res) => {
    //const elections = await loadElectionsCollection()
    const election = await elections
    const ele = await election.findOne({_id: new mongodb.ObjectId(req.params.electionId)})
    res.send(await anchorClient.getVotes(ele.keys))
    elections.close
})


router.put('/:electionid/:Canadent_Number/:userid', async (req, res) => {
   // const elections = await loadElectionsCollection()
   const election = await elections
    const ele = await election.findOne({ _id: new mongodb.ObjectId(req.params.electionid)})
    console.log(req.params.Canadent_Number)
    number = req.params.Canadent_Number
    console.log(req.params.userid)
    await anchorClient.addVote(parseInt(number), req.params.userid, ele.keys)
    await election.updateOne( {_id :  new mongodb.ObjectId(req.params.electionid)},{$inc: { [`Vote.${number - 1}.value`]  : 1 }}, {upsert: true})
    res.status(200).send()
    elections.close

})



//Add
router.post('/', async (req, res) => {
    //const elections = await loadElectionsCollection()
    const election = await elections
    //const keypairs = await loadKeypairCollection()
    const keypairs = await keypairsVar
    const keypair = await keypairs.findOne({ inUse: false })
    await election.insertOne({
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
    elections.close

})

//Delete
router.delete('/:id', async (req, res) => {
    //const elections = await loadElectionsCollection()
   const  election = await elections
    await election.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
    res.status(200).send()
    elections.close

})

async function loadElectionsCollection() {
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://panther123:panther123@panther-db.gfe61.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true
    })

    return client.db('panther-db').collection('elections')
}

async function loadKeypairCollection() {
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://panther123:panther123@panther-db.gfe61.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true
    })
  
    return client.db('panther-db').collection('keypairs')
  }

module.exports = router