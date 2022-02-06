const express = require('express')
const mongodb = require('mongodb')
const router = express.Router()

//Get
router.get('/', async (req, res) => {
    const elections = await loadElectionsCollection()
    res.send(await elections.find({}).toArray())
})


//Add
router.post('/', async (req, res) => {
    const elections = await loadElectionsCollection()
    await elections.insertOne({
        text: req.body.text,
        createdAt: new Date()
    })
    res.status(201).send()
})

//Update 
router.put('/:id/:candidateId', async (req, res) => {
    const elections = await loadElectionsCollection()
    const vote = `Vote${req.params.candidateId}`
    await elections.updateOne(
        { _id: new mongodb.ObjectId(req.params.id) },
        { $inc: { [vote]: 1 } }
    )

    // await elections.insertOne({
    //     text: req.body.text,
    //     createdAt: new Date()
    // })
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