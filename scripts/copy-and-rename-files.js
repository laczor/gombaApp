import fs from 'fs';
import path from 'path';
import { copyFileSync } from 'fs';

export function copyAndRenameFiles({ files, outDir, rootPath}) {
  const distDir = path.join(rootPath, outDir);

  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
  } else {
    // Clear existing files in 'dist' directory
    fs.readdirSync(distDir).forEach((file) => {
      const filePath = path.join(distDir, file);
      fs.unlinkSync(filePath);
    });
  }

  // Copy and rename files
  files.forEach((filePair) => {
    const [ filePath, targetPath ] = filePair;

    const targetDir = path.dirname(targetPath);

    // Check if target directory exists
    if (!fs.existsSync(targetDir)) {
      // Create target directory if it doesn't exist
      fs.mkdirSync(targetDir, { recursive: true });
    }
    copyFileSync(filePath, targetPath);
  });
}