import {useEffect, useMemo } from 'react';
import './RecentGames.css'
import useFetch from '@/hooks/useFetch';
import { Matches, RecentGamesData } from '@/features/account/type';
import ChampionWithStats from './components/ChampionWithStats';
import { useBackGroundImg } from '@/context/BackgroundImgContext';


interface RecentGamesProps{
    PUUID: string;
    region: string;
    matches: Matches;
}

function RecentGames({PUUID, region, matches} : RecentGamesProps) {
    const baseURL = 'http://127.0.0.1:5000'; 
    const matchList = Object.values(matches);
    const start = matchList[matchList.length - 1]['gameEndTimestampUnix']
    const end = matchList[0]['gameEndTimestampUnix']
    // API call to fetch recent games data
    const {data, isPending, error} = useFetch<RecentGamesData>(`${baseURL}/api/${region}/${PUUID}/${start}/${end}`)
    const {setProfileBackgroundImg} = useBackGroundImg()
    const memoData = useMemo ( () => data, [JSON.stringify(data)])
    useEffect( () => {
        if (data) {
            const first = Object.keys(data)[0]
            setProfileBackgroundImg(data[first]['championPicSplash'])
        }
    }, [memoData])
    return (
        <div className='recent-games-overview'>
            {
                data && 
                <div className='recent-games-champions'>
                    {Object.entries(data).map( ([name, stats]) =>
                        <div className='recent-games-champion-stats' key = {name}>
                            <ChampionWithStats stats = {stats}/>
                        </div>
                    )}
                </div>
            }

            {
                isPending && !error && !data && 
                <div className='recent-games-match-history'>
                    <div className="spinner-border text-secondary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>

                </div>
            }
        </div>  
    )
}

export default RecentGames