import express from 'express';
import multer from 'multer';
import speech from '@google-cloud/speech';

const client = new speech.SpeechClient();
const router = express.Router();

// Middleware to handle file uploads
const upload = multer({ storage: multer.memoryStorage() });

router.post('/api/speech-to-text', upload.single('file'), async (req, res) => {
  const audioBytes = req.file.buffer.toString('base64');

  const request = {
    audio: { content: audioBytes },
    config: {
      encoding: 'LINEAR16', // Adjust this based on your audio file format
      sampleRateHertz: 16000,
      languageCode: 'en-US',
    },
  };

  try {
    const [response] = await client.recognize(request);
    const transcription = response.results.map(result => result.alternatives[0].transcript).join('\n');
    res.json({ transcription });
  } catch (err) {
    console.error('Error transcribing audio:', err);
    res.status(500).send('Error transcribing audio');
  }
});

export default router;
