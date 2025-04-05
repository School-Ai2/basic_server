const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let topic = 'No topic set yet';

app.post('/set-topic', (req, res) => {
  const { newTopic } = req.body;
  if (!newTopic) {
    return res.status(400).json({ message: 'newTopic is required' });
  }
  topic = newTopic;
  res.json({ message: `Topic set to: ${topic}` });
});

app.get('/get-topic', (req, res) => {
  res.json({ topic });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
