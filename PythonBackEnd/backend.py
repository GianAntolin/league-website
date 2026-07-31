import requests
import math
import sqlite3
import datetime

import os
from dotenv import load_dotenv;

# API key is stored as an environment variable
load_dotenv()
key = os.getenv('API_KEY') #Expires every 24 hours
apiKey = "api_key=" + key


routing = {
    'NA1': { 
        'platform': 'https://NA1',
        'region': 'https://americas'
    },
    'BR1': { 
        'platform': 'https://BR1',
        'region': 'https://americas'
    },
    'LA1': { 
        'platform': 'https://LA1',
        'region': 'https://americas'
    },
    'LA2': { 
        'platform': 'https://LA2',
        'region': 'https://americas'
    },
    'EUW1': { 
        'platform': 'https://EUW1',
        'region': 'https://europe'
    },
    'EUN1': { 
        'platform': 'https://EUN1',
        'region': 'https://europe'
    },
    'ME1': { 
        'platform': 'https://ME1',
        'region': 'https://europe'
    },
    'RU': { 
        'platform': 'https://RU',
        'region': 'https://europe'
    },
    'TR1': { 
        'platform': 'https://TR1',
        'region': 'https://europe'
    },
    'JP1': { 
        'platform': 'https://JP1',
        'region': 'https://asia'
    },
    'KR': { 
        'platform': 'https://KR',
        'region': 'https://asia'
    },
    'OC1': { 
        'platform': 'https://OC1',
        'region': 'https://asia',
        'match' : 'https://sea'
    },
    'SG2': { 
        'platform': 'https://SG2',
        'region': 'https://asia',
        'match' : 'https://sea'
    },
    'TW2': { 
        'platform': 'https://TW2',
        'region': 'https://asia',
        'match' : 'https://sea'
    },
    'VN2': { 
        'platform': 'https://VN2',
        'region': 'https://asia',
        'match' : 'https://sea'
    }
    
}

baseRiotAPI = '.api.riotgames.com'


#API URL Requests based on Americas and NA regions
baseAccountRiotIDURL = "/riot/account/v1/accounts/by-riot-id/"  #region
baseAccountRiotPUUID = '/riot/account/v1/accounts/by-puuid/' #region
baseSummonerURL = "/lol/summoner/v4/summoners/by-puuid/" #Platform
baseMatchListURL = "/lol/match/v5/matches/by-puuid/" #region
baseMatchURL = "/lol/match/v5/matches/" #region
baseChallengerQueue = '/lol/league/v4/challengerleagues/by-queue/' #platform
baseLeagueRank = '/lol/league/v4/entries/by-puuid/' #platform
#Base URL for data and assets

    #Make an API call to find the latest version of DDragon
def getLatestDDragonversion():
    response = requests.get("https://ddragon.leagueoflegends.com/api/versions.json")
    DdragonVersions = response.json()
    return "https://ddragon.leagueoflegends.com/cdn/" + DdragonVersions[0] + "/"
ddragonBaseURL = getLatestDDragonversion()

challengerRankedSoloURL = "https://na1.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5" #platform


# API call to get summoner spells data
def getSummonerSpellsData():
    response = requests.get( ddragonBaseURL + "data/en_US/summoner.json") 
    summonerSpells = response.json()
    return summonerSpells['data']

#API call to get runes data
def getRunesData(): 
    response = requests.get(ddragonBaseURL + "data/en_US/runesReforged.json")
    return response.json()

summonerSpellID = getSummonerSpellsData()
runesData = getRunesData()

    #Queue IDs for Summoner Rift map 
            # 400 - 5v5 Draft
            # 420 - 5v5 Ranked Solo
            # 430 - 5v5 Blind
            # 440 - Ranked Flex
            # 450 - Aram
            # 480 - Normal (Swiftplay)
            # 1700 - Arena
    #[0] = most recent match
queueTypeWhiteList = [400,420,430,440,450,480]
styleClassic = [400,420,430,440,450,480]
styleArena = [1700]

