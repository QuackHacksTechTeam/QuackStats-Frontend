
import CommitBarChart from './bar_chart';
import { useRepoCommitData } from "../context/repo_commit";
import './css/commit_chart.css';

const RepoCommitBarChart: React.FC = () => {
  
    const { commitData, loading, error, refreshData } = useRepoCommitData(); 

    if (loading) { 
        return (
            <div className="spinner-container">
            <div className="spinner"></div>
            </div>
        );
    }

    if (error) { 
        return <div>{error}</div>
    }

  return (
      <CommitBarChart 
        color="#00838F" 
        xaxisKey="repo_name" 
        yaxisKey="commits" 
        data={commitData} 
      /> 
  );
};

export default RepoCommitBarChart;

