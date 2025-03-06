import React, {useEffect, useState } from 'react';
import { UserCommit } from '../types.js'
import axios from '../axios_config.ts'
import './css/commit_chart.css'
import CommitBarChart from './bar_chart';


const UserCommitBarChart: React.FC = () => {
  
  const [commitData, setCommitData] = useState<UserCommit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommits = async () => {
      try { 
        const response = await axios.get("/api/user-commits");
        const commit_data: UserCommit[] = response.data; 
        const sorted_commit_data = commit_data.sort((a, b) => b.commits - a.commits); 
        const top_5_committers = sorted_commit_data.slice(0, 5);

        setCommitData(top_5_committers);

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
      <CommitBarChart 
        color="#FFEB3B" 
        xaxisKey="username" 
        yaxisKey="commits" 
        data={commitData} 
      /> 
  );
};

export default UserCommitBarChart;

