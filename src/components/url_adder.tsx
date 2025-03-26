import React, { useState } from 'react';
import './css/url_adder.css';

const UrlAdder: React.FC = () => {
  const [currentUrl, setCurrentUrl] = useState('');
  const [urls, setUrls] = useState<string[]>([]);

  const handleAddUrl = (event: React.MouseEvent) => {
    event.preventDefault();
    if (!currentUrl) return;
    setUrls([...urls, currentUrl]);
    setCurrentUrl('');
  };

  const handleClear = (event: React.MouseEvent) => {
    event.preventDefault();
    setUrls([]);
  };

  const handleSubmitUrls = async (event: React.MouseEvent) => {
    event.preventDefault();
    setCurrentUrl('');
    setUrls([]);
  };

  return (
    <div id='add-url-container'>
      <form>
        <input
          type='text'
          value={currentUrl}
          onChange={(e) => setCurrentUrl(e.target.value)}
          placeholder='Enter GitHub Repo URL'
        />
        <button onClick={handleAddUrl}>Add Repo</button>
        <button onClick={handleClear}>Clear</button>
      </form>
      <div>
        <h3>Added Repos</h3>
        <ul>
          {urls.map((url, index) => (
            <li key={index}>{url}</li>
          ))}
        </ul>
        <button onClick={handleSubmitUrls}>Submit</button>
      </div>
    </div>
  );
};

export default UrlAdder;
