
import React, { useState } from "react";
import "./css/urls_in_use.css";


const UrlsInUse: React.FC = () => {
    const [urls, setUrls] = useState<string[]>(["test", "test", "test", "test", "test", "test", "test", "test"]);

    return (
        <div id="urls-in-use-container"> 
            <h2>GitHub Repos In Use</h2> 
            <ul> 
                {urls.map((url, index) => (
                    <li key={index}>{url}</li>
                ))}
            </ul> 
        </div> 
    );
}

export default UrlsInUse; 