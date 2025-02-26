const gtts = require('gtts');

app.post('/text-to-speech', (req, res) => {
  const { text, language = 'en' } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  const gttsInstance = new gtts(text, language);
  const filePath = `audio/${Date.now()}.mp3`;

  gttsInstance.save(filePath, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to generate audio' });
    }
    res.download(filePath); // Send the audio file as a response
  });
});