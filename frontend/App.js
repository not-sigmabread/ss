import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [safeLink, setSafeLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/process-video', { url: videoUrl });
      setSafeLink(response.data.safeLink);
    } catch (error) {
      console.error('Error processing video:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>SafeShare</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="url"
            placeholder="Enter video URL"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            required
          />
          <button type="submit">Generate Safe Link</button>
        </form>
        {safeLink && (
          <div>
            <h2>Your Safe Link:</h2>
            <a href={safeLink} target="_blank" rel="noopener noreferrer">
              {safeLink}
            </a>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
