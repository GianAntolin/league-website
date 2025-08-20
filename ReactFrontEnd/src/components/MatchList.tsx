import Match from "./Match"
import { Matches } from "./MatchHistory"

interface MatchesProp{
    matches: Matches;
    region: string;
}
/**
 * 
 * @param matches array of matches
 * 
 * Iterate through the array of matches and display each match
 */
function MatchList({matches, region}: MatchesProp) {

  return (
    <div className = 'match-list-overview' 
        style = {{width : '100%', 
                  height: '100%',
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  paddingTop: '12px',
                  paddingBottom: '12px',
                  paddingLeft:'12px',
                  paddingRight: '12px',
                  gap: '6px', 
                  borderStyle: 'solid',
                  borderWidth: '1px',
                  borderColor: '#424254'}}>
        {Object.values(matches).map( (match) => (
            <Match data = {match} region = {region} key = {match.matchID}/>
        ))} 
    </div>
  )
}

export default MatchList;