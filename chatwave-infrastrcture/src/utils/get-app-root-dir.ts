import fs from 'fs';
import path from 'path';

export function getAppRootDir(): string {
  let currentDir = __dirname;
  while(!fs.existsSync(path.join(currentDir, 'package.json'))) {
    currentDir = path.join(currentDir, '..');
  }
  
  return currentDir;
}