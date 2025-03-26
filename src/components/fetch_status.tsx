
import React from "react";
import "../shared_css/spinner.css";

interface FetchStatusProps {
    loading: boolean; 
    error: string | null;
    lastRefresh: string;
}

const FetchStatusBar: React.FC<FetchStatusProps> = ({ loading, error, lastRefresh }) => {
    return (
        <div> 
            {loading ? (
                <div className="spinner-container">
                    <div className="spinner"></div>
                </div>
            ) : error ? (
                <p>{error}</p> 
            ) : (
                <p>Last refresh: {lastRefresh}</p>
            )}
        </div> 
    );
}

export default FetchStatusBar; 