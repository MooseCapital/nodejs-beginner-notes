//app.js
const axios = require('axios');
const fs = require('fs/promises');
const FS = require('fs');
const fsSync = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const EventEmitter = require('events');
const os = require("os");
const http = require("http");
const {readHTML} = require("./paths");
const uuid = require("uuid");
const eventEmitter = new EventEmitter();
require('dotenv').config();

/*

const { Client } = require("pg");
const client = new Client(process.env.DATABASE_URL);
client.connect() */



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI

// Create a MongoClient with a MongoClientOptions object to set the Stable API version


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (e) {
    console.log(`we have an error, oops: ${e}`)
  }
  finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run()

//mongodb test find query
async function test() {
  try {
    const database = client.db('sample_restaurants').collection('restaurants')
    // const data = await client.db('sample_restaurants').collection('restaurants').findOne({cuisine: "Bakery"})
    const data = await database.findOne({cuisine: "American"})
    console.log(data.name)
  } catch (err) {
    console.log(err);
  }
}
test();














// cockroachlabs db

/* async function testDB() {
  try {
    // const results = await client.query("SELECT * FROM peoplehalf2 p2 JOIN peoplehalf1 p1 ON p1.id = p2.id LIMIT 10");
    const results = await client.query("SELECT * FROM peoplehalf1 JOIN peoplehalf2 p on peoplehalf1.id = p.id LIMIT 5");
    console.table(results.rows)
  } catch (err) {
    console.error("error executing query:", err);
  }
}
testDB(); */











