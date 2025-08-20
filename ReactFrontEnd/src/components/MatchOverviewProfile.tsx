import { NavLink } from 'react-router-dom'
import '../css/MatchOverviewProfile.css'
import ItemList from './ItemList'
import KDA from './KDA'
import { Participant } from './MatchHistory'
import SummonerSpell from './SummonerSpell'
import WinRateBar from './WinRateBar'

interface MatchOverviewProfileProps{
    data: Participant;
    highestDmg: number;
    gameDurationM: number;
    gameDurationS: number;
    region: string;
}

/**
 * 
 * @param data - Object that represents the match statistic of a single participant
 * 
 * Display match statistics of the participant (champion icon; level, spells, items, etc)
 */
function MatchOverviewProfile({data, highestDmg, gameDurationM, gameDurationS, region}: MatchOverviewProfileProps) {

    return (
        <div className='overview-profile-top' style = {{backgroundColor: data.win ? 'var(--victory)' : 'var(--defeat)'}}>
            <div className='champion-summoner-spells-overview'> 
                <div className='champion-level-overview'>
                    <img src = {data.championPic} height = {`36px`} width = {`36px`}></img>
                    <div className='level-box-overview'>
                        <span className='level-overview'>
                            {data.champLevel}
                        </span>
                    </div>
                </div>
                <div className='summoner-spells-overview'>
                    <SummonerSpell url = {data.summonerSpell1} height = {`18px`} width = {`18px`}/>
                    <SummonerSpell url = {data.summonerSpell2} height = {`18px`} width = {`18px`}/>
                </div>
            </div>
            <div className = 'overview-profile-name'>
                <NavLink to= {`/account/${region}/${data.participantName}/${data.particpantTag}`}> {data.participantName} </NavLink>
            </div>
            <div className='overview-profile-kda'>
                <KDA k={data.kills} d={data.deaths} a = {data.assists} size={'11px'}></KDA>
                <div>
                    <strong style={{fontSize: '11px'}}> 
                        {data.kda}
                    </strong>
                    <span className ='overview-profile-kda-letters'>
                        KDA
                    </span>
                </div>
            </div>
            <div className='overview-profile-dmg'>
                {data.totalDmgToChamps}
                <div className= 'overview-profile-dmg-bar'>
                    <WinRateBar percentage={(data.totalDmgToChamps/highestDmg)*100} barColor = {'#11112a99'} fillColor={'#f82b51'}></WinRateBar>

                </div>
            </div>
                <div className ='overview-vision-top'>
                    <div className='overview-vision'>
                        {data.visionScore}   
                    </div>
                </div>
            <div className ='overview-cs-top'>
                <div className='overview-cs'>
                    {data.cs}
                </div>
                <div className='overview-cs-min'>
                    {(data.cs / (gameDurationM + (gameDurationS / 60))).toFixed(1)}/m
                </div>
            </div>
            <div className='overview-item-list'>
                <ItemList items = {data.items} win = {data.win}></ItemList>
            </div>
        </div>
    )
}

export default MatchOverviewProfile