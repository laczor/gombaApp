import fs from 'fs';

export function replaceValuesInFile({ filePath, replacements, outputPath }) {
    // Read the index.html file
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading the index.html file:', err);
        return;
      }

      // Perform replacements in the HTML content
      let modifiedHtml = data;
      replacements.forEach(([name, replaceWith]) => {
        const regex = new RegExp(name, 'g');
        modifiedHtml = modifiedHtml.replace(regex, replaceWith);
      });

      // Save the modified HTML to the desired path
      fs.writeFile(outputPath, modifiedHtml, 'utf8', (err) => {
        if (err) {
          console.error('Error writing the modified HTML to the output file:', err);
          return;
        }
        console.log('Modified HTML saved to:', outputPath);
      });
    });
  }