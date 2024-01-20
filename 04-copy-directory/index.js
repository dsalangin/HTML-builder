const path = require('path');
const { mkdir, readdir, copyFile } = require('node:fs/promises');

const srcDir = path.join(__dirname, 'files');
const copyDir = path.join(__dirname, 'files-copy');

mkdir(copyDir, { recursive: true }, (error) => {
  console.log(error.message);
}).then(
  readdir(srcDir).then((files) => {
    for (const file of files) {
      copyFile(path.join(srcDir, file), path.join(copyDir, file));
    }
  }),
);
