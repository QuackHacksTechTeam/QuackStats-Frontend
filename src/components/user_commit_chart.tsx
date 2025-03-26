import React from 'react';
import './css/commit_chart.css'
import CommitBarChart from './bar_chart';
import { useData } from "../data_provider";

const UserCommitBarChart: React.FC = () => {

    const { userCommitData } = useData(); 

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

