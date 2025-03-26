import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RepoCommitPage from "./pages/repo_commit_page";
import UserCommitPage from "./pages/user_commit_page";
import UserLOCPage from "./pages/user_loc_page";
import HomePage from "./pages/home.tsx";
import { DataProvider } from "./data_provider.tsx";

const App: React.FC = () => {
  return (
    <DataProvider> 
        <Router>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/user-commits" element={<UserCommitPage />} />
            <Route path="/repo-commits" element={<RepoCommitPage />} />
            <Route path="/user-loc" element={<UserLOCPage />} />
        </Routes>
        </Router>
    </DataProvider> 
  );
}

export default App;

