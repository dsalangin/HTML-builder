const path = require('path');
const fs = require('fs');
const { stdin, stdout } = process;

const pathFile = path.join(__dirname, 'text.txt');
fs.writeFile(pathFile, '', (error) => {
  if (error) {
    stdout.write(error.message);
  }
});

process.on('SIGINT', () => {
  process.exit();
});

process.on('exit', () => {
  stdout.write('Good luck!');
});

stdin.setEncoding('utf-8');
stdin.on('data', (data) => {
  if (data.trim().split('\n')[0] === 'exit') {
    process.exit();
  }
  fs.appendFile(pathFile, data, (error) => {
    if (error) {
      stdin.out(error.message);
    }
  });
});

stdin.on('error', (error) => {
  if (error) {
    stdout(error.message);
  }
});
