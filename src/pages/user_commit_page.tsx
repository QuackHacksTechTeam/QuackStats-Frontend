
import React from 'react';
import UserCommitBarChart from '../components/user_commit_chart';
import SwapChartButton from '../components/swap_chart_button';
import { CHART_OPTIONS } from '../data/chart_options';
import "./css/page.css";


const UserCommitPage: React.FC = () => {
  return (
    <div className="App">
      <SwapChartButton menuOptions={CHART_OPTIONS} label="Swap Chart"/> 
      <div className="container"> 
        <h1>Top 5 GitHub Committers</h1>
      </div> 
      <UserCommitBarChart/>
    </div>
  );
};

export default UserCommitPage;

