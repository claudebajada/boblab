import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, 'public');
const dataDir = path.join(__dirname, 'data');

app.use(express.json());
app.use(express.static(publicDir));

const loadJson = async (fileName) => {
  const filePath = path.join(dataDir, fileName);
  const raw = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(raw);
};

app.get('/api/people', async (_req, res) => {
  try {
    const people = await loadJson('people.json');
    res.json({ people });
  } catch (error) {
    res.status(500).json({ error: 'Unable to load people data.' });
  }
});

app.get('/api/updates', async (_req, res) => {
  try {
    const updates = await loadJson('updates.json');
    res.json({ updates });
  } catch (error) {
    res.status(500).json({ error: 'Unable to load updates data.' });
  }
});

app.get('/api/ducks', async (_req, res) => {
  try {
    const ducks = await loadJson('ducks.json');
    res.json({ ducks });
  } catch (error) {
    res.status(500).json({ error: 'Unable to load duck data.' });
  }
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`BobLab site running on http://localhost:${port}`);
});
