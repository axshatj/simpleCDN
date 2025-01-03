const fetch = require('node-fetch');

const CDN_URL = 'http://localhost:8080';
const FILES = ['image1.jpg', 'image2.jpg','image1.jpg', 'image1.jpg', 'text2.txt','image2.jpg'];

async function testCDN() {
  for (const file of FILES) {
    try {
      console.log(`Requesting ${file}...`);
      const response = await fetch(`${CDN_URL}/${file}`);
      const content = await response.text();
      console.log(`Received content for ${file}: ${content}\n`);
    } catch (error) {
      console.error(`Error fetching ${file}:`, error);
    }
  }
}

testCDN();

