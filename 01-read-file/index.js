const path = require('path');
const fs = require('fs');

const pathFile = path.join(__dirname, 'text.txt');

const readableStream = fs.createReadStream(pathFile);

readableStream.on('data', (chunk) => {
  console.log(chunk.toString());
});
