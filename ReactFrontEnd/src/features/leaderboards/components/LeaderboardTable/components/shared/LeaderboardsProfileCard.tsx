import './LeaderboardsProfileCard.css'
import { NavLink } from 'react-router-dom'
import { LeaderboardsProfile } from '@/features/leaderboards/type';
import WinRateBar from '@/components/WinRateBar';

interface LeaderboardsProfileCardProps{
  data: LeaderboardsProfile;
  tier: string;
  rank: string;
}
/**
 * 
 * @param data - {icon: string, PUUID: string, lp: number, wins: number, losses: number, level: number, name: string, tag: string}
 * Create a display using data, tier, and rank along with a progress bar that represents the win rate
 * The user's name will be a link that'll navigate them to its account's match history
 */
function LeaderboardsProfileCard({data, tier, rank}:LeaderboardsProfileCardProps) {
    const winrate = ((data.wins)/(data.wins+data.losses))* 100

    return (
        <div>
            {data && <div className='leaderboards-profile'>
                <div className='leaderboards-profile-rank'>
                    {rank}
                </div>
                <div className='leaderboards-profile-name-icon'>
                    <div className='leaderboards-profile-icon'>
                        <img className= 'leaderboards-profile-icon-img' src={data.icon}/>
                    </div>
                    <div className='leaderboards-profile-name'>
                        <NavLink to={`/accounts/${data.region}/${data.name}/${data.tag}`}>
                            {data.name.toUpperCase()} 
                            
                        </NavLink> 

                    </div>
                </div>
                <div className='leaderboards-profile-tier'>
                    <span>
                        {tier}
                    </span>
                </div>
                <div className='leaderboards-profile-lp'>
                    {data.lp}
                </div>
                <div className='leaderboards-profile-winrate-bar'>
                    <div className='leaderboards-profile-winrate'>
                        {winrate.toFixed(0)}%
                    </div>
                    <div className='leaderboards-profile-bar'>
                        <WinRateBar percentage={winrate} barColor={'#f82b51'} fillColor={'#3776fc'}></WinRateBar>
                    </div>
                </div>
            </div>}

        </div>
    )
}

export default LeaderboardsProfileCard