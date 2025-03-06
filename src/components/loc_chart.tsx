
import React, {useEffect, useState } from 'react';
import { UserLOC } from '../types.js'
import axios from '../axios_config.ts'
import './css/commit_chart.css'
import LOCBarChart from './bar_chart';


const UserCommitBarChart: React.FC = () => {
  
  const [locData, setLocData] = useState<UserLOC[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommits = async () => {
      try { 
        const response = await axios.get("/api/user-loc");
        const loc_data : UserLOC[] = response.data; 
        const sorted_loc_data = loc_data.sort((a, b) => b.lines_of_code - a.lines_of_code); 
        const top_5_loc = sorted_loc_data.slice(0, 5);
        setLocData(top_5_loc);

      } catch (e: any) { 
        setError(e);
        console.error(e);

      } finally { 
        setLoading(false);
      }
    }
    fetchCommits(); 
  }, []);


  if (loading) { 
    return (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
     );
  }

  if (error) { 
    return <div>{error}</div>
  }

  return (
      <LOCBarChart 
        color="#FFEB3B" 
        xaxisKey="username" 
        yaxisKey="lines_of_code" 
        data={locData} 
      /> 
  );
};

export default UserCommitBarChart;

