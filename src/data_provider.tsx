

import React, {createContext, useContext, useEffect, useState} from 'react';
import axios from "./axios_config";

import { RepoCommit, UserCommit, UserLOC } from "./types";

/*
    Global state of data fetches to the server 

    The fetches happen at set intervals, allowing the compnents to be updated  
    no matter where you are on the page 

*/

interface DataContextType {
    repoCommitData: RepoCommit[]; 
    repoCommitLoading: boolean; 
    repoCommitError: string | null; 

    userCommitData: UserCommit[]; 
    userCommitLoading: boolean; 
    userCommitError: string | null; 

    userLOCData: UserLOC[]; 
    userLOCLoading: boolean; 
    userLOCError: string | null; 

    lastRefresh: string; 

    refreshData: () => void; 
}

const getDate = () => {
    const currentDate = new Date();
    const dayOfWeek = currentDate.toLocaleString('en-us', { weekday: 'long' });

    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');
    const time = `${hours}:${minutes}:${seconds}`;

    return `Day: ${dayOfWeek}, Time: ${time}`;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [repoCommitData, setRepoCommitData] = useState<RepoCommit[]>([]);
    const [repoCommitLoading, setRepoCommitLoading] = useState<boolean>(false);
    const [repoCommitError, setRepoCommitError] = useState<string | null>(null);

    const [userCommitData, setUserCommitData] = useState<UserCommit[]>([]);
    const [userCommitLoading, setUserCommitLoading] = useState<boolean>(false);
    const [userCommitError, setUserCommitError] = useState<string | null>(null);

    const [userLOCData, setUserLOCData] = useState<UserLOC[]>([]);
    const [userLOCLoading, setUserLOCLoading] = useState<boolean>(false);
    const [userLOCError, setUserLOCError] = useState<string | null>(null);

    const [lastRefresh, setLastRefresh] = useState("");
    const [firstFetch, setFirstFetch] = useState(true);

    
    const fetchRepoCommits = async () => {
      try { 
        setRepoCommitLoading(true);
        const response = await axios.get("/api/repo-commits");
        const commit_data: RepoCommit[] = response.data; 
        const sorted_commit_data = commit_data.sort((a, b) => b.commits - a.commits); 
        const top_5_committers = sorted_commit_data.slice(0, 5);

        setRepoCommitData(top_5_committers);

      } catch (e: any) { 
        setRepoCommitError(e);
        console.error(e);

      } finally { 
        setRepoCommitLoading(false);
      }
    }

    const fetchLOC = async () => {
      try { 
        setUserLOCLoading(true);
        const response = await axios.get("/api/user-loc");
        const loc_data : UserLOC[] = response.data; 
        const sorted_loc_data = loc_data.sort((a, b) => b.lines_of_code - a.lines_of_code); 
        const top_5_loc = sorted_loc_data.slice(0, 5);
        setUserLOCData(top_5_loc);

      } catch (e: any) { 
        setUserLOCError(e);
        console.error(e);

      } finally { 
        setUserLOCLoading(false);
      }
    }

    const fetchUserCommits = async () => {
      try { 
        setUserCommitLoading(true);
        const response = await axios.get("/api/user-commits");
        const commit_data: UserCommit[] = response.data; 
        const sorted_commit_data = commit_data.sort((a, b) => b.commits - a.commits); 
        const top_5_committers = sorted_commit_data.slice(0, 5);

        setUserCommitData(top_5_committers);

      } catch (e: any) { 
        setUserCommitError(e);
        console.error(e);

      } finally { 
        setUserCommitLoading(false);
      }
    }
    const allFetches = async () => { 
        await Promise.all([fetchRepoCommits(), fetchUserCommits(), fetchLOC()]); 
        setLastRefresh(getDate());
    }

    useEffect(() => {
        if (firstFetch) { 
            setFirstFetch(false);
            allFetches(); 
        }

        const interval = setInterval(allFetches, 100000);
        return () => clearInterval(interval);
    }, []);

    return (
    <DataContext.Provider value={
        { repoCommitData, 
          repoCommitLoading, 
          repoCommitError, 

          userCommitData, 
          userCommitLoading, 
          userCommitError, 

          userLOCData, 
          userLOCLoading, 
          userLOCError, 

          lastRefresh, 
          refreshData: allFetches}}>
      {children}
    </DataContext.Provider>
    )
}

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("Trying to use context outside of data provider");
    }
    return context;
}
