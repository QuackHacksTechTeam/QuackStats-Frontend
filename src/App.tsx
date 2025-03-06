import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RepoCommitPage from "./pages/repo_commit_page";
import UserCommitPage from "./pages/user_commit_page";


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserCommitPage />} />
        <Route path="/repo-commits" element={<RepoCommitPage />} />
      </Routes>
    </Router>
  );
}

export default App;

