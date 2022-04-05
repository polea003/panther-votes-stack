/** request routing logic */
module.exports = function (app, dbs) {

    app.get('/database', (req, res) => {
        console.log('hello!')
        dbs.electionDB.db('panther-db').collection('elections').find({}).toArray((err, docs) => {
            if (err) {
                console.log(err)
                res.error(err)
            } else {
                res.json(docs)
                console.log(docs)
            }
        })
    })

    /*app.get('/keyDB', (req, res) => {
        dbs.keyDB.collection('test').find({}).toArray((err, docs) => {
            if (err) {
                console.log(err)
                res.error(err)
            } else {
                res.json(docs)
            }
        })
    })*/

    return app
}