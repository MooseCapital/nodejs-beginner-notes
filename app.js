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
const { Client } = require("pg");
const client = new Client(process.env.DATABASE_URL);
client.connect()





// cockroachlabs db

async function testDB() {
  try {
    // const results = await client.query("SELECT * FROM peoplehalf2 p2 JOIN peoplehalf1 p1 ON p1.id = p2.id LIMIT 10");
    const results = await client.query("SELECT * FROM peoplehalf1 JOIN peoplehalf2 p on peoplehalf1.id = p.id LIMIT 5");
    console.table(results.rows)
  } catch (err) {
    console.error("error executing query:", err);
  }
}
testDB();











