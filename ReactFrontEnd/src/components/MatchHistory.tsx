import useFetch from "../hooks/useFetch";

import '../css/MatchHistory.css'
import { useEffect, useMemo, useState } from "react";
import ErrorPage from "../pages/ErrorPage";
import MatchList from "./MatchList";
import KDA from "./KDA";
import NoRecentMatches from "./NoRecentMatches";
import WinRateChart from "./WinRateChart";
import RecentGames from "./RecentGames";

export interface ChampionItems{
  item0: string; 
  item1: string; 
  item2: string;
  item3: string;  
  item4: string; 
  item5: string; 
  item6: string; 

}

export interface Participant{
  'PUUID' : string;
  'participantName': string;
  'particpantTag': string;

  summonerSpell1ID: number;
  summonerSpell2ID: number; 
  summonerSpell1URL: string;
  summonerSpell2URL: string;

  summonerPrimaryRuneTypeURL: string;
  summonerKeyStoneID: number;
  summonerPrimaryPerk1ID : number;
  summonerPrimaryPerk2ID : number;
  summonerPrimaryPerk3ID : number;   
  summonerKeyStoneURL : string;
  summonerPrimaryPerk1URL : string;
  summonerPrimaryPerk2URL : string;
  summonerPrimaryPerk3URL : string;  

  summonerSecondaryRuneTypeURL: string;
  summonerSecondaryPerk1ID : number;
  summonerSecondaryPerk2ID : number;
  summonerSecondaryPerk1URL : string;
  summonerSecondaryPerk2URL : string;

  'kills':  number;
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
  'championPicSplash' : string;
  'items': ChampionItems;
  'win': boolean;
}

export interface MatchData{
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

export interface Matches{
    [key: string]: MatchData;
}

export interface MatchHistoryData{
    matches: Matches;
    totalKills: number;
    totalAssists: number;
    totalDeaths: number;
    totalWins: number;
    totalGames: number;
    empty: boolean;
}

interface MatchHistoryProps{
  id: string;
  region: string;
}

/**
 * 
 * @param id : string - the unique account identifier
 * 
 * This component will dictate layout of the content of the account page. 
 * Displays the user's match list along with statistics
 * Initial render: show first 5 matches. If no matches found, display a "No recent games"
 * Show more button that will show 5 more matches. 
 *  While fetching the data, disable the button and display spinner
 *  If no more matches available, hide the button. 
 *  
 * API calls returns no data or error => Error page
 */
function MatchHistory({id, region}: MatchHistoryProps) {
    const baseURL = 'http://127.0.0.1:5000'; 

    // Parameters to an API end point 
    const [start, setStart] = useState(0);
    // API endpoint of match list
    const [url, setURL] = useState('');
    // API endpoint for match list data
    // Array of matches
    const [matchList, setMatchList] = useState<Matches>({});
    // API get fetch for match list
    const {data, isPending, error} = useFetch<MatchHistoryData>(url);

    // using memo to see if the data fetched from the API call is different from previous re-render
    const memoData = useMemo( () => data, [JSON.stringify(data)])

    // Matchlist statistics based on the user
    const [wins, setWins] = useState(0)
    const [games, setGames] = useState(0);
    const [winRate, setWinRate] = useState(0);
    const [totalKills, setTotalKills] = useState(0);
    const [totalAssists, setTotalAssists] = useState(0);
    const [totalDeaths, setTotalDeaths] = useState(0);

    // Show more matches
    const handleClick = () => {
      setStart( prev => prev+5)
    }


    // show more button was clicked => update the matchlist
    useEffect( () => {                          
      setURL(() => `${baseURL}/api/matchlist/${region}/${id}/${start}/5`);
      },[start]);

    // Account changed => get the new matchlist and reset state variables
    useEffect( () => {
      setStart( () => {
        const newStart = 0;
        setURL( () => {
          const newURL = `${baseURL}/api/matchlist/${region}/${id}/${newStart}/5`
          setMatchList ( () => {
            return {};
            });
          setWins(0);
          setGames(0);
          setWinRate(0);
          setTotalKills(0);
          setTotalDeaths(0);
          setTotalAssists(0);

          return newURL;
          }
        )
        return newStart;
        }
      )
      },[id, region]);

      // if memoData is different, appending the memoData to the matchlist and update states accordingly
      useEffect( () => {
        if (memoData === null) return
        setMatchList ( prev => ({...prev, ...memoData.matches}));
        setTotalKills( prev => prev + memoData.totalKills);
        setTotalDeaths( prev => prev + memoData.totalDeaths);
        setTotalAssists( prev => prev + memoData.totalAssists);

        setWins( prev => prev + memoData.totalWins);
        setGames( prev => prev + memoData.totalGames);

      }, [memoData]);

      // change the win rate based on the games and wins 
      useEffect( () => {
        if (games > 0) {
          return setWinRate(wins/games);
        }
      }, [games, wins])

    return (
      <div className="match">
        {error && <ErrorPage message={`${error}`} sendHome={false}></ErrorPage>}
        {!error && !data && isPending && 
        <div className='pending-match-history'>
          <div className="spinner-border text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>

        </div>
      
        }
        {!error && data && games > 0 &&
         <div className = 'match-history-container'>
            <span className="match-history-header">
                Match History
            </span> 
            <div className = 'match-history-stats'>
              <div className="match-history-stats-content">
                <div className="match-history-section-1">
                  <WinRateChart percentage={winRate} circleWidth = {40} radius={15} strokeWidth={5}></WinRateChart>
                  <span className = 'match-history-section1-wins'>
                    {wins} <span style={{color: '#3776fc'}}>W</span> {games - wins} <span style={{color: '#f82b51'}}>L</span>
                  </span>
                  <span className = 'match-history-section1-WR'> 
                      {Math.round(winRate * 100)}% WR
                  </span>
                </div>
                <div className='match-history-section-2'>
                  <KDA k = {(totalKills/games).toFixed(1)} d = {(totalDeaths/games).toFixed(1)} a = {(totalAssists/games).toFixed(1)} size={'14px'}></KDA>
                  <div className='KDA'>
                      <strong className="match-history-section2-KDA"> 
                          {((totalKills + totalAssists)/totalDeaths).toFixed(2)}
                      </strong>
                      <span className ='match-history-section2-kda-letters'>
                          KDA
                      </span>
                  </div>
                </div>
                <div className='match-history-section-3'>
                    <RecentGames PUUID = {id} region = {region} matches = {matchList}/>
                </div>
              </div>
            </div>
          <div className='match-list'>
            <MatchList matches = {matchList} region = {region}>
            </MatchList>
          </div>
        </div>}
        {!error && data && games <= 0 && <NoRecentMatches></NoRecentMatches>}
        {!error && data && !data.empty && <div>
          <button type="button" 
              className = 'show-more-button'
              onClick = {handleClick}
              disabled = {isPending}> 
              {isPending ? <div className="spinner-border text-secondary" role="status"/> : <span> Show more</span>}
          </button>
        </div>}

      </div>
  )
}

export default MatchHistory;