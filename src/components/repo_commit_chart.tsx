
import React, {useEffect, useState } from 'react';
import { RepoCommit } from '../types.js';
import axios from '../axios_config.ts';
import CommitBarChart from './bar_chart';
import './css/commit_chart.css';


const RepoCommitBarChart: React.FC = () => {
  
  const [commitData, setCommitData] = useState<RepoCommit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommits = async () => {
      try { 
        const response = await axios.get("/api/repo-commits");
        const commit_data: RepoCommit[] = response.data; 
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
        color="#00838F" 
        xaxisKey="repo_name" 
        yaxisKey="commits" 
        data={commitData} 
      /> 
  );
};

export default RepoCommitBarChart;

