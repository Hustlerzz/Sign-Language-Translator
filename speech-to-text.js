const speech = require('@google-cloud/speech');
const fs = require('fs');

const client = new speech.SpeechClient({
  keyFilename: 'path/to/your-service-account-key.json',
});

app.post('/speech-to-text', async (req, res) => {
  const { audioFilePath } = req.body;

  if (!audioFilePath) {
    return res.status(400).json({ error: 'Audio file path is required' });
  }

  const file = fs.readFileSync(audioFilePath);
  const audioBytes = file.toString('base64');

  const audio = {
    content: audioBytes,
  };

  const config = {
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    languageCode: 'en-US',
  };

  const request = {
    audio: audio,
    config: config,
  };

  try {
    const [response] = await client.recognize(request);
    const transcription = response.results
      .map((result) => result.alternatives[0].transcript)
      .join('\n');
    res.json({ text: transcription });
  } catch (err) {
    res.status(500).json({ error: 'Failed to transcribe audio' });
  }
});