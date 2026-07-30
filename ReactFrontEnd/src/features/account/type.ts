export type SummonerData = {

    PUUID: string;
    name: string;
    tag: string;
    region: string;
    level: number;
    icon: string;
    rankSoloTier: string;
    rankSoloTierImg: string;
    rankSoloRank: string;
    rankSoloLP: number;
    rankSoloWins: number;
    rankSoloLosses: number;
    rankFlexTier: string;
    rankFlexTierImg: string;
    rankFlexRank: string;
    rankFlexLP: number;
    rankFlexWins: number;
    rankFlexLosses: number;

}

export type ChampionsRecentGamesData = {
    wins: number;
    games: number;
    kills: number;
    deaths: number;
    assists: number;
    championPic: string;
    championPicSplash: string;
}

export type RecentGamesData = {
    [key: string]: ChampionsRecentGamesData;
}

export type ChampionItems = {
    item0: string;
    item1: string;
    item2: string;
    item3: string;
    item4: string;
    item5: string;
    item6: string;

}

export type Participant = {
    'PUUID': string;
    'participantName': string;
    'particpantTag': string;

    summonerSpell1ID: number;
    summonerSpell2ID: number;
    summonerSpell1URL: string;
    summonerSpell2URL: string;

    summonerPrimaryRuneTypeURL: string;
    summonerKeyStoneID: number;
    summonerPrimaryPerk1ID: number;
    summonerPrimaryPerk2ID: number;
    summonerPrimaryPerk3ID: number;
    summonerKeyStoneURL: string;
    summonerPrimaryPerk1URL: string;
    summonerPrimaryPerk2URL: string;
    summonerPrimaryPerk3URL: string;

    summonerSecondaryRuneTypeURL: string;
    summonerSecondaryPerk1ID: number;
    summonerSecondaryPerk2ID: number;
    summonerSecondaryPerk1URL: string;
    summonerSecondaryPerk2URL: string;

    'kills': number;
    'deaths': number;
    'assists': number;
    'kda': number;
    'cs': number;

    'totalWards': number;
    'visionWards': number;
    'wardsKilled': number;
    'visionScore': number;

    'totalDmgToChamps': number;

    'champLevel': number;
    'championPic': string;
    'championPicSplash': string;
    'items': ChampionItems;
    'win': boolean;
}

export type MatchData = {
    matchID: string;
    gameDurationM: number;
    gameDurationS: number;
    gameEndTimestamp: string;
    gameEndTimestampUnix: number;
    mainParticipant: string;
    win: boolean;
    queueType: string;
    highestDmg: number;
    participants: {
        '0': Participant;
        '1': Participant;
        '2': Participant;
        '3': Participant;
        '4': Participant;
        '5': Participant;
        '6': Participant;
        '7': Participant;
        '8': Participant;
        '9': Participant;
    };
}

export type Matches = {
    [key: string]: MatchData;
}

export type MatchHistoryData = {
    matches: Matches;
    totalKills: number;
    totalAssists: number;
    totalDeaths: number;
    totalWins: number;
    totalGames: number;
    empty: boolean;
}