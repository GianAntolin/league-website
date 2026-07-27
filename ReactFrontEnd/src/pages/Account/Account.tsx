import './Account.css'
import { useParams } from 'react-router-dom';


import { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch.tsx';
import RankSummary from './components/RankSummary.tsx';
import MatchHistory from './components/MatchHistory/MatchHistory.tsx';
import ErrorPage from '../Error/ErrorPage.tsx';
import BackgroundImgContextProvider from '../../context/BackgroundImgContext.tsx';
import AccountHeader from './components/AccountHeader.tsx';

export interface SummonerData {

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

export interface ChampionsRecentGamesData {
  wins: number;
  games: number;
  kills: number;
  deaths: number;
  assists: number;
  championPic: string;
  championPicSplash: string;
}

export interface RecentGamesData {
  [key: string]: ChampionsRecentGamesData;
}

/**
 * Make an API call based on the url. 
 * Servers as the layout for the Account content
 */
function Account() {
  const { region, gameName, tagLine } = useParams<{ region: string, gameName: string, tagLine: string }>();

  const baseURL = 'http://127.0.0.1:5000';

  // Make an api call to check if the account exist
  const [url, setUrl] = useState('');
  const { data, isPending, error } = useFetch<SummonerData>(url);

  // If the params changed, make an API call
  useEffect(() => {
    const newUrl = `${baseURL}/api/accounts?region=${region}&name=${gameName}&tag=${tagLine}`
    setUrl(newUrl);
    document.title = `${gameName}#${tagLine}`
  }, [region, gameName, tagLine])

  return (
    <BackgroundImgContextProvider>
      <div className='account'>
        {data && !error &&
          <div className='account-content'>
            <div className='account-content-section-1-header'>
              <AccountHeader summoner={data} />
            </div>
            <div className='account-content-section-2'>
              <div className='account-content-section-2-ranks'>
                <div className='account-content-section-2-ranks-solo' style={{ height: data.rankSoloTier === 'UNRANKED' ? '50px' : '100px' }}>
                  <RankSummary tier={data.rankSoloTier} rank={data.rankSoloRank} lp={data.rankSoloLP}
                    wins={data.rankSoloWins} losses={data.rankSoloLosses} queueType={'Ranked Solo'} tierImg={data.rankSoloTierImg} />
                </div>
                <div className='account-content-section-2-ranks-flex' style={{ height: data.rankFlexTier === 'UNRANKED' ? '50px' : '100px' }}>
                  <RankSummary tier={data.rankFlexTier} rank={data.rankFlexRank} lp={data.rankFlexLP}
                    wins={data.rankFlexWins} losses={data.rankFlexLosses} queueType={'Ranked Flex'} tierImg={data.rankFlexTierImg} />
                </div>

              </div>
              <div className='account-content-section-2-match-history'>
                <MatchHistory id={data['PUUID']} region={data['region']} />
              </div>

            </div>
          </div>

        }
        {error && !isPending && <ErrorPage message={`${error}`} sendHome={false} />}
      </div>

    </BackgroundImgContextProvider>

  )
}

export default Account