

import React, {createContext, useContext, useEffect, useState} from 'react';
import { RepoCommit } from "../types";
import axios from "../axios_config";

interface DataContextType {
    commitData: RepoCommit[]; 
    loading: boolean; 
    error: string | null; 
    refreshData: () => void; 
}

const DataContext = createContext<DataContextType | undefined>(undefined);


export const RepoCommitDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [commitData, setCommitData] = useState<RepoCommit[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    const fetchCommits = async () => {
      try { 
        const response = await axios.get("/api/repo-commits");
        const commit_data: RepoCommit[] = response.data; 
        const sorted_commit_data = commit_data.sort((a, b) => b.commits - a.commits); 
        const top_5_committers = sorted_commit_data.slice(0, 5);

        setCommitData(top_5_committers);

      } catch (e: any) { 
        setError(e);
        console.error(e);

      } finally { 
        setLoading(false);
      }
    }

    useEffect(() => {
        fetchCommits(); 
        const interval = setInterval(fetchCommits, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
    <DataContext.Provider value={{ commitData, loading, error, refreshData: fetchCommits}}>
      {children}
    </DataContext.Provider>
    )
}

export const useRepoCommitData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useRepoCommitData must be used within a DataProvider");
    }
    return context;
}
