
import React from 'react';
import './css/commit_chart.css'
import BarChart from './bar_chart';
import { useData } from "../data_provider";

const LOCBarChart: React.FC = () => {
  
  const { userLOCData } = useData(); 

  return (
      <BarChart 
        color="#FFEB3B" 
        xaxisKey="username" 
        yaxisKey="lines_of_code" 
        data={userLOCData} 
      /> 
  );
};

export default LOCBarChart;

