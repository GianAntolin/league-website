import { useEffect } from 'react';
import '../css/HomeContent.css'

// Display home page content
function HomeContent() {
  useEffect( () => {
    document.title = 'Home'
  },[])
  return (
    <div className='home-content-top'>
      Welcome,
      <div className='sub-welcome'>
        <span className ='sub-welcome-message'>
          League of Legends statistics, match details, and rankings
        </span>
      </div>
    </div>
  )
}

export default HomeContent;
