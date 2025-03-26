import React from 'react';
import './css/commit_chart.css';
import BarChart from './bar_chart';
import { useData } from '../data_provider';

const LOCBarChart: React.FC = () => {
  const { userLOCData } = useData();

  const sortedLOCData = userLOCData.sort((a, b) => b.lines_of_code - a.lines_of_code);
  const top5LOC = sortedLOCData.slice(0, 5);

  return <BarChart color='#BE2548' xaxisKey='username' yaxisKey='lines_of_code' data={top5LOC} />;
};

export default LOCBarChart;
