import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RepoCommitPage from "./pages/repo_commit_page";
import UserCommitPage from "./pages/user_commit_page";
import UserLOCPage from "./pages/user_loc_page";


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserCommitPage />} />
        <Route path="/repo-commits" element={<RepoCommitPage />} />
        <Route path="/user-loc" element={<UserLOCPage />} />
      </Routes>
    </Router>
  );
}

export default App;

