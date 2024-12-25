import express from 'express';
import type { Request, Response } from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3001;
const ORIGIN_SERVER = 'http://localhost:3000';

const cache: { [key: string]: string } = {};

app.get('/:file', async (req: Request, res: Response) => {
  const file = req.params.file;
  
  if (cache[file]) {
    console.log(`Serving ${file} from edge cache`);
    return res.send(cache[file]);
  }

  try {
    const response = await fetch(`${ORIGIN_SERVER}/${file}`);
    const content = await response.text();
    
    cache[file] = content;
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

