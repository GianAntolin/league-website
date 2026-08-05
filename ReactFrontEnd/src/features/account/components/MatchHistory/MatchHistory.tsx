import './MatchHistory.css'
import { useEffect, useState } from "react";



import MatchList from './components/MatchList/MatchList';
import NoRecentMatches from './components/NoRecentMatches';
import ErrorPage from '@/pages/Error/ErrorPage';
import WinRateArc from '@/components/WinRateArc';
import KDA from '@/components/KDA';
import { Matches, MatchHistoryData } from '../../type';
import RecentGames from './components/RecentGames/RecentGames';
import { useGetMatchHistory } from '../../api/fetchMatchHistory';



interface MatchHistoryProps {
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
function MatchHistory({ id, region }: MatchHistoryProps) {

  // Parameters to an API end point 
  const [start, setStart] = useState(0);
  // API endpoint for match list data
  // Array of matches
  const [matchList, setMatchList] = useState<Matches>({});
  // API get fetch for match list
  const { data, isLoading, isError, isPlaceholderData, error } = useGetMatchHistory<MatchHistoryData>({ region: region, PUUID: id, start: start, count: '5' })

  // Matchlist statistics based on the user
  const [wins, setWins] = useState(0)
  const [games, setGames] = useState(0);
  const [winRate, setWinRate] = useState(0);
  const [totalKills, setTotalKills] = useState(0);
  const [totalAssists, setTotalAssists] = useState(0);
  const [totalDeaths, setTotalDeaths] = useState(0);

  // Show more matches
  const handleClick = () => {
    setStart(prev => prev + 5)
  }

  // Account changed => get the new matchlist and reset state variables
  useEffect(() => {
    console.log('reset')
    setMatchList({})
    setWins(0);
    setGames(0);
    setWinRate(0);
    setTotalKills(0);
    setTotalDeaths(0);
    setTotalAssists(0);


  }, [id, region]);

// if memoData is different, appending the memoData to the matchlist and update states accordingly
useEffect(() => {
  if (data === undefined) return
  setMatchList(prev => ({ ...prev, ...data.matches }));
  setTotalKills(prev => prev + data.totalKills);
  setTotalDeaths(prev => prev + data.totalDeaths);
  setTotalAssists(prev => prev + data.totalAssists);

  setWins(prev => prev + data.totalWins);
  setGames(prev => prev + data.totalGames);

}, [data]);

// change the win rate based on the games and wins 
useEffect(() => {
  if (games > 0) {
    return setWinRate(wins / games);
  }
}, [games, wins])

if (isError) return <ErrorPage message={`${error}`} sendHome={false}></ErrorPage>

if (isLoading){
  console.log('isLoading:', isLoading)
  
  return (    
    <div className='pending-match-history'>
        <div className="spinner-border text-secondary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>

      </div>
  )
}

return (
  <div className="match">
    {data && games > 0 &&
      <div className='match-history-container'>
        <span className="match-history-header">
          Match History
        </span>
        <div className='match-history-stats'>
          <div className="match-history-stats-content">
            <div className="match-history-section-1">
              <WinRateArc percentage={winRate} size={80} strokeWidth={7.5} fontSize={12} wins={wins} loses={games - wins} />
            </div>
            <div className='match-history-section-2'>
              <KDA k={(totalKills / games).toFixed(1)} d={(totalDeaths / games).toFixed(1)} a={(totalAssists / games).toFixed(1)} size={'14px'}></KDA>
              <div className='KDA'>
                <strong className="match-history-section2-KDA">
                  {((totalKills + totalAssists) / totalDeaths).toFixed(2)}
                </strong>
                <span className='match-history-section2-kda-letters'>
                  KDA
                </span>
              </div>
            </div>
            <div className='match-history-section-3'>
              <RecentGames PUUID={id} region={region} matches={matchList} />
            </div>
          </div>
        </div>
        <div className='match-list'>
          <MatchList matches={matchList} region={region}>
          </MatchList>
        </div>
      </div>}
    {data && games <= 0 && <NoRecentMatches></NoRecentMatches>}
    {data && !data.empty && <div>
      <button type="button"
        className='show-more-button'
        onClick={handleClick}
        disabled={isPlaceholderData}>
        {isPlaceholderData ? <div className="spinner-border text-secondary" role="status" /> : <span> Show more</span>}
      </button>
    </div>}

  </div>
)
}

export default MatchHistory;