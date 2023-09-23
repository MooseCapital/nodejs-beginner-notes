//app.js
const axios = require('axios');
const fs = require('fs/promises');
const path = require('path');
/*

axios.get('https://jsonplaceholder.typicode.com/posts/2')
              .then(res => {
                // console.log(`statusCode: ${res.status}`);
                console.log(res.data);
              })
              .catch(error => {
                console.error(error);
              });
*/

/* async function test() {
  const fileName = './files/test.txt';
  try {
    const data = await fs.readFile(fileName, 'utf8');
    console.log(data);
    //const content = '';
    //await fs.writeFile(fileName, content);
  } catch (err) {
    console.log(err);
  }
}
test(); */

//reading files in node
async function teststat() {
  const fileName = './files/test.txt';
  try {
    const data = await fs.readFile(fileName, { encoding: 'utf8' })
    console.log(data)
  } catch (err) {
    console.log(err);
  }
}
teststat();



