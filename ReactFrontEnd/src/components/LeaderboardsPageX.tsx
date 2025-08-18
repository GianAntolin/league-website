import '../css/LeaderboardsPageX.css'
import { LeaderboardsData } from '../pages/Leaderboards'
import LeaderboardsProfileCardHeader from './LeaderboardsProfileCardHeader'
import LeaderboardsProfileCard from './LeaderboardsProfileCard'


interface LeaderboardsPageXProps{
    data: LeaderboardsData
}

/**
 * Represents'/leaderboards/:pageNumber' route
 * Renders the current leaderboards of the ith ranked player to (i+9)th ranked player
 * Users displayed will be based on the parameter, page number, passed to the parent route
 * This component dictates the layout for the content in leaderboards page
 * It will call other components to render the profile data of each user and style them accordingly
 * 
 * Creates a table header for the profiles and normal profile cards for each profile
 * Each user's name will be a link that'll navigate them to its account's match history
 */
function LeaderboardsPageX({data} : LeaderboardsPageXProps) {
    return (
        <div>
            {data && <div className='leaderboards-page-x-top'>
                <LeaderboardsProfileCardHeader/>
                {Object.entries(data.profiles).map( ([rank, profile]) => (
                    <LeaderboardsProfileCard
                        key = {`${profile.name}#${profile.tag}`} 
                        data = {profile}
                        rank = {rank}
                        tier = {data.tier}
                        />

                ))}
            </div>}
        </div>
    )
}

export default LeaderboardsPageX