# Parameters - gameName: string, tagLine: string, region: string
# Return - data:  dict or string, response_code : int
# Get summoner data based on the game name and tagline using an API call 
# Check if account already exists in the database and last update
# if account does not exist, insert the account to the database
# if account does exist, but hasn't been updated in the last x minutes, update it
def getSummoner(region, gameName, tagLine):
    # Check the database if the account already exists
    update = False  
    with sqlite3.connect('website.db') as connection:
        connection.row_factory = sqlite3.Row
        cursor = connection.cursor()

        #Check if the account exists in the accounts table
        cursor.execute("SELECT * FROM accounts WHERE name = :name AND tag = :tag AND region = :region", {'region': region.upper(), 'name': gameName, 'tag': tagLine})
        rows = cursor.fetchone()
    
        if rows:
            # Account exists in the accounts table
            delta = datetime.datetime.now().timestamp() - rows['updatedAT']
            minsDelta = delta / 60
            # Check the last update
            if minsDelta < 15:
                return dict(rows), 200
            else:
                update = True

    cursor.close()
    connection.close()
    
    #Send a request to get account information based on user's identification, RiotID
    if region.upper() not in routing.keys():
        return 'Region not found',404

    apiURL = routing[region.upper()]['region'] + baseRiotAPI + baseAccountRiotIDURL + gameName + "/" + tagLine + "?" + apiKey
    response = requests.get(apiURL)

    #Check the HTTP status code
    if not(response.ok):
        if (response.status_code == 404):
            return f'No search results for {gameName}#{tagLine}', response.status_code
        return response.reason, response.status_code
    #convert the response to a JSON object
    account = response.json()

    #obtaining the account's unique identification
    accountPUUID = account['puuid']

    #Send a request to get player information based on PUUID
    apiURL = routing[region.upper()]['platform'] + baseRiotAPI + baseSummonerURL + accountPUUID + "?" + apiKey
    response = requests.get(apiURL)

    if response.ok:
        summonerProfile = response.json()
        profileImgURL = ddragonBaseURL + 'img/profileicon/' + str(summonerProfile['profileIconId']) +'.png'
        profile = {
            'PUUID' : accountPUUID,
            'name': gameName,
            'tag': tagLine,
            'region': region.upper(),
            'level' : summonerProfile['summonerLevel'],
            'icon': profileImgURL,
            'updatedAT': summonerProfile['revisionDate']
        }

        #Send a request for player's ranked information
        apiURL = routing[region.upper()]['platform'] + baseRiotAPI + baseLeagueRank + accountPUUID + "?" + apiKey
        response = requests.get(apiURL)
        
        if not(response.ok):
            return response.reason, response.status_code

        rankData = response.json()
        rankSolo = False
        rankFlex = False
        # Store the information
        for league in rankData: 
            if league['queueType'] == 'RANKED_SOLO_5x5':
                profile['rankSoloTier'] = league['tier']
                profile['rankSoloTierImg'] = 'http://127.0.0.1:5000/static/images/RankedEmblems/' + league['tier'].capitalize() + '.png'
                profile['rankSoloRank'] = league['rank']
                profile['rankSoloLP'] = league['leaguePoints']
                profile['rankSoloWins'] = league['wins']
                profile['rankSoloLosses'] = league['losses']
                #Check if update is needed for ranked solo/duo information
                rankSolo = True
            elif league['queueType'] == 'RANKED_FLEX_SR':
                profile['rankFlexTier'] = league['tier']
                profile['rankFlexTierImg'] = 'http://127.0.0.1:5000/static/images/RankedEmblems/' + league['tier'].capitalize() + '.png'
                profile['rankFlexRank'] = league['rank']
                profile['rankFlexLP'] = league['leaguePoints']
                profile['rankFlexWins'] = league['wins']
                profile['rankFlexLosses'] = league['losses']
                #Check if update is needed for ranked flex information
                rankFlex = True

        with sqlite3.connect('website.db') as connection:
            connection.row_factory = sqlite3.Row
            cursor = connection.cursor()
            # Check if the PUUID already exists
            cursor.execute("SELECT * FROM accounts WHERE PUUID = :PUUID AND region = :region ", profile)
            rows = cursor.fetchone()
            
            # Insert/update the account to the accounts table 
            if update or rows:
                cursor.execute("""UPDATE accounts SET 
                            PUUID = :PUUID, name = :name, 
                            tag = :tag, region = :region, 
                            level = :level, icon = :icon, 
                            updatedAT = :updatedAT WHERE PUUID = :PUUID""",
                            profile) 

            else: 
                cursor.execute("""INSERT INTO accounts
                               (PUUID, name, tag, region, level, icon, updatedAT) 
                               VALUES (:PUUID, :name, :tag, :region, :level, :icon, :updatedAT)""", profile)
            if rankSolo: 
                cursor.execute("""UPDATE accounts SET 
                            rankSoloTier = :rankSoloTier, rankSoloTierImg = :rankSoloTierImg, rankSoloRank = :rankSoloRank, 
                            rankSoloLP = :rankSoloLP, rankSoloWins = :rankSoloWins, 
                            rankSoloLosses = :rankSoloLosses 
                            WHERE PUUID = :PUUID""",
                            profile) 
            if rankFlex: 
                cursor.execute("""UPDATE accounts SET 
                            rankFlexTier = :rankFlexTier, rankFlexTierImg = :rankFlexTierImg, rankFlexRank = :rankFlexRank, 
                            rankFlexLP = :rankFlexLP, rankFlexWins = :rankFlexWins, 
                            rankFlexLosses = :rankFlexLosses 
                            WHERE PUUID = :PUUID""",
                            profile) 
        cursor.close()
        connection.close()
        return profile, response.status_code
    if (response.status_code == 404):
            return f'No search results for {gameName}#{tagLine}', response.status_code
    return response.reason, response.status_code

