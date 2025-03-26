
import React from 'react';
import RepoCommitBarChart from '../components/repo_commit_chart';
import SwapChartButton from '../components/swap_chart_button';
import { CHART_OPTIONS } from '../data/chart_options';
import "./css/page.css";


const RepoCommitPage: React.FC = () => {
  return (
    <div className="App">
      <SwapChartButton menuOptions={CHART_OPTIONS} label="Swap Chart"/> 
      <div className="container"> 
        <h1>Top 5 Repos with Most Commits</h1>
      </div> 
      <RepoCommitBarChart/>
    </div>
  );
};

export default RepoCommitPage;

