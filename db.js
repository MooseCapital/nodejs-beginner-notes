const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

let dbConnection;

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect(process.env.MONGODB_URI)
            .then((client) => {
                dbConnection = client.db('app')
                //callback to run after connection is complete
                return cb()
            })
            .catch((err) => {
                console.log(err)
                return cb(err)
            })
    },
    getDb: () => dbConnection
}


/*
connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
        console.log('app listening on 3000')
    })
    db = getDb();
  }
})*/
