import React from 'react';
import UserCommitBarChart from '../components/user_commit_chart';
import SwapChartButton from '../components/swap_chart_button';
import { CHART_OPTIONS } from '../data/chart_options';
import { useData } from '../data_provider';
import FetchStatusBar from '../components/fetch_status';
import './css/page.css';

const UserCommitPage: React.FC = () => {
  const {
    userCommitLoading: loading,
    userCommitError: error,
    userCommitLastRefresh: lastRefresh,
    userCommitRefresh: refresh,
  } = useData();

  return (
    <div className='App'>
      <FetchStatusBar loading={loading} error={error} lastRefresh={lastRefresh} refresh={refresh} />
      <SwapChartButton menuOptions={CHART_OPTIONS} label='Menu' />
      <div className='container'>
        <h1>Top 5 GitHub Committers</h1>
      </div>
      <UserCommitBarChart />
    </div>
  );
};

export default UserCommitPage;
