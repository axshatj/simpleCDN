const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = 8080;

const EDGE_SERVERS = [
  'http://localhost:3001',
  'http://localhost:3002',
];

let currentServerIndex = 0;

app.get('/:file', async (req, res) => {
  const file = req.params.file;
  const server = EDGE_SERVERS[currentServerIndex];
  
  currentServerIndex = (currentServerIndex + 1) % EDGE_SERVERS.length;

  try {
    const response = await fetch(`${server}/${file}`);
    const content = await response.text();
    res.send(content);
  } catch (error) {
    console.error(`Error fetching ${file} from edge server:`, error);
    res.status(500).send('Error fetching content');
  }
});

app.listen(PORT, () => {
  console.log(`Load balancer running on http://localhost:${PORT}`);
});

