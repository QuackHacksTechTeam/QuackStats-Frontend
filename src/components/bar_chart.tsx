import React from 'react';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface BarChartProps {
  data: any[];
  xaxisKey: string;
  yaxisKey: string;
  color: string;
}

const QuackBarChart: React.FC<BarChartProps> = ({ data, xaxisKey, yaxisKey, color }) => {
  return (
    <ResponsiveContainer width={1200} height={800}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray='3 3' stroke='#ffffff' />
        <XAxis dataKey={xaxisKey} stroke='#ffffff' tick={{ fill: '#ffffff' }} />
        <YAxis
          stroke='#ffffff' // White axis line
          tick={{ fill: '#ffffff' }} // White tick text
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#333', // Dark background for tooltip
            color: '#ffffff', // White text
            border: '1px solid #ffffff', // White border
          }}
        />
        <Legend
          wrapperStyle={{
            color: '#ffffff', // White text
          }}
        />
        <Bar dataKey={yaxisKey} fill={color} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default QuackBarChart;
