const express = require('express');
const fetch = require('node-fetch');
const ConsistentHash = require('./consistent-hash');

const app = express();
const PORT = 8080;

const EDGE_SERVERS = [
  'http://localhost:3001',
  'http://localhost:3002',
];

const consistentHash = new ConsistentHash(EDGE_SERVERS);

app.get('/:file', async (req, res) => {
  const file = req.params.file;
  const server = consistentHash.getNode(file);

  if (!server) {
    return res.status(500).send('No available edge servers');
  }

  try {
    console.log(`Routing request for ${file} to ${server}`);
    const response = await fetch(`${server}/${file}`);
    const content = await response.text();
    res.send(content);
  } catch (error) {
    console.error(`Error fetching ${file} from edge server ${server}:`, error);
    res.status(500).send('Error fetching content');
  }
});

// API to add a new edge server
app.post('/add-server', (req, res) => {
  const { server } = req.body;
  if (!server) {
    return res.status(400).send('Server URL is required');
  }
  consistentHash.addNode(server);
  res.send(`Added server: ${server}`);
});

// API to remove an edge server
app.post('/remove-server', (req, res) => {
  const { server } = req.body;
  if (!server) {
    return res.status(400).send('Server URL is required');
  }
  consistentHash.removeNode(server);
  res.send(`Removed server: ${server}`);
});

app.listen(PORT, () => {
  console.log(`Load balancer running on http://localhost:${PORT}`);
});

