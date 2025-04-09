const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const DATA_DIR = path.join(__dirname, 'documents');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

app.use(express.text());

app.post('/api/documents/:id/content', (req, res) => {
  const id = req.params.id;
  const filePath = path.join(DATA_DIR, `${id}.txt`);
  const content = req.body;

  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.error('Error saving content:', err);
      return res.status(500).json({ message: 'Failed to save content' });
    }
    res.json({ message: `Content saved for document: ${id}` });
  });
});

app.get('/api/documents/:id/content', (req, res) => {
  const id = req.params.id;
  const filePath = path.join(DATA_DIR, `${id}.txt`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: 'Document not found' });
  }

  res.sendFile(filePath);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});