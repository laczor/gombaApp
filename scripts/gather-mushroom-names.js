import fs from 'fs';
import path from 'path';

// Function to gather the names of files in the current folder
function gatherFileNames(currentPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(currentPath, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
}

// Function to parse filenames and generate the mushrooms.js file
export async function generateMushroomsFile(currentPath) {
  try {
    const names = await gatherFileNames(currentPath);
    const mushroomsContent = `export const mushrooms = ${JSON.stringify(names)};\n`;

    const mushroomsFilePath = path.join(currentPath, '..', 'mushrooms.js');
    fs.writeFile(mushroomsFilePath, mushroomsContent, err => {
      if (err) {
        console.error('Error writing mushrooms.js file:', err);
      } else {
        console.log('mushrooms.js file has been created successfully.');
      }
    });
  } catch (error) {
    console.error('Error gathering file names:', error);
  }
}