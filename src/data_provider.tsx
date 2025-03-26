import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from './axios_config';

import { RepoCommit, UserCommit, UserLOC } from './types';

/*
    Global state of data fetches to the server 

    The fetches happen at set intervals, allowing the compnents to be updated  
    no matter where you are on the page 

*/

const REFRESH_TIME = 1000 * 60 * 30; // 30 Minutes

interface DataContextType {
  repoCommitData: RepoCommit[];
  repoCommitLoading: boolean;
  repoCommitError: string | null;
  repoCommitLastRefresh: string;
  repoCommitRefresh: () => void;

  userCommitData: UserCommit[];
  userCommitLoading: boolean;
  userCommitError: string | null;
  userCommitLastRefresh: string;
  userCommitRefresh: () => void;

  userLOCData: UserLOC[];
  userLOCLoading: boolean;
  userLOCError: string | null;
  userLOCLastRefresh: string;
  userLOCRefresh: () => void;

  refreshAllData: () => void;
}

const getDate = () => {
  const currentDate = new Date();
  const dayOfWeek = currentDate.toLocaleString('en-us', { weekday: 'long' });

  const hours = currentDate.getHours().toString().padStart(2, '0');
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  const seconds = currentDate.getSeconds().toString().padStart(2, '0');
  const time = `${hours}:${minutes}:${seconds}`;

  return `${dayOfWeek}, ${time}`;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [repoCommitData, setRepoCommitData] = useState<RepoCommit[]>([]);
  const [repoCommitLoading, setRepoCommitLoading] = useState<boolean>(false);
  const [repoCommitError, setRepoCommitError] = useState<string | null>(null);
  const [repoCommitLastRefresh, setRepoCommitLastRefresh] = useState('');

  const [userCommitData, setUserCommitData] = useState<UserCommit[]>([]);
  const [userCommitLoading, setUserCommitLoading] = useState<boolean>(false);
  const [userCommitError, setUserCommitError] = useState<string | null>(null);
  const [userCommitLastRefresh, setUserCommitLastRefresh] = useState('');

  const [userLOCData, setUserLOCData] = useState<UserLOC[]>([]);
  const [userLOCLoading, setUserLOCLoading] = useState<boolean>(false);
  const [userLOCError, setUserLOCError] = useState<string | null>(null);
  const [userLOCLastRefresh, setUserLOCLastRefresh] = useState('');

  const [firstFetch, setFirstFetch] = useState(true);

  const fetchRepoCommits = async () => {
    try {
      setRepoCommitLoading(true);
      const response = await axios.get('/api/repo-commits');
      setRepoCommitData(response.data);
      setRepoCommitLastRefresh(getDate());
    } catch (e: any) {
      setRepoCommitError(e);
      console.error(e);
    } finally {
      setRepoCommitLoading(false);
    }
  };

  const fetchLOC = async () => {
    try {
      setUserLOCLoading(true);
      const response = await axios.get('/api/user-loc');
      setUserLOCData(response.data);
      setUserLOCLastRefresh(getDate());
    } catch (e: any) {
      setUserLOCError(e);
      console.error(e);
    } finally {
      setUserLOCLoading(false);
    }
  };

  const fetchUserCommits = async () => {
    try {
      setUserCommitLoading(true);
      const response = await axios.get('/api/user-commits');
      setUserCommitData(response.data);
      setUserCommitLastRefresh(getDate());
    } catch (e: any) {
      setUserCommitError(e);
      console.error(e);
    } finally {
      setUserCommitLoading(false);
    }
  };
  const allFetches = async () => {
    await Promise.all([fetchRepoCommits(), fetchUserCommits(), fetchLOC()]);
  };

  useEffect(() => {
    if (firstFetch) {
      setFirstFetch(false);
      allFetches();
    }

    const interval = setInterval(allFetches, REFRESH_TIME);
    return () => clearInterval(interval);
  }, []);

  return (
    <DataContext.Provider
      value={{
        repoCommitData,
        repoCommitLoading,
        repoCommitError,
        repoCommitLastRefresh,
        repoCommitRefresh: fetchRepoCommits,

        userCommitData,
        userCommitLoading,
        userCommitError,
        userCommitLastRefresh,
        userCommitRefresh: fetchUserCommits,

        userLOCData,
        userLOCLoading,
        userLOCError,
        userLOCLastRefresh,
        userLOCRefresh: fetchLOC,

        refreshAllData: allFetches,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('Trying to use context outside of data provider');
  }
  return context;
};