# Parameters - id : string,  start : int, count : int, region: string
# Return - data : Dict or string, response_code : int
# API call to get a list of match ids based on the user's id
# Check the database if the match already stored if not, use match ids make an API call to get the match details
def matchList(region, id, start, count):
    if region.upper() not in routing.keys():
        return 'Region not found',404

    queryParams = '/ids?start=' + start + '&count=' + count + '&' + apiKey

    if 'match' in routing[region.upper()].keys():
        apiURL = routing[region.upper()]['match'] + baseRiotAPI + baseMatchListURL + id + queryParams
    else: 
        apiURL = routing[region.upper()]['region'] + baseRiotAPI + baseMatchListURL + id + queryParams

    # Request for match list based on the id
    # Returns [] if no match history
    response = requests.get(apiURL)

    if response.ok:
        # returns a List[String]
        data = response.json()
        
        matchHistory = {}
        matchHistory['empty'] = True

        if len(data) > 0: 
            matchHistory['empty'] = False
            
        # Iterate through all match ids
            for matchID in data:
                # Check if the database if the match already exists 
                with sqlite3.connect('website.db') as connection: 
                    cursor = connection.cursor()
                    cursor.execute("SELECT * FROM matches WHERE matchID = :matchID", {'matchID': matchID})
                    if cursor.fetchall():
                        continue
                if 'match' in routing[region.upper()].keys():
                    apiMatchURL = routing[region.upper()]['match'] + baseRiotAPI + baseMatchURL + matchID + '?' + apiKey
                else: 
                    apiMatchURL = routing[region.upper()]['region'] + baseRiotAPI + baseMatchURL + matchID + '?' + apiKey
                # Using the match id for match details api endpoint
                responseMatch = requests.get(apiMatchURL)
                if responseMatch.ok:
                    matchData = responseMatch.json()
                    queueId = matchData['info']['queueId'] 
                    if queueId not in queueTypeWhiteList:
                        continue

                    queueType = getQueue(queueId)
                
                    #find the participant # of the account
                    participantNumber = 0
                    for index, participant in enumerate(matchData['metadata']['participants'], start = 0):
                        if participant == id:
                            participantNumber = index

                    # Getting match information
                    matchInfo = matchData['info']
                    gameEndTimestamp = matchInfo['gameEndTimestamp']
                    gameDurationM = matchInfo['gameDuration'] // 60
                    gameDurationS = matchInfo['gameDuration'] % 60
                    win = matchData['info']['participants'][participantNumber]['win']
    

                    profileData = {
                        'matchID' : matchID,
                        'mainParticipant': str(participantNumber),
                        'gameEndTimestamp': gameEndTimestamp,
                        'gameDurationM': gameDurationM,
                        'gameDurationS': gameDurationS,
                        'win' : win,
                        'queueType': queueType
                    }

                    highestDmg = 0

                    # Get match data for each participants
                    for i in range(10):
                        matchDetails = getMatchData(matchData, i)
                        participantData = {'participantID': f'{matchID}_{i}', 'matchID': matchID, 'region': region.upper(), 'participantNumber': i}
                        participantData.update(matchDetails)
                        with sqlite3.connect('website.db') as connection: 
                            cursor = connection.cursor()
                            cursor.execute("SELECT * FROM participants WHERE participantID = :participantID", {'participantID': participantData['participantID']})
                            # Check if the participant in the participants table exist
                            if cursor.fetchall():
                                continue
                            
                            cursor.execute("""INSERT INTO participants VALUES (:participantID, :matchID, :region, :participantNumber, :participantName, 
                                :particpantTag, :PUUID, :summonerSpell1ID, :summonerSpell2ID, :summonerSpell1URL, :summonerSpell2URL, 
                                :summonerPrimaryRuneTypeURL, :summonerKeyStoneID, :summonerPrimaryPerk1ID, :summonerPrimaryPerk2ID, :summonerPrimaryPerk3ID, 
                                :summonerKeyStoneURL, :summonerPrimaryPerk1URL, :summonerPrimaryPerk2URL, :summonerPrimaryPerk3URL, 
                                :summonerSecondaryRuneTypeURL, :summonerSecondaryPerk1ID, :summonerSecondaryPerk2ID, :summonerSecondaryPerk1URL, :summonerSecondaryPerk2URL,
                                :kills, :deaths, :assists, :kda, :cs, :totalWards, :visionWards, :wardsKilled, :visionScore, :totalDmgToChamps,
                                :champion, :champLevel, :championPic, :championPicSplash, :item0, :item1, :item2, :item3, :item4, :item5, :item6, :win)""", participantData)
                        if matchDetails['totalDmgToChamps'] > highestDmg:
                            highestDmg = matchDetails['totalDmgToChamps'] 
                        cursor.close()
                        connection.close()
                    profileData['highestDmg'] = highestDmg
                    profileData['region'] = region.upper()
                    #insert the match to the matches table
                    with sqlite3.connect('website.db') as connection: 
                        cursor = connection.cursor()
                        cursor.execute("INSERT INTO matches VALUES (:matchID, :gameDurationM, :gameDurationS, :gameEndTimestamp, :highestDmg, :queueType, :region)",profileData)
                    cursor.close()
                    connection.close()
                else:
                    return responseMatch.reason, responseMatch.status_code
        matchHistory['matches'] = data
        return matchHistory, response.status_code
    return response.reason, response.status_code

