import React, {useEffect, useState } from 'react';
import { UserCommit, CommitResponse } from './types.js'
import axios from './axios_config.ts'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';


const BarChartComponent: React.FC = () => {
  
  const [commitData, setCommitData] = useState<UserCommit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommits = async () => {
      try { 
        const userCommits: UserCommit[] = []; 
        let response: any = await axios.get("/commits");
        response = response.data; 
        
        response.forEach((commitResponse: any) => {
          const data = Object.entries(commitResponse.user_commits).map(([user, commitNum]) => ({
            username: user,
            commits: commitNum as number
          }));
          userCommits.push(...data);
        });
        console.log(userCommits);
        setCommitData(userCommits);
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
    return <div>Loading...</div>
  }

  if (error) { 
    return <div>{error}</div>
  }

  return (
    <ResponsiveContainer width={800} height={800}>
      <BarChart data={commitData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="username" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="commits" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;

