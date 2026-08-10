import { NavLink } from 'react-router-dom'
import './MatchOverviewProfile.css'
import { Participant } from '@/features/account/type';
import SummonerSpell from '@/components/SummonerSpell';
import KDA from '@/components/KDA';
import WinRateBar from '@/components/WinRateBar';
import ItemList from '../../ItemList';



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
 * Display match statistics of the participant (champion icon, level, spells, items, etc)
 */
function MatchOverviewProfile({data, highestDmg, gameDurationM, gameDurationS, region}: MatchOverviewProfileProps) {

    const backgroundColor = data.win ? '#314b94' : '#6e4049'

    return (
        <div className='overview-profile-top'>
            <div className='champion-summoner-spells-overview'> 
                <div className='champion-level-overview'>
                    <img src = {data.championPic} height = {`36px`} width = {`36px`}></img>
                    <div className='level-box-overview'>
                        <span className='level-overview'>
                            {data.champLevel}
                        </span>
                    </div>
                </div>
                <div className = 'matchOverview-summoner-spells-runes'>
                    <div className='matchOverview-summoner-spell1' style={{gridArea: '1/1/2/2'}}>
                        <SummonerSpell url = {data.summonerSpell1URL} height = {`17px`} width = {`17px`}/>
                    </div>
                    <div className='matchOverview-summoner-spell2' style={{gridArea: '2/1/3/2'}}> 
                        <SummonerSpell url = {data.summonerSpell2URL} height = {`17px`} width = {`17px`}/>
                    </div>
                    <div className='matchOverview-rune1' style={{borderRadius: '3px', gridArea: '1/2/2/3', backgroundColor: '#191937'}}>
                        <img src={data.summonerKeyStoneURL} style={{height: '17px', width: '17px', display: 'flex'}} />
                    </div>
                    <div className='matchOverview-rune2'style={{borderRadius: '3px', gridArea: '2/2/3/3', backgroundColor: '#191937'}}>
                        <img src={data.summonerSecondaryRuneTypeURL} style={{height: '17px', width: '17px', display: 'flex', transform: 'scale(0.85)'}}/>
                    </div>
                </div>
            </div>
            <div className = 'overview-profile-name'>
                <NavLink to= {`/accounts/${region}/${data.participantName}/${data.particpantTag}`}> {data.participantName} </NavLink>
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
                    <span className='overview-vision'>
                        {data.visionScore}                                         
                    </span>
                    <img className='overview-vision-img' src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/svg/position-utility-light.svg"/>   
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
                <ItemList items = {data.items} color = {backgroundColor}></ItemList>
            </div>
        </div>
    )
}

export default MatchOverviewProfile