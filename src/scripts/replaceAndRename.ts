import * as fs from 'fs';
import * as path from 'path';

function toKebabCase(str: string) {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
}

function toPascalCase(str: string) {
  return str.replace(/(^\w|-\w)/g, (s) => s.replace('-', '').toUpperCase());
}

function toCamelCase(str: string) {
  return str.replace(/(-\w)/g, (s) => s.replace('-', '').toUpperCase());
}

function toSnakeCase(str: string) {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1_$2').toLowerCase();
}

async function replaceInFile(
  filePath: string,
  oldWord: string,
  newWord: string,
) {
  const data = fs.readFileSync(filePath, 'utf8');

  let result = `${data}`;

  if (oldWord.includes('-')) {
    result = result.replace(new RegExp(oldWord, 'g'), toKebabCase(newWord));
  } else if (oldWord.includes('_')) {
    result = result.replace(new RegExp(oldWord, 'g'), toSnakeCase(newWord));
  } else if (oldWord.charAt(0).toUpperCase() === oldWord.charAt(0)) {
    result = result.replace(new RegExp(oldWord, 'g'), toPascalCase(newWord));
  } else {
    result = result.replace(new RegExp(oldWord, 'g'), toCamelCase(newWord));
  }

  fs.writeFileSync(filePath, result, 'utf8');
}

function renameFile(filePath: string, oldWord: string, newWord: string) {
  const dir = path.dirname(filePath);
  const ext = path.extname(filePath);
  const base = path.basename(filePath, ext);
  if (base.includes(oldWord)) {
    const newBase = base.replace(oldWord, toKebabCase(newWord));
    const newPath = path.join(dir, newBase + ext);
    fs.renameSync(filePath, newPath);
    return newPath;
  }
  return filePath;
}

async function replaceAndRenameInDir(
  dirPath: string,
  oldWord: string,
  newWord: string,
) {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      await replaceAndRenameInDir(filePath, oldWord, newWord);
    } else if (stats.isFile()) {
      await replaceInFile(filePath, oldWord, newWord);
      renameFile(filePath, oldWord, newWord);
    }
  }
}

// Use:
const args = process.argv.slice(2);
if (args.length !== 3) {
  console.log('Usage: replaceAndRenameInDir <dirPath> <oldWord> <newWord>');
  process.exit(1);
}

const [dirPath, oldWord, newWord] = args;
(async () => await replaceAndRenameInDir(dirPath, oldWord, newWord))();

// Example - from the root of the project:
// pnpm script:replace-and-rename-in-dir src/api/components layout component
// pnpm script:replace-and-rename-in-dir src/api/components Layout Component
