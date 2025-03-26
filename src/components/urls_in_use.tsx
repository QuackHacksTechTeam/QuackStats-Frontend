import React, { useState, useEffect } from 'react';
import axios from '../axios_config';
import './css/urls_in_use.css';
import '../shared_css/spinner.css';

const UrlsInUse: React.FC = () => {
  const [urls, setUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getReposInUse = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/repos-in-use');
      setUrls(response.data);
    } catch (e) {
      setError('Error loading response urls');
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReposInUse();
  }, []);

  if (loading)
    return (
      <div className='spinner-container'>
        <div className='spinner' />
      </div>
    );

  if (error) return <p>{error}</p>;

  return (
    <div id='urls-in-use-container'>
      <h2>GitHub Repos In Use</h2>
      <ul>
        {urls.map((url, index) => (
          <li key={index}>{url}</li>
        ))}
      </ul>
    </div>
  );
};

export default UrlsInUse;
