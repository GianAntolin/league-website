import './Account.css'
import { useParams } from 'react-router-dom';


import { useEffect } from 'react';
import BackgroundImgContextProvider from '@/context/BackgroundImgContext';
import AccountHeader from '@/features/account/components/AccountHeader';
import RankSummary from '@/features/account/components/RankSummary';
import MatchHistory from '@/features/account/components/MatchHistory/MatchHistory';
import ErrorPage from './Error/ErrorPage';
import { useGetAccount } from '@/features/account/api/fetchAccount';



/**
 * Make an API call based on the path. 
 * Servers as the layout for the Account content
 */
function Account() {
  const { region, gameName, tagLine } = useParams<{ region: string, gameName: string, tagLine: string }>();

  // Make an api call to check if the account exist
  const { data, isLoading, isError, error } = useGetAccount({ region: region, name: gameName, tag: tagLine });

  useEffect(() => {
    document.title = `${gameName}#${tagLine}`
  }, [region, gameName, tagLine])

  return (
    <BackgroundImgContextProvider>
      <div className='account'>
        {data && !isError &&
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
        {isError && !isLoading && <ErrorPage message={`HTTP ${error.status}: ${error.response?.data?.message}`} sendHome={false} />}
      </div>

    </BackgroundImgContextProvider>

  )
}

export default Account