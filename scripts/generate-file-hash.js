import fs from 'fs';

export function generateFileHash(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  let hash = 1;
  const MOD_ADLER = 65521;

  for (let i = 0; i < fileContent.length; i++) {
    hash = (hash * 31 + fileContent.charCodeAt(i)) % MOD_ADLER;
  }

  return hash.toString(16);
}