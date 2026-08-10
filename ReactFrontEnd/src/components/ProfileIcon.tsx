import './ProfileIcon.css'

interface ProfileIconProps{
  url: string;
  level: number;
}

/**
 * 
 * @param url - img url  
 * 
 * Display the profile icon with a border and level 
 */
function ProfileIcon({url, level} : ProfileIconProps) {
  return (
    <div className = 'profile-icon-overview'>
      <div className='profile-icon-border'>
        <img className = 'profile-icon' src = {url}></img>
      </div>
      <div className='profile-icon-level'>
        <div className='level'>
          <span> {level} </span>
        </div>
      </div>
    </div> 

  )
}

export default ProfileIcon
