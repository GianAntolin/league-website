import './AccountHeader.css'
import ProfileIcon from '../../../components/ProfileIcon';
import { BackgroundImgContext } from '../../../context/BackgroundImgContext';
import { useContext } from "react";
import { SummonerData } from '../type';

interface AccountContentProps{
  summoner: SummonerData;
}


//  Creates a profile icon with a border and the profile's level along with the profiles name
function AccountHeader({summoner} : AccountContentProps) {
  const name = summoner.name.toUpperCase();
  const tag = summoner.tag.toUpperCase();
  const {profileBackgroundImg} = useContext(BackgroundImgContext)
  return (
    <div className = 'account-header'
        style={{backgroundImage: `linear-gradient(to right,#070720, 20%, rgba(240, 240, 240, 0), 80%, #070720),
                                  linear-gradient(to top,#070720, 25%, rgba(240, 240, 240, 0), 90%, #070720),
                                  url(${profileBackgroundImg})`}}>

      <div className = 'account-header-icon-container'>
        <div className="account-header-icon-name-tag">
          <div className="account-header-icon-level">
            <ProfileIcon url = {summoner.icon} level = {summoner.level}/> 
          </div>
          <span className="name-tag">
            {name} #{tag}
          </span>
        </div>
      </div>
      <div className= 'name'>
      </div>
  </div>
  )
}

export default AccountHeader