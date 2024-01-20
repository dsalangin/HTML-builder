const path = require('path');
const { readdir, readFile, writeFile } = require('node:fs/promises');

const projectDist = path.join(__dirname, 'project-dist');
const stylePath = path.join(projectDist, 'bundle.css');
const styles = [];

const styleDir = path.join(__dirname, 'styles');
readdir(styleDir).then((files) => {
  for (const file of files) {
    const filePath = path.join(styleDir, file);
    const fileExtname = path.extname(filePath);
    if (fileExtname === '.css') {
      readFile(filePath, { encoding: 'utf-8' })
        .then((data) => {
          styles.push(data);
        })
        .then(() => {
          writeFile(stylePath, styles.join(''));
        });
    }
  }
});
