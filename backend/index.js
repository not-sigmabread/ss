const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.post('/api/process-video', async (req, res) => {
  const { url } = req.body;
  try {
    // Fetch video metadata
    const metadataResponse = await axios.get(`https://api.video.com/metadata?url=${url}`);
    const metadata = metadataResponse.data;

    // Process video to remove ads (this is a placeholder, actual implementation needed)
    const processedVideoUrl = `https://safeshare.example.com/process?url=${url}`;

    // Generate safe shareable link
    const safeLink = `https://safeshare.example.com/watch?v=${processedVideoUrl}`;

    res.json({ safeLink });
  } catch (error) {
    console.error('Error processing video:', error);
    res.status(500).json({ error: 'Failed to process video' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
