
import CommitBarChart from './bar_chart';
import { useData } from "../data_provider";
import './css/commit_chart.css';

const RepoCommitBarChart: React.FC = () => {
  
    const { repoCommitData } = useData(); 

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

