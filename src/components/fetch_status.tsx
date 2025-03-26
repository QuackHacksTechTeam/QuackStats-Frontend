import React from 'react';
import '../shared_css/spinner.css';
import './css/fetch_status.css';

interface FetchStatusProps {
  loading: boolean;
  error: string | null;
  lastRefresh: string;
  refresh: () => void;
}

const FetchStatusBar: React.FC<FetchStatusProps> = ({ loading, error, lastRefresh, refresh }) => {
  return (
    <div className='fetch-status'>
      {loading ? (
        <div className='spinner-container'>
          <p style={{ display: 'inline', marginRight: '10px' }}>Updating</p>
          <div className='spinner' style={{ display: 'inline' }}></div>
        </div>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <p>Last Refresh: {lastRefresh}</p>
      )}
      <button onClick={refresh}>Refresh</button>
    </div>
  );
};

export default FetchStatusBar;
