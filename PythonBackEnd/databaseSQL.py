import sqlite3

def createDatabase():
    with connection: 
        cursor.execute("""CREATE TABLE accounts(
                    PUUID TEXT PRIMARY KEY,
                    name TEXT NOT NULL COLLATE NOCASE,
                    tag TEXT NOT NULL COLLATE NOCASE,
                    region TEXT NOT NULL COLLATE NOCASE,
                    level INTEGER,
                    icon TEXT,
                    rankSoloTier TEXT DEFAULT 'UNRANKED',
                    rankSoloTierImg TEXT, 
                    rankSoloRank TEXT,
                    rankSoloLP INTEGER,
                    rankSoloWins INTEGER, 
                    rankSoloLosses INTEGER,
                    rankFlexTier TEXT DEFAULT 'UNRANKED',
                    rankFlexTierImg TEXT,
                    rankFlexRank TEXT,
                    rankFlexLP INTEGER,
                    rankFlexWins INTEGER, 
                    rankFlexLosses INTEGER,
                    updatedAT REAL NOT NULL)
                    """)
        cursor.execute("""CREATE TABLE matches(
                    matchID TEXT PRIMARY KEY,
                    gameDurationM INTEGER NOT NULL,
                    gameDurationS INTEGER NOT NULL,
                    gameEndTimestamp INTEGER NOT NULL,
                    highestDmg INTEGER NOT NULL,
                    queueType TEXT NOT NULL,
                    region TEXT NOT NULL)
                        """)
        cursor.execute("""CREATE TABLE participants(
                    participantID TEXT PRIMARY KEY,
                    matchID TEXT NOT NULL,
                    region,
                    participantNumber,
                    participantName,
                    particpantTag, 
                    PUUID,
                    summonerSpell1,
                    summonerSpell2,
                    kills INTEGER,
                    deaths INTEGER,
                    assists INTEGER, 
                    kda INTEGER,
                    cs INTEGER,
                    totalWards INTEGER,
                    visionWards INTEGER,
                    wardsKilled INTEGER,
                    visionScore INTEGER,
                    totalDmgToChamps INTEGER,
                    champion TEXT,
                    champLevel INTEGER,
                    championPic TEXT,
                    championPicSplash TEXT,
                    item0 TEXT,
                    item1 TEXT,
                    item2 TEXT,
                    item3 TEXT,
                    item4 TEXT,
                    item5 TEXT,
                    item6 TEXT,
                    win,
                    FOREIGN KEY(matchID) REFERENCES matches(matchID))
                        """)

    

connection = sqlite3.connect('website.db')
cursor = connection.cursor()
createDatabase()
connection.close()
