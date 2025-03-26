import CommitBarChart from './bar_chart';
import { useData } from '../data_provider';
import './css/commit_chart.css';

const RepoCommitBarChart: React.FC = () => {
  const { repoCommitData } = useData();

  const sortedCommitData = repoCommitData.sort((a, b) => b.commits - a.commits);
  const top5Commiters = sortedCommitData.slice(0, 5);

  return (
    <CommitBarChart color='#00838F' xaxisKey='repo_name' yaxisKey='commits' data={top5Commiters} />
  );
};

export default RepoCommitBarChart;
