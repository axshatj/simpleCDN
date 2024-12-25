import express from 'express';
import type { Request, Response } from 'express';

const app = express();
const PORT = 3000;

const content: { [key: string]: string } = {
  '/image1.jpg': 'This is image 1 content',
  '/image2.jpg': 'This is image 2 content',
  '/text1.txt': 'This is text file 1 content',
};

app.get('/:file', (req: Request, res: Response) => {
  const file = req.params.file;
  if (content[`/${file}`]) {
    console.log(`Serving ${file} from origin server`);
    res.send(content[`/${file}`]);
  } else {
    res.status(404).send('File not found');
  }
});

app.listen(PORT, () => {
  console.log(`Origin server running on http://localhost:${PORT}`);
});

