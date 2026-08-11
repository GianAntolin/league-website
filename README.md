# Statistical Platform for League of Legends

A league of legends platform that displays account statistics, match metrics, and region rankings. 

## Features

-  Real-time autocomplete account search
- Account search with url navigation (e.g /accounts/na1/faker/tag)
- Account statistics
- Match History with match metrics
- Paginated leaderboard rankings with query parameters

## Tech Stack 

### Frontend

- React
- Typescript
- Vite
- React Router
- React Query
### Backend

- Python
- Sqlite3

## Backend Setup

```
cd PythonBackEnd
pip install -r requirements.txt
python databaseSQL.py
```

Create a `.env` file in `PythonBackEnd/`: 

```
API_KEY= YOUR_API_KEY // Riot Developer Portal
```

## Frontend Setup 

```
cd ReactFrontEnd
npm install
```


# Running the Application 

## Terminal 1

```
cd PythonFrontEnd
python framework.py
```

## Terminal 2

```
cd ReactFrontEnd
npm run dev
```

# API Routes

## GET /api/search

Returns an array (max length of 3) of account name suggestions 

 **Query Parameters** 
 \-  name, region, and tag (optional)

**Response** 

```
[
  {
    "icon": string,
    "name": string,
    "region": string,
    "tag": string
  },
  {
    "icon": string,
    "name": string,
    "region": string,
    "tag": string
  },
  {
    "icon": string,
    "name": string,
    "region": string,
    "tag": string
  }
]
```

## GET /api/accounts

Returns account data 

 **Query Parameters** 
 \-  name, region, and tag

**Response** 

```
{
  "PUUID": string,
  "icon": string,
  "level": int,
  "name": string ,
  "rankFlexLP": int | null,
  "rankFlexLosses": int | null,
  "rankFlexRank": int | null,
  "rankFlexTier": string | null,
  "rankFlexTierImg": string | null,
  "rankFlexWins": string | null,
  "rankSoloLP": int | null,
  "rankSoloLosses": int | null,
  "rankSoloRank": string | null,
  "rankSoloTier": string | null,
  "rankSoloTierImg": string | null,
  "rankSoloWins": int | null,
  "region": string,
  "tag": string,
  "updatedAT": int
}
```

## GET /api/matches

Returns an object with match history statistics and an array of matches

 **Query Parameters** 
 \-  puuid, region, start and count

**Response**

```
{ 
  "empty": boolean,
  "matches": match[]
  "totalAssists": int,
  "totalDeaths": int,
  "totalGames": int,
  "totalKills": int, 
  "totalWins": int
}
```

## GET /api/leaderboards

Returns an object with match history statistics and an array of matches

 **Query Parameters** 
 \-  region, queue, start and end

**Response**

```
{ 
  "maxPages": int,
  "profiles": dict[int, dict]
  "tier": int
}
```
