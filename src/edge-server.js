const express = require('express');
const fetch = require('node-fetch');
const LRUCache = require('./lru-cache');

const app = express();
const PORT = process.env.PORT || 3001;
const ORIGIN_SERVER = 'http://localhost:3000';

const cache = new LRUCache(1);

app.get('/:file', async (req, res) => {
  const file = req.params.file;
  
  const cachedContent = cache.get(file);
  if (cachedContent) {
    console.log(`Serving ${file} from edge cache`);
    return res.send(cachedContent);
  }

  try {
    const response = await fetch(`${ORIGIN_SERVER}/${file}`);
    const content = await response.text();
    
    cache.put(file, content);
    console.log(`Caching ${file} on edge server`);
    res.send(content);
  } catch (error) {
    console.error(`Error fetching ${file} from origin:`, error);
    res.status(500).send('Error fetching content');
  }
});

app.listen(PORT, () => {
  console.log(`Edge server running on http://localhost:${PORT}`);
});

