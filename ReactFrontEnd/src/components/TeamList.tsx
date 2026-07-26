import { NavLink } from "react-router-dom"
import { Participant } from "./MatchHistory"
import '../css/TeamList.css'

interface TeamListProps{
    data : Participant;
    region: string;
}

/**
 * 
 * @param data - object that represents the data of a participant 
 * 
 * Create a nav link using the participant's name and tag that'll path to the participant's match history
 */
function TeamList({data, region} : TeamListProps) {
    const navURL = `/accounts/${region}/${data.participantName}/${data.particpantTag}`    
    return (
        <div className='participant'>
            <div className="participantchampionIcon">
                <img src={data.championPic}></img>
            </div>
            <div className='participant-Name'>
                <NavLink to={navURL}> {data.participantName} </NavLink>
            </div>

        </div>
  )
}

export default TeamList