import React from 'react';
import './css/commit_chart.css'
import CommitBarChart from './bar_chart';
import { useData } from "../data_provider";

const UserCommitBarChart: React.FC = () => {

    const { userCommitData, userCommitLoading: loading, userCommitError: error} = useData(); 

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
        data={userCommitData} 
      /> 
  );
};

export default UserCommitBarChart;

