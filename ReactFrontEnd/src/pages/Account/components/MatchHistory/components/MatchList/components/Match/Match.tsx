import './Match.css'


import { useState } from 'react'
import { MatchData } from '../../../../MatchHistory'
import ChampionIcon from '../../../../../../../../components/ChampionIcon';
import SummonerSpell from '../../../../../../../../components/SummonerSpell';
import KDA from '../../../../../../../../components/KDA';
import ItemList from '../../../../../../../../components/ItemList';
import TeamList from '../../../../../../../../components/TeamList';
import MatchOverview from './components/MatchOverview/MatchOverview';

interface MatchProps{
    data: MatchData;
    region: string;
}

/**
 * 
 * @param data Object that represents the match data 
 * 
 * Serves as the layout for the displaying match details and statistics
 * Display the match outcome (with respect to the current account), elapsed in-game time, game mode, and date of game. 
 * Background color of the component will be based on the match outcome with respect to the current account.
 * Display the match statistics of the current account (champion icon, level, spells, items, etc)
 * Display all participants' name and icon
 * Each participants' name will redirect them to their account page. 
 * 
 * A button will toggle a drop down content that will display match detials for all participants
 * Each participants' name will again redirect them to their account page. 
 */
function Match({data, region}: MatchProps) {
    const mainTarget = data.participants[data.mainParticipant as keyof typeof data.participants];
    // Match is voided if the game duration is less than or equal to 3 minutes
    const remake = data.gameDurationM  <= 3;
    
    // Maintains the visibility status of a dropdown menu
    const [toggle, setToggle] = useState(false);

    let seconds = data.gameDurationS < 10 ? `0${data.gameDurationS}`: data.gameDurationS;
     
    const handleClick = () => {
        setToggle(!toggle)
    };

    let kdaColor;
    switch (true){
        case mainTarget.kda >= 5:
            kdaColor = '#ff9b00';
            break;
        case mainTarget.kda < 5 && mainTarget.kda >= 3:
            kdaColor = '#3776fc';
            break;
        default:
            kdaColor = '#b8c6db';
            break;
    };

    return (
        <div className='match-top-level'>
            <div className='match-details' style = {{background: remake ? 'linear-gradient(90deg, rgb(58, 58, 59), 10%, rgb(71, 71, 78))' : data.win ? 'linear-gradient(90deg, rgb(38, 56, 169), 10%, rgba(40, 52, 78, 1))' : 'linear-gradient(90deg, rgb(141, 42, 60), 10%, rgba(89, 52, 59, 1))'}}>
                <div className='date-outcome-container'>
                    <div className ='queue-date'>
                        <span className='match-queue'>  
                            {data.queueType.toUpperCase()} 
                        </span>
                        <span className='date-outcome-cointer-slash'>
                            |
                        </span>
                        <span className='date'>
                            {data.gameEndTimestamp}
                        </span>
                        <span className='date-outcome-cointer-slash'>
                            |
                        </span>
                        <span className='game-duration'>
                            {data.gameDurationM}:{seconds}
                        </span>
                    </div>
                    <div className = 'outcome'>
                        {remake ? 'REMAKE' : mainTarget.win ? 
                        'VICTORY' : 'DEFEAT'}
        
                    </div>
                </div>  
                <div className='match-display'>
                    <div className='match-display-section1'>
                        <div className='champion-summoner-spells'> 
                            <ChampionIcon url = {mainTarget.championPic} level = {mainTarget.champLevel} height = {`50px`} width = {`50px`}></ChampionIcon>
                            <div className = 'match-summoner-spells-runes'>
                                <div className='match-summoner-spell1' style={{gridArea: '1/1/2/2'}}>
                                    <SummonerSpell url = {mainTarget.summonerSpell1URL} height = {`24px`} width = {`24px`}/>
                                </div>
                                <div className='match-summoner-spell2' style={{gridArea: '2/1/3/2'}}> 
                                    <SummonerSpell url = {mainTarget.summonerSpell2URL} height = {`24px`} width = {`24px`}/>
                                </div>
                                <div className='match-rune1' style={{borderRadius: '3px', gridArea: '1/2/2/3', backgroundColor: mainTarget.win ? '#223b80': '#59343b'}}>
                                    <img src={mainTarget.summonerKeyStoneURL} style={{height: '24px', width: '24px'}} />
                                </div>
                                <div className='match-rune2'style={{borderRadius: '3px', gridArea: '2/2/3/3', backgroundColor: mainTarget.win ? '#223b80': '#59343b'}}>
                                    <img src={mainTarget.summonerSecondaryRuneTypeURL} style={{height: '24px', width: '24px', transform: 'scale(0.85)'}}/>
                                </div>
                            </div>
                        </div>
                        <div className = 'stat-container'>
                            <KDA k = {mainTarget.kills} d = {mainTarget.deaths} a = {mainTarget.assists} size={'14px'}></KDA>
                            <div className='KDA' style={{color: kdaColor}}>
                                <strong> 
                                    {mainTarget.kda}
                                </strong>
                                <span className ='kda-letters'>
                                    KDA
                                </span>
                            </div>
                            <div className = 'cs'> 
                                {mainTarget.cs}
                                <span className = 'cs-perM'>
                                    ({(mainTarget.cs / ( data.gameDurationM + (data.gameDurationS / 60))).toFixed(1)})
                                </span>
                            </div>

                        </div>

                        <div className='match-wards'>
                            <div className='match-wards-display'>
                                <div className='match-wards-hover'>
                                    Wards Placed (Control Wards Placed) / Wards Killed
                                </div>
                                <div className='match-wards-ui'>
                                    <span className = 'match-wards-text'>
                                            {mainTarget.totalWards} ({mainTarget.visionWards}) / {mainTarget.wardsKilled}
                                    </span>
                                    <img className= 'match-wards-img' src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/svg/position-utility-light.svg"/>   

                                </div>  
                                
                            </div>
                        </div>

                        <div className = 'item-list-container'>
                            <ItemList items={mainTarget.items} win = {mainTarget.win}></ItemList>
                        </div>
                        
                    </div>

                    <div className='match-display-section2'>
                        <div className= "team-list-overall">
                            <div className= 'team-list'>
                                {
                                    Object.values(data.participants).slice(0,5).map( (participant) => (
                                        <TeamList data = {participant} region = {region} key = {participant.PUUID}/>
                                    ))
                                }
                            </div>
                            <div className= 'team-list'>
                                {
                                    Object.values(data.participants).slice(5,10).map( (participant) => (
                                        <TeamList data = {participant} region = {region} key = {participant.PUUID}/>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className='match-display-section3'>
                        <div className = 'drop-down'>
                            <div className='ToggleButton-container'>
                                <button className = 'toggle-button' onClick={handleClick}> 
                                    <svg className = 'toggle-button-img' width = '18' height='11' viewBox="0 0 18 11" style ={{transform: toggle ? 'rotate(0.5turn)' : ''}}>
                                        <path fill='none' stroke="#ff9b00" strokeWidth="4" d="M1 1l8 8 8-8"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        {toggle && 
            <div className='match-dropdown'>
                <MatchOverview data = {data} region = {region}></MatchOverview>
            </div>
        }
        </div>
    )
}

export default Match