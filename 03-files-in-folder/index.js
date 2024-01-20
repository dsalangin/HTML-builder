const path = require('path');
const { readdir, stat } = require('node:fs/promises');

const pathDir = path.join(__dirname, 'secret-folder');

readdir(pathDir, { withFileTypes: true }).then((files) => {
  for (const file of files) {
    if (file.isFile()) {
      const pathFile = path.join(pathDir, file.name);
      const fileName = path.basename(pathFile).split('.')[0];
      const fileExtname = path.extname(pathFile).replace('.', '');
      stat(pathFile).then((fileStats) => {
        const fileSize = fileStats.size / 1000;
        console.log(`${fileName} - ${fileExtname} - ${fileSize}kb`);
      });
    }
  }
});
