//app.js
const axios = require('axios');
const fs = require('fs/promises');
const fsSync = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const EventEmitter = require('events');
const os = require("os");
const http = require("http");
const {readHTML} = require("./paths");
const eventEmitter = new EventEmitter();

/*
axios.get('https://jsonplaceholder.typicode.com/posts/1')
              .then(res => {
                // console.log(`statusCode: ${res.status}`);
                console.log(res.data);
              })
              .catch(error => {
                console.error(error);
              });

*/
console.log('hello')



// fs.readFile('./files/index.html')


/* async function indexRead(filename) {
  const fileName = `./files/${filename}`;
  try {
    const data = await fs.readFile(fileName, 'utf8');
    console.log(data)
    return data
    //const content = '';
    //await fs.writeFile(fileName, content);
  } catch (err) {
    console.log(err);
  }
} */









