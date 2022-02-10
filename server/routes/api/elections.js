const express = require('express')
const mongodb = require('mongodb')
const { ObjectId } = require('mongodb/lib/bson')
const anchorClient = require('../../AnchorClient/tests/AnchorDeploy.js')
const router = express.Router()

//Get
router.get('/', async (req, res) => {
    const elections = await loadElectionsCollection()
    res.send(await elections.find({}).toArray())
})
router.put('/:id/:Canadent_Number', async (req, res) => {
    const elections = await loadElectionsCollection()
    console.log(req.params.Canadent_Number)
    number = req.params.Canadent_Number
    await anchorClient.addVote(parseInt(number))
    await elections.updateOne( {_id :  new mongodb.ObjectId(req.params.id)},{$inc: { [`Vote.${number - 1}.value`]  : 1 }}, {upsert: true})
    res.status(200).send()
})



//Add
router.post('/', async (req, res) => {
    const elections = await loadElectionsCollection()
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
        NumberOfCandidates: req.body.NumberOfCandidates,
        Vote: req.body.Vote
    })
    res.status(201).send()
})

//Delete
router.delete('/:id', async (req, res) => {
    const elections = await loadElectionsCollection()
    await elections.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
    res.status(200).send()
})

async function loadElectionsCollection() {
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://panther123:panther123@panther-db.gfe61.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true
    })

    return client.db('panther-db').collection('elections')
}

module.exports = router