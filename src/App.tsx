import React from 'react';
import BarChartComponent from './commit_chart';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>GitHub Commits</h1>
      <BarChartComponent />
    </div>
  );
};

export default App;

