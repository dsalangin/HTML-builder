const path = require('path');
const {
  mkdir,
  readdir,
  copyFile,
  readFile,
  writeFile,
} = require('node:fs/promises');

const projectDist = path.join(__dirname, 'project-dist');
mkdir(projectDist, { recursive: true }, (error) => {
  console.log(error.message);
});

async function buildHtml() {
  const htmlTemplatePath = path.join(__dirname, 'template.html');
  const componentsPath = path.join(__dirname, 'components');
  let htmlTemplate = await readFile(htmlTemplatePath, {
    encoding: 'utf-8',
  });
  const componentsName = await readdir(componentsPath);
  componentsName.forEach((fileName) => {
    const filePath = path.join(componentsPath, fileName);
    const fileExtname = path.extname(filePath);
    if (fileExtname === '.html') {
      readFile(path.join(componentsPath, fileName), { encoding: 'utf-8' }).then(
        (data) => {
          const componentName = fileName.split('.')[0];
          htmlTemplate = htmlTemplate.replace(`{{${componentName}}}`, data);
          writeFile(path.join(projectDist, 'index.html'), htmlTemplate);
        },
      );
    }
  });
}

async function buildCss() {
  const stylePath = path.join(projectDist, 'style.css');
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
}

async function copy() {
  const srcDir = path.join(__dirname, 'assets');
  const copyDir = path.join(__dirname, 'project-dist', 'assets');
  await mkdir(copyDir, { recursive: true }, (error) => {
    console.log(error.message);
  });
  async function transfer(arrPath) {
    const currentDir = path.join(srcDir, ...arrPath);
    const trunsferDir = path.join(copyDir, ...arrPath);
    const files = await readdir(currentDir, { withFileTypes: true });
    files.forEach((file) => {
      if (!file.isFile()) {
        mkdir(
          path.join(trunsferDir, file.name),
          { recursive: true },
          (error) => {
            console.log(error.message);
          },
        ).then(() => {
          transfer([...arrPath, file.name]);
        });
      } else {
        copyFile(
          path.join(currentDir, file.name),
          path.join(trunsferDir, file.name),
        );
      }
    });
  }
  transfer([]);
}

buildHtml();
buildCss();
copy();
