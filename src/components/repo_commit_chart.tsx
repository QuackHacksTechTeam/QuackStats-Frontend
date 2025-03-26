
import CommitBarChart from './bar_chart';
import { useData } from "../data_provider";
import './css/commit_chart.css';

const RepoCommitBarChart: React.FC = () => {
  
    const { repoCommitData, repoCommitLoading: loading, repoCommitError: error} = useData(); 

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
        data={repoCommitData} 
      /> 
  );
};

export default RepoCommitBarChart;

