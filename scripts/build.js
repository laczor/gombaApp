import { searchFiles } from './search-files.js';
import { generateFileHash } from './generate-file-hash.js';
import { copyAndRenameFiles } from './copy-and-rename-files.js';
import { replaceValuesInFile } from './replace-value-in-file.js';

import path from 'path';

const OUT_DIR = 'public'
const currentPath = process.cwd();

const {filesToHash, filesToCopy} = searchFiles(currentPath, ['scripts', '.git', OUT_DIR]);

function hashedName(fileName) {
const [name, ...rest] = fileName.split('.');
return `${name}-${generateFileHash(fileName)}-.${rest.join()}`

}
const hashedFileNames = filesToHash.map((fileName) => [fileName, hashedName(fileName)]);
const buildDirectoryHashedFileNames = hashedFileNames.map(([_, fileName]) => [_, fileName.replace(currentPath, path.join(currentPath, OUT_DIR))]);
const buildDirectoryFileNames = filesToCopy.map((fileName) => [ fileName , fileName.replace(currentPath, path.join(currentPath, OUT_DIR))]);
copyAndRenameFiles({ files: [...buildDirectoryFileNames, ...buildDirectoryHashedFileNames], outDir: OUT_DIR, rootPath:currentPath })


const replacements = buildDirectoryHashedFileNames.map(([a,b]) => [path.basename(a), path.basename(b)]);
replaceValuesInFile({ filePath: path.join(currentPath, 'index.html'), replacements, outputPath: path.join(currentPath, OUT_DIR, 'index.html' ) })