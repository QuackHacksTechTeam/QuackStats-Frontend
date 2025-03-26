import React from 'react';
import RepoCommitBarChart from '../components/repo_commit_chart';
import SwapChartButton from '../components/swap_chart_button';
import { useData } from '../data_provider';
import { CHART_OPTIONS } from '../data/chart_options';
import FetchStatusBar from '../components/fetch_status';
import './css/page.css';

const RepoCommitPage: React.FC = () => {
  const {
    repoCommitLoading: loading,
    repoCommitError: error,
    repoCommitLastRefresh: lastRefresh,
    repoCommitRefresh: refresh,
  } = useData();

  return (
    <div className='App'>
      <FetchStatusBar loading={loading} error={error} lastRefresh={lastRefresh} refresh={refresh} />
      <SwapChartButton menuOptions={CHART_OPTIONS} label='Menu' />
      <div className='container'>
        <h1>Top 5 Repos with Most Commits</h1>
      </div>
      <RepoCommitBarChart />
    </div>
  );
};

export default RepoCommitPage;
