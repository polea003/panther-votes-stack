/** request routing logic */
/* linked to app.js, couldn't figure out in time */
/*
module.exports = function (app, dbs) {

    //console.log('hello!')
   //console.log(dbs.electionDB.collection('elections').find({}).toArray())

    app.get('/electionDB', (req, res) => {
        console.log('hellFUCKINo!')
        dbs.electionDB.collection('elections').find({}).toArray((err, docs) => {
        //dbs.electionDB.db('panther-db').collection('elections').find({}).toArray((err, docs) => {
            console.log('HELLO')
            if (err) {
                console.log(err)
                res.error(err)
            } else {
                res.json(docs)
                //console.log(dbs.electionDB.collection('panther-db').find({}).toArray())

                console.log('hello!')
            }
        })
    })
  
    //console.log(app)
    return app
}
*/