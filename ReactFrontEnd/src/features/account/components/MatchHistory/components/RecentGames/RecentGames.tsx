import { useEffect, useMemo } from 'react';
import './RecentGames.css'
import { Matches, RecentGamesData } from '@/features/account/type';
import ChampionWithStats from './components/ChampionWithStats';
import { useBackGroundImg } from '@/context/BackgroundImgContext';
import { useGetRecentGames } from '@/features/account/api/fetchRecentGames';


interface RecentGamesProps {
    PUUID: string;
    region: string;
    matches: Matches;
}

function RecentGames({ PUUID, region, matches }: RecentGamesProps) {
    const matchList = Object.values(matches);
    const start = matchList[matchList.length - 1]['gameEndTimestampUnix']
    const end = matchList[0]['gameEndTimestampUnix']
    // API call to fetch recent games data
    const { data } = useGetRecentGames<RecentGamesData>({ id: PUUID, region: region, start: start, end: end })
    const { setProfileBackgroundImg } = useBackGroundImg()
    const memoData = useMemo(() => data, [JSON.stringify(data)])
    useEffect(() => {
        if (data) {
            const first = Object.keys(data)[0]
            setProfileBackgroundImg(data[first]['championPicSplash'])
        }
    }, [memoData])
    return (
        <div className='recent-games-overview'>
            {data &&
                <div className='recent-games-champions' >
                    {Object.entries(data).map(([name, stats]) =>
                        <div data-testid='recent-games-champions'
                            className='recent-games-champion-stats'
                            key={name}>
                            <ChampionWithStats stats={stats} />
                        </div>
                    )}
                </div>
            }
        </div>
    )
}

export default RecentGames