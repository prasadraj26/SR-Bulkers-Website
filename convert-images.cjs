const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'assets', 'images');

fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
    const inputPath = path.join(dir, file);
    const outputPath = path.join(dir, file.replace(/\.(png|jpg|jpeg)$/, '.webp'));
    
    sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath)
      .then(() => {
        console.log(`Converted ${file} to WebP`);
      })
      .catch(err => {
        console.error(`Error converting ${file}:`, err);
      });
  }
});
