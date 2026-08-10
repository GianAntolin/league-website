export type LeaderboardsProfile = {
    PUUID: string,
    icon: string,
    level: number,
    losses: number,
    lp: number,
    name: string,
    rank: string,
    rankFlexTier: string,
    rankFlexLP: number | null,
    rankFlexLosses: number | null,
    rankFlexRank: string | null,
    rankFlexTierImg: string | null,
    rankFlexWins: number | null,
    rankSoloTier: string,
    rankSoloLP: number | null,
    rankSoloLosses: number | null,
    rankSoloRank: string | null,
    rankSoloTierImg: string | null,
    rankSoloWins: number | null,
    region: string,
    tag: string,
    tier: string,
    tierImg: string,
    updatedAT: number,
    wins: number
}
export type LeaderboardsProfiles = {
    [key: string]: LeaderboardsProfile;
}

export type LeaderboardsData = {
    profiles: LeaderboardsProfiles;
    tier: string;
    maxPages: number;
}

export type LeaderboardsFilter = {
    region: string,
    queue: string,
    page: string
}