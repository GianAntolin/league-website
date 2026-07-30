
import { LeaderboardsData } from '@/features/leaderboards/type';
import './LeaderboardsMain.css'

import LeaderboardsTopProfileCard from './components/LeaderboardsTopProfileCard';
import LeaderboardsProfileCard from '../shared/LeaderboardsProfileCard';
import LeaderboardsProfileCardHeader from '../shared/LeaderboardsProfileCardHeader';

interface LeaderboardsMainProps{
    data: LeaderboardsData;
}

/**
 * Represents the index element of the '/leaderboards' route
 * Renders the current leaderboards of the top 10 users by parsing through data passed by parent
 * This component dictates the layout for the content in leaderboards page
 * It will call other components to render the profile data of each user in the top 10 and style them accordingly
 * 
 * The top 3 users will get a special profile card positioned using a grid
 * followed by a table header then normal profile cards for the rest of the users 
 * Each user's name will be a link that'll navigate them to its account's match history
 */
function LeaderboardsMain( {data} : LeaderboardsMainProps ) {
    return (
        <div className='leaderboards-main'>
        {data && 
            <div className='leaderboards-main-profiles'>
                <div className='leaderboards-main-top3'>
                    <div className='leaderboards-main-rank1'>
                        { Object.entries(data.profiles).slice(0,1).map( ([rank, profile]) => (
                                <div className='leaderboards-main-rank1-2' key = {`${profile.name}#${profile.tag}`} >
                                    <LeaderboardsTopProfileCard 
                                        data = {profile} 
                                        tier = {data.tier} 
                                        rank = {rank}
                                        ></LeaderboardsTopProfileCard>
                                </div>
                        ))
                        }
                    </div>
                    <div className='leaderboards-main-rank2'>
                        { Object.entries(data.profiles).slice(1,2).map( ([rank, profile]) => (
                                <LeaderboardsTopProfileCard 
                                    key = {`${profile.name}#${profile.tag}`} 
                                    data = {profile} 
                                    tier = {data.tier} 
                                    rank = {rank}
                                    ></LeaderboardsTopProfileCard>
                        ))
                        }
                    </div>
                    <div className='leaderboards-main-rank3'>
                        { Object.entries(data.profiles).slice(2,3).map( ([rank, profile]) => (
                                <LeaderboardsTopProfileCard 
                                    key = {`${profile.name}#${profile.tag}`} 
                                    data = {profile} 
                                    tier = {data.tier} 
                                    rank = {rank}></LeaderboardsTopProfileCard>
                        ))
                        }
                    </div>
                </div>
                <div className='leaderboards-main-section-2'>
                    <LeaderboardsProfileCardHeader/>
                    { Object.entries(data.profiles).slice(3,10).map( ([rank, profile]) => (
                    <LeaderboardsProfileCard 
                        key = {`${profile.name}#${profile.tag}`} 
                        data = {profile} 
                        tier = {data.tier} 
                        rank = {rank}></LeaderboardsProfileCard>
                    ))
                    }

                </div>

            </div>
        }
        </div>
    )
}

export default LeaderboardsMain