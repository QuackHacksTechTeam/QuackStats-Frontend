import React from 'react';
import './css/commit_chart.css';
import CommitBarChart from './bar_chart';
import { useData } from '../data_provider';

const UserCommitBarChart: React.FC = () => {
  const { userCommitData } = useData();

  const sortedCommitData = userCommitData.sort((a, b) => b.commits - a.commits);
  const top5Commiters = sortedCommitData.slice(0, 5);

  return (
    <CommitBarChart color='#FFEB3B' xaxisKey='username' yaxisKey='commits' data={top5Commiters} />
  );
};

export default UserCommitBarChart;
