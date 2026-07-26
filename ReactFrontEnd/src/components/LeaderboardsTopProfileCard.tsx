import { NavLink } from 'react-router-dom'
import '../css/LeaderboardsTopProfileCard.css'
import ProfileIcon from './ProfileIcon'
import WinRateBar from './WinRateBar'
import { LeaderboardsProfile } from '../pages/Leaderboards'

interface LeaderboardsTopProfileCardProps{
  data: LeaderboardsProfile;
  tier: string;
  rank: string;
}

/**
 * 
 * @param data - {icon: string, PUUID: string, lp: number, wins: number, losses: number, level: number, name: string, tag: string}
 * Create a special display using data, tier, and rank along with win rate 
 * The user's name will be a link that'll navigate them to its account's match history
 */
function LeaderboardsTopProfileCard({data, tier, rank} : LeaderboardsTopProfileCardProps) {
  let color, borderColor, backGroundColor

  // Based on the rank, change the style of the component
  switch(rank){
    case '1':
       color = '#fbf5b7'
       borderColor = '#fbf5b7'
       backGroundColor = '#aa771c'
      break;
    case '2':
      color = '#f5f7fA'
      borderColor = '#f5f7fA'
      backGroundColor = '#b8c6db'
      break;
    case '3':
      color = '#db6c2b'
      borderColor = '#db6c2b'
      backGroundColor = '#673208'
      break;
    default: 
      color = '#c7c4bf'
      borderColor = '#c7c4bf'
      backGroundColor = '#5d6166'
  }

  const winrate = ((data.wins)/(data.wins+data.losses))* 100

  return (
    <div className='leaderboards-top-section' >
        <div className='leaderboards-top-profile'>
            <div className='box-rank' style={{color: color, backgroundColor: backGroundColor, borderColor: borderColor}}>
              {rank}
            </div>
        </div>
        <div className='leaderboards-top-profile-icon'>
          <ProfileIcon url = {data.icon} level ={data.level}/>
        </div>
        <div className='leaderboards-top-profile-stats'>
          <NavLink className = 'leaderboards-top-profile-name' to={`/accounts/${data.region}/${data.name}/${data.tag}`}> 
            {data.name.toUpperCase()}
          </NavLink>
          <div className='tier-lp-wr'>
            <div className='tier-lp'>
              <span className='leaderboards-top-profile-tier'>
                {tier}
              </span>
              <span className = 'tier-lp-wr-slash'> 
                &nbsp;/&nbsp;
              </span>
              <div className='leaderboards-top-profile-lp'>
                {data.lp} LP
              </div>
            </div>
            <div className='leaderboards-top-profile-wr-circle'>
              <WinRateBar percentage={winrate} barColor={'#f82b51'} fillColor={'#3776fc'}></WinRateBar>
            </div>
            <div className='wr-win-lose'>
              <div className='wr-text'>
                <span style={{fontSize: '12px'}}>
                  &nbsp;{winrate.toFixed(0)}%
                </span>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default LeaderboardsTopProfileCard