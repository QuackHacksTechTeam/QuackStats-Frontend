

export type UserCommit = { 
    username: string, 
    commits: number
}

export type CommitResponse = {
    owner: string, 
    name: string, 
    user_commits: Record<string, number> 
}


