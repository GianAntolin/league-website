export type LeaderboardsProfile = {
    icon: string;
    PUUID: string;
    lp: number;
    wins: number;
    losses: number;
    level: number;
    name: string;
    tag: string;
    region: string;
}
export type LeaderboardsProfiles ={
    [key: string]: LeaderboardsProfile;
}

export type LeaderboardsData = {
    profiles: LeaderboardsProfiles;
    tier: string;
    maxPages: number;
}

export type LeaderboardsFilter = {
    region: string | null,
    queue: string | null, 
    page: string | null
}