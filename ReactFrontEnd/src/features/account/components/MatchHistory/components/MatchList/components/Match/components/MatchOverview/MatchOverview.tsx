import './MatchOverview.css'

import { MatchData } from '@/features/account/type';
import MatchOverviewHeader from './components/MatchOverviewHeader';
import MatchOverviewProfile from './components/MatchOverviewProfile';


interface MatchOverviewProps{
    data: MatchData;
    region: string;
}

/**
 * 
 * @param data - Object that represents the match data
 * 
 * Display the match staticstics for all participants
 * Each participant will be grouped with respect to their team. 
 */
function MatchOverview({data, region}:MatchOverviewProps) {
    const team1start = parseInt(data.mainParticipant) < 5 ? 0 : 5;
    const team1end = team1start < 5 ? 5 : 10;
    const team2start = team1start < 5 ? 5 : 0;
    const team2end = team2start < 5 ? 5 : 10
    
    return (
        <div className = 'match-overview-top'>
            <div className='match-overview'>
                <div className='match-overview-section1'>
                    <MatchOverviewHeader win = {data.participants[team1start].win}></MatchOverviewHeader>
                </div>
                <div className='overview-team' style = {{backgroundColor: data.participants[team1start].win ? 'var(--victory)' : 'var(--defeat)'}}>
                    {
                    Object.values(data.participants).slice(team1start, team1end).map( (participant) => (
                            <MatchOverviewProfile 
                            data = {participant} 
                            highestDmg = {data.highestDmg} 
                            gameDurationM={data.gameDurationM} 
                            gameDurationS={data.gameDurationS}
                            region = {region}
                            key = {participant.PUUID}
                            />
                        ))
                    }
                </div>
                <div className='match-overview-section2'>
                    <MatchOverviewHeader win = {data.participants[team2start].win}></MatchOverviewHeader>
                </div>
                <div className='overview-team' style = {{backgroundColor: data.participants[team2start].win? 'var(--victory)' : 'var(--defeat)'}}>
                    {
                    Object.values(data.participants).slice(team2start, team2end).map( (participant) => (
                            <MatchOverviewProfile 
                            data = {participant} 
                            highestDmg = {data.highestDmg} 
                            gameDurationM={data.gameDurationM} 
                            gameDurationS={data.gameDurationS}
                            region = {region}
                            key = {participant.PUUID}
                            />
                        ))
                    }
                </div>
            </div>
            
        </div>
    )
}

export default MatchOverview