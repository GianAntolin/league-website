from flask import Flask, jsonify, request
from flask_cors import CORS  # Import CORS
import backend
import sqlite3
import datetime
import json

app = Flask(__name__)

# Enable CORS for all routes (this will allow all origins)
CORS(app)

# Find the delta between now and an argument, time2 (in seconds)
# Return a string that displays the delta 
# in seconds, minutes, days, weeks or months
# based on the highest unit of time 
def timeElapsed(time2):
    delta = datetime.datetime.now() - datetime.datetime.fromtimestamp(time2)
    secondsElapsed = delta.total_seconds()
    minutesElapsed = int(secondsElapsed//60) if secondsElapsed/60 > 1 else 0
    hoursElapsed = int(secondsElapsed//3600) if minutesElapsed/60 > 1 else 0
    daysElapsed = delta.days if delta.days else 0
    monthsElapsed = int(daysElapsed//30) if daysElapsed/30 > 1 else 0
    yearsElapsed = int(monthsElapsed//12) if monthsElapsed/12 > 1 else 0

    if yearsElapsed: 
        timeUnit = 'year'
        if yearsElapsed > 1:
            timeUnit += 's'
        return f'{yearsElapsed} {timeUnit} ago'
    elif monthsElapsed >= 1:
        timeUnit = 'month'
        if monthsElapsed > 1:
            timeUnit += 's'
        return f'{monthsElapsed} {timeUnit} ago'
    elif daysElapsed:
        timeUnit = 'day'
        if daysElapsed > 1:
            timeUnit += 's'
        return f'{daysElapsed} {timeUnit} ago'
    elif hoursElapsed:
        timeUnit = 'hour'
        if hoursElapsed > 1:
            timeUnit += 's'
        return f'{hoursElapsed} {timeUnit} ago'
    elif minutesElapsed:
        timeUnit = 'minute'
        if secondsElapsed > 1:
            timeUnit += 's'
        return f'{minutesElapsed} {timeUnit} ago'
    else: 
        timeUnit = 'seconds'
        if secondsElapsed > 1:
            timeUnit += 's'
        return f'{secondsElapsed} {timeUnit} ago'
        

#Get account suggestions based on user input
@app.route('/api/search', methods = ['GET'])
def getAccountSuggestions():
    region = request.args.get('region')
    name = request.args.get('name')
    # If no name is provided, return None. 
    if name == '':
        return jsonify(None)
    tag = request.args.get('tag')

    with sqlite3.connect('website.db') as connection:
        connection.row_factory = sqlite3.Row
        cursor = connection.cursor()
        data = []
        # Search for accounts name similar to the input
        # Order will determined by: 
            # name matching 
            # tag matching 
            # alphabetically by name
            # alphabetically by region
        cursor.execute(""" SELECT * FROM accounts
                            WHERE 
                                region = :region COLLATE NOCASE 
                                AND name LIKE :like_name AND tag LIKE :like_tag
                            ORDER BY
                                CASE
                                    WHEN name = :name THEN 0 
                                    WHEN name LIKE :start_name THEN 1  
                                    WHEN name LIKE :like_name THEN 2
                                    ELSE 3
                                END,
                                CASE
                                    WHEN tag = :tag THEN 0
                                    WHEN tag LIKE :start_tag THEN 1
                                    WHEN tag LIKE :like_tag THEN 2
                                    ELSE 3
                                END,
                                name ASC,
                                tag ASC                   
                            LIMIT 3
                       """, { 'region': region, 
                              'name': name, 'tag': tag, 
                              'start_name': f'{name}%', 
                              'like_name': f'%{name}%' if name != '' else '%', 
                              'like_tag': f'%{tag}%' if tag != '' else '%', 
                              'start_tag': f'{tag}%'
                              })
                       
        accountData = cursor.fetchall()
        #Iterate through the results and store the relevant data
        for account in accountData:     
            account = dict(account)
            accountData = {}
            accountData['name'] = account['name']   
            accountData['tag'] = account['tag']
            accountData['icon'] = account['icon']
            accountData['region'] = account['region']
            data.append(accountData)
        with open('test/results/test.txt', 'w') as f:
            print('Testing: @Framework', file=f)
            print(f'name = {name}, tag = {tag}, region = {region}', file=f)
            for x in data: 
                print(x, file=f)  
    cursor.close()
    connection.close()     
    return jsonify(data) if len(data) != 0 else jsonify(None)

# Get data from matches between two time stamps (start - end)
@app.route('/api/<region>/<PUUID>/<start>/<end>', methods = ['GET'])
def recentGamesData(region, PUUID, start, end):
    with sqlite3.connect('website.db') as connection:
        connection.row_factory = sqlite3.Row
        cursor = connection.cursor()
        data = {}
        # Search in the matches tables in the database where the endtime in unix is between the start and end
        cursor.execute("""SELECT * FROM matches 
                    WHERE region = :region AND gameEndTimestamp BETWEEN :start AND :end
                    ORDER BY gameEndTimestamp ASC""", {'region': region.upper(), 'start': int(start), 'end': int(end)})
        matchListRows = cursor.fetchall()
        # Checks if a matches were found 
        # fetchall() returns an empty array if no matches are found
        if matchListRows:
            matchList = [dict(row) for row in matchListRows]
            data['champions'] = {}
            for match in matchList:
                cursor.execute("""SELECT * FROM participants 
                            WHERE matchID = :matchID and PUUID = :PUUID
                            """, {'matchID': match['matchID'], 'PUUID': PUUID})
                matchDataRows = cursor.fetchone()
                # Check if the a specific accounts is a participants in the match
                if matchDataRows:
                    matchData = dict(matchDataRows)
                    if matchData['champion'] in data['champions'].keys():
                        data['champions'][matchData['champion']]['wins'] += matchData['win']
                        data['champions'][matchData['champion']]['games'] += 1
                        data['champions'][matchData['champion']]['kills'] += matchData['kills']
                        data['champions'][matchData['champion']]['deaths'] += matchData['deaths']
                        data['champions'][matchData['champion']]['assists'] += matchData['assists']
                    else:
                        data['champions'][matchData['champion']] = {}
                        data['champions'][matchData['champion']]['championPic'] = matchData['championPic']
                        data['champions'][matchData['champion']]['championPicSplash'] = matchData['championPicSplash']
                        data['champions'][matchData['champion']]['wins'] = 1 if matchData['win'] else 0
                        data['champions'][matchData['champion']]['games'] = 1
                        data['champions'][matchData['champion']]['kills'] = matchData['kills']
                        data['champions'][matchData['champion']]['deaths'] = matchData['deaths']
                        data['champions'][matchData['champion']]['assists'] = matchData['assists']
                    
    cursor.close()
    connection.close()
    data = dict(sorted(data['champions'].items(), key = lambda champion: champion[1]['games'], reverse=True)[:3])

    return app.response_class(response = json.dumps(data, sort_keys=False),
                              mimetype='application/json')

# Check if account exists 
# If so, insert/update the account to the database
@app.route('/api/accounts', methods=['GET'])
def account(): 
    region = request.args.get('region')
    gameName = request.args.get('name')
    tagLine = request.args.get('tag')

    with sqlite3.connect('website.db') as connection:
        connection.row_factory = sqlite3.Row
        cursor = connection.cursor()
        # insert/update accounts if applicable
        response = backend.getSummoner(region, gameName, tagLine)
        status_code = response[1]
        # check if the account was inserted/updated
        if status_code == 200:
            # Get the account information from the database
            cursor.execute("SELECT * FROM accounts WHERE PUUID = :PUUID", {'PUUID': response[0]['PUUID']})
            data = dict(cursor.fetchone())
        else:
            data = response[0]
    cursor.close()
    connection.close()
    return jsonify(data), status_code

#Insert matches to the database based on the user's region, id.
@app.route('/api/matchlist/<region>/<id>/<start>/<count>', methods = ['GET'])
def matchList(region, id, start, count):
    with sqlite3.connect('website.db') as connection: 
        connection.row_factory = sqlite3.Row
        cursor = connection.cursor()
        # insert matches if applicable
        response = backend.matchList(region, id, start, count)
        status_code = response[1]
        command = "SELECT * FROM matches WHERE matchID IN ({}) ORDER BY gameEndTimestamp DESC".format(','.join(len(response[0]['matches']) * '?'))
        # Get matches from the database
        cursor.execute(command, response[0]['matches'])
        matches = cursor.fetchall()
        # Store matches and its information
        data = {}
        data['empty'] = response[0]['empty']
        data['matches'] = {}
        totalKills = 0
        totalDeaths = 0
        totalAssists = 0
        totalWins = 0
        totalGames = 0
        for matchNumber, match in enumerate(matches, start = int(start)):
            matchData = {}
            matchData['matchID'] = match['matchID']
            matchData['gameDurationM'] = match['gameDurationM']
            matchData['gameDurationS'] = match['gameDurationS']
            matchData['gameEndTimestamp'] = timeElapsed(match['gameEndTimestamp']/1000)
            matchData['gameEndTimestampUnix'] = match['gameEndTimestamp']
            matchData['highestDmg'] = match['highestDmg']
            matchData['queueType'] = match['queueType']
            # Get all the participants for the match
            cursor.execute("""SELECT participantName, particpantTag, PUUID, summonerSpell1ID, 
                        summonerSpell2ID, summonerSpell1URL, summonerSpell2URL, 
                        summonerPrimaryRuneTypeURL, summonerKeyStoneID, summonerPrimaryPerk1ID, summonerPrimaryPerk2ID, summonerPrimaryPerk3ID,   
                        summonerKeyStoneURL, summonerPrimaryPerk1URL, summonerPrimaryPerk2URL, summonerPrimaryPerk3URL,   
                        summonerSecondaryRuneTypeURL, summonerSecondaryPerk1ID, summonerSecondaryPerk2ID, 
                        summonerSecondaryPerk1URL, summonerSecondaryPerk2URL,
                        kills, deaths, assists, kda, cs, totalWards, visionWards,
                        wardsKilled, visionScore, totalDmgToChamps, champLevel, championPic, win 
                        FROM participants WHERE matchID = :matchID AND region = :region COLLATE NOCASE ORDER BY participantNumber ASC""", 
                        {'matchID': match['matchID'], 'region': match['region']})
            participantsDataRows = cursor.fetchall()
            participants = [dict(row) for row in participantsDataRows]
            matchData['participants'] = {}
            for index, participant in enumerate(participants, start = 0):
                if participant['PUUID'] == id: 
                    matchData['mainParticipant'] = str(index)
                    matchData['win'] = True if participant['win'] else False
                # Get all the items for the participant
                cursor.execute("""SELECT item0, item1, item2, item3, item4, item5, item6 FROM participants 
                            WHERE matchID = :matchID AND region = :region COLLATE NOCASE AND PUUID = :PUUID""", 
                            {'matchID': match['matchID'], 'region': match['region'], 'PUUID': participant['PUUID']})
                itemData = dict(cursor.fetchone())
                participant.update({'items' : itemData})
                matchData['participants'][f'{index}'] = participant
            # Get kills, deaths, assists, and wins from the participant that matches the id parameter
            cursor.execute("SELECT kills, deaths, assists, win FROM participants WHERE matchID = :matchID AND region = :region COLLATE NOCASE AND PUUID = :PUUID" , {'matchID': match['matchID'], 'region': match['region'], 'PUUID': id})
            rows = cursor.fetchall()
            participantKDA= [dict(row) for row in rows]
            for i in participantKDA:
                totalKills += i['kills']
                totalDeaths += i['deaths']
                totalAssists += i['assists']
                totalWins += 1 if i['win'] else 0
                totalGames += 1
            data['matches'][f'match{matchNumber}'] = matchData
        data['totalKills'] = totalKills
        data['totalDeaths'] = totalDeaths
        data['totalAssists'] = totalAssists
        data['totalWins'] = totalWins
        data['totalGames'] = totalGames

    cursor.close()
    connection.close()
    return jsonify(data), status_code

# Get the current leaderboard rankings
@app.route('/api/leaderboards', methods = ['GET'])
def getLeaderboards():
    region = request.args.get('region')
    queue = request.args.get('queue')
    start = request.args.get('start')
    end = request.args.get('end')
    leaderboards = backend.getLeaderboards(region, queue, start, end)
    data = leaderboards[0]
    status_code = leaderboards[1]
    return jsonify(data), status_code

    
if __name__ == '__main__':
    app.run(debug=True)


