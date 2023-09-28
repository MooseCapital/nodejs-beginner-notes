const fs = require('fs/promises');

async function readHTML(filename) {
  const fileName = `./files/${filename}`;
  try {
    const data = await fs.readFile(fileName, 'utf8');
    return data
    //const content = '';
    //await fs.writeFile(fileName, content);
  } catch (err) {
    console.log(err);
  }
}


module.exports = {readHTML}