# id : int
# Get the queue type based on the id passed 
def getQueue(id):
    if id == 400 or id == 430:
        return "Normal"
    elif id == 420:
        return "Ranked Solo"
    elif id == 440:
        return "Ranked Flex"
    elif id == 450:
        return "ARAM"
    elif id == 480:
        return 'Swiftplay'
    else:
        #id == 1700
        return "Unknown"
    
def getSummonerSpellURL(id): 
    for spell in summonerSpellID.values(): 
        if spell['key'] == str(id): 
            return spell['image']['full']

    return None 

def getRunesURL(id): 
    for runeType in runesData:
        for runeSlots in runeType['slots']:
            for runeTier in runeSlots.values():
                for rune in runeTier:
                    if rune['id'] == id: 
                       return rune['icon'], runeType['icon']
    return None 

# Parameters: matchData : dict, participantNumber - int
# Return: data : dict
# Get match data based on the participant number                
def getMatchData(matchData, participantNumber):

    # Getting match information
    matchInfo = matchData['info']

    # Get the participant's match details   
    participantInfo = matchInfo['participants'][participantNumber]

    participantName = participantInfo['riotIdGameName']
    particpantTag = participantInfo['riotIdTagline']
    participantID = participantInfo['puuid']
    
    summonerSpell1ID = participantInfo['summoner1Id']
    summonerSpell2ID = participantInfo['summoner2Id']

    summonerKeyStoneID = participantInfo['perks']['styles'][0]['selections'][0]['perk']
    summonerPrimaryPerk1ID = participantInfo['perks']['styles'][0]['selections'][1]['perk']
    summonerPrimaryPerk2ID = participantInfo['perks']['styles'][0]['selections'][2]['perk']
    summonerPrimaryPerk3ID = participantInfo['perks']['styles'][0]['selections'][3]['perk']
    summonerSecondaryPerk1ID = participantInfo['perks']['styles'][1]['selections'][0]['perk']
    summonerSecondaryPerk2ID = participantInfo['perks']['styles'][1]['selections'][1]['perk']
    
    primaryRuneType = getRunesURL(summonerKeyStoneID)
    summonerPrimaryRuneTypeURL = "https://ddragon.leagueoflegends.com/cdn/img/" + primaryRuneType[1]
    summonerKeyStoneURL = "https://ddragon.leagueoflegends.com/cdn/img/" + primaryRuneType[0]

    summonerPrimaryPerk1URL = "https://ddragon.leagueoflegends.com/cdn/img/" + getRunesURL(summonerPrimaryPerk1ID)[0]
    summonerPrimaryPerk2URL = "https://ddragon.leagueoflegends.com/cdn/img/" + getRunesURL(summonerPrimaryPerk2ID)[0]
    summonerPrimaryPerk3URL = "https://ddragon.leagueoflegends.com/cdn/img/" + getRunesURL(summonerPrimaryPerk3ID)[0]

    secondaryRune = getRunesURL(summonerSecondaryPerk1ID)
    summonerSecondaryRuneTypeURL = "https://ddragon.leagueoflegends.com/cdn/img/"  + secondaryRune[1]
    summonerSecondaryPerk1URL = "https://ddragon.leagueoflegends.com/cdn/img/" + secondaryRune[0]
    summonerSecondaryPerk2URL = "https://ddragon.leagueoflegends.com/cdn/img/" + getRunesURL(summonerSecondaryPerk2ID)[0]

    summonerSpell1 = ddragonBaseURL + 'img/spell/' + getSummonerSpellURL(summonerSpell1ID)
    summonerSpell2 = ddragonBaseURL + 'img/spell/' + getSummonerSpellURL(summonerSpell2ID)


    champion = participantInfo['championName']
    if champion == 'FiddleSticks':
        champion = champion.capitalize()

    championPic = ddragonBaseURL + 'img/champion/' + champion + '.png'
    championPicSplash = 'https://ddragon.leagueoflegends.com/cdn/img/champion/centered/' + champion + '_0.jpg'

    champLevel = participantInfo['champLevel']
    champ = participantInfo['championName'].capitalize()

    kills = participantInfo['kills']
    deaths = participantInfo['deaths']
    assists = participantInfo['assists']
    kda = '{:0.2f}'.format(participantInfo['challenges']['kda'])
    cs = participantInfo['totalMinionsKilled'] + participantInfo['neutralMinionsKilled']
    
    totalWards = participantInfo['wardsPlaced']
    wardsKilled = participantInfo['wardsKilled']
    visionWards = participantInfo['visionWardsBoughtInGame']
    visionScore = participantInfo['visionScore']

    totalDmgToChamps = participantInfo['totalDamageDealtToChampions']

    #boolean
    win = participantInfo['win']
    profileData = {}

    #Get item number and covert it to its appropriate url
    for i in range(7):
        itemID = participantInfo[f'item{i}']   
        picUrl = '' 
        if itemID != 0:
            picUrl = ddragonBaseURL + 'img/item/' + str(itemID) + '.png'
        profileData[f'item{i}'] = picUrl

    profileData.update({
        'participantName': participantName,
        'particpantTag': particpantTag,
        'PUUID' : participantID,

        'summonerSpell1ID': summonerSpell1ID, 
        'summonerSpell2ID': summonerSpell1ID,
        'summonerSpell1URL': summonerSpell1,
        'summonerSpell2URL': summonerSpell2,

        'summonerPrimaryRuneTypeURL': summonerPrimaryRuneTypeURL, 
        'summonerKeyStoneID' : summonerKeyStoneID,
        'summonerPrimaryPerk1ID' : summonerPrimaryPerk1ID,
        'summonerPrimaryPerk2ID' : summonerPrimaryPerk2ID,
        'summonerPrimaryPerk3ID' : summonerPrimaryPerk3ID,
        'summonerSecondaryPerk1ID' : summonerSecondaryPerk1ID,
        'summonerSecondaryPerk2ID' : summonerSecondaryPerk2ID,

        'summonerSecondaryRuneTypeURL': summonerSecondaryRuneTypeURL,
        'summonerKeyStoneURL': summonerKeyStoneURL, 
        'summonerPrimaryPerk1URL': summonerPrimaryPerk1URL,
        'summonerPrimaryPerk2URL': summonerPrimaryPerk2URL,
        'summonerPrimaryPerk3URL': summonerPrimaryPerk3URL,
        'summonerSecondaryPerk1URL': summonerSecondaryPerk1URL,
        'summonerSecondaryPerk2URL': summonerSecondaryPerk2URL,

        'kills':  kills,
        'deaths': deaths,
        'assists': assists,
        'kda': kda,
        'cs': cs,

        'totalWards': totalWards,
        'visionWards': visionWards,
        'wardsKilled': wardsKilled,
        'visionScore': visionScore,

        'totalDmgToChamps': totalDmgToChamps,
        
        'champion': champ,
        'champLevel': champLevel,
        'championPic': championPic,
        'championPicSplash': championPicSplash,
        'win': win
    })
    return profileData

# Parameters - start: int, end: int, region: string
# Get the challenger leaderboards for the Ranked Solo/Duo queue 
# If an account is not found in the database, store it
def getLeaderboards(region, type, start, end):
    if region.upper() not in routing.keys():
        return 'Region not found',404
    
    if type == 'solo':
        queueType = 'RANKED_SOLO_5x5'
    else: 
        queueType = 'RANKED_FLEX_SR'

    apiURL = routing[region.upper()]['platform'] + baseRiotAPI + baseChallengerQueue + queueType + '?' + apiKey
    response = requests.get(apiURL)
    start = int(start)
    end = int(end)
    currPage = end/10

    if response.ok:
        data = response.json()
        maxPages = math.ceil(len(data['entries']) / 10)
        if currPage > maxPages:
            return 'No data found', 404
        leaderboard = {}
        profiles, status_code = getLeaderboardsProfile(region.upper(), data,start,end, queueType)
        if status_code != 200:
            return profiles, status_code

        leaderboard['profiles'] = profiles
        leaderboard['tier'] = data['tier']
        leaderboard['maxPages'] = maxPages
        return leaderboard, response.status_code
    
    return response.reason, response.status_code

# Parameters - data: dict, start: int, end: int, region: string
# Get the account information
# If account is not found in the database, get account information 
# through API calls then store the account to the database
def getLeaderboardsProfile(region, data, start, end, queueType):
    if region.upper() not in routing.keys():
        return 'Region not found',404

    profiles = {}
    # iterate through all the accounts
    


    for index, user in enumerate(data['entries'][start:end], start = start+1):
        profile = {}
        profile['tier'] =  data['tier']
        profile['tierImg'] = 'http://127.0.0.1:5000/static/images/RankedEmblems/' + data['tier'].capitalize() + '.png'
        profile['PUUID'] = user['puuid']
        profile['rank'] = user['rank']
        profile['lp'] = user['leaguePoints']
        profile['wins'] = user['wins']
        profile['losses'] = user['losses']
        profile['region'] = region.upper()
        

        with sqlite3.connect('website.db') as connection: 
            connection.row_factory = sqlite3.Row
            cursor = connection.cursor()
            cursor.execute("SELECT * FROM accounts where PUUID = :PUUID", {'PUUID': user['puuid']})
            # Check if the account exists on the database
            accountsFetch = cursor.fetchone()
            
            
            summonerAPI = routing[region.upper()]['platform'] + baseRiotAPI + baseSummonerURL + user['puuid'] + "?" + apiKey
            summonerData = requests.get(summonerAPI)
            if not(summonerData.ok):
                return summonerData.reason , summonerData.status_code
            summonerProfile = summonerData.json()

            # If puuid is in database, 
            if accountsFetch:
                # check if the revision date matches 
                if (summonerProfile['revisionDate'] == accountsFetch['updatedAT']):
                    profile.update(dict(accountsFetch))
                else: 
                    #if not, update the database
                    profileImgURL = ddragonBaseURL + 'img/profileicon/' + str(summonerProfile['profileIconId']) +'.png'
                    profile.update({
                    'level' : summonerProfile['summonerLevel'],
                    'icon': profileImgURL,
                    'updatedAT':summonerProfile['revisionDate']
                    })
                    accountAPI = routing[region.upper()]['region'] + baseRiotAPI + baseAccountRiotPUUID+ user['puuid'] + '?' + apiKey
                    accountResponse= requests.get(accountAPI)
                    if not(accountResponse.ok):
                        return accountResponse.reason, accountResponse.status_code
                    accountData = accountResponse.json()
                    profile['name'] = accountData['gameName']
                    profile['tag'] = accountData['tagLine']

                    cursor.execute("""UPDATE accounts SET 
                                name = :name, tag = :tag, region = :region, 
                                level = :level, icon = :icon, updatedAT = :updatedAT 
                                WHERE PUUID = :PUUID""", profile)
                    

            else:

                profileImgURL = ddragonBaseURL + 'img/profileicon/' + str(summonerProfile['profileIconId']) +'.png'
                profile.update({
                    'level' : summonerProfile['summonerLevel'],
                    'icon': profileImgURL,
                    'updatedAT': summonerProfile['revisionDate']
                })

                accountAPI = routing[region.upper()]['region'] + baseRiotAPI + baseAccountRiotPUUID+ user['puuid'] + '?' + apiKey
                accountResponse= requests.get(accountAPI)
                if not(accountResponse.ok):
                    return accountResponse.reason, accountResponse.status_code
                accountData = accountResponse.json()
                profile['name'] = accountData['gameName']
                profile['tag'] = accountData['tagLine']
                # Insert the account to the database
                cursor.execute("INSERT INTO accounts(PUUID, name, tag, region, level, icon, updatedAT) VALUES (:PUUID, :name, :tag, :region, :level, :icon, :updatedAT)", profile)


            if queueType == 'RANKED_SOLO_5x5':
                cursor.execute("""UPDATE accounts SET 
                        rankSoloTier = :tier , rankSoloTierImg  = :tierImg,
                        rankSoloRank = :rank, rankSoloLP = :lp, 
                        rankSoloWins = :wins, rankSoloLosses = :losses 
                        WHERE PUUID = :PUUID""",
                        profile) 
            else:
                cursor.execute("""UPDATE accounts SET 
                        rankFlexTier = :tier , rankFlexTierImg = :tierImg,
                        rankFlexRank = :rank, rankFlexLP = :lp, 
                        rankFlexWins = :wins, rankFlexLosses = :losses
                        WHERE PUUID = :PUUID""",
                        profile) 
        

        cursor.close()
        connection.close()
        profiles[f'{index}'] = profile
        
    return profiles, 200


                
