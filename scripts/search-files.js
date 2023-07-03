import fs from 'fs';
import path from 'path';

export function searchFiles(directory, skipFolders = []) {
    const filesToHash = [];
    const filesToCopy = [];

    function searchRecursively(currentDir) {
      const files = fs.readdirSync(currentDir);

      files.forEach((file) => {
        const filePath = path.join(currentDir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
          if (!skipFolders.includes(file)) {
            searchRecursively(filePath);
          }
        } else {
          if(['.js', '.css'].includes(path.extname(filePath))) filesToHash.push(filePath);
          if(['.png'].includes(path.extname(filePath))) filesToCopy.push(filePath);
        }
      });
    }

    searchRecursively(directory);

    return {filesToHash, filesToCopy};
  }