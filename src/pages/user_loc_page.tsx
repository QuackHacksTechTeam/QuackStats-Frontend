

import React from 'react';
import UserLOCBarChart from '../components/loc_chart';
import SwapChartButton from '../components/swap_chart_button';
import { CHART_OPTIONS } from '../data/chart_options';
import FetchStatusBar from "../components/fetch_status";
import { useData } from "../data_provider";
import "./css/page.css";


const UserCommitPage: React.FC = () => {
  const { userLOCLoading: loading, userLOCError: error, lastRefresh} = useData(); 

  return (
    <div className="App">
      <FetchStatusBar loading={loading} error={error} lastRefresh={lastRefresh} /> 
      <SwapChartButton menuOptions={CHART_OPTIONS} label="Swap Chart"/> 
      <div className="container"> 
        <h1>Top 5 Users with Most Lines of Code</h1>
      </div> 
      <UserLOCBarChart/>
    </div>
  );
};

export default UserCommitPage;

