import { useEffect } from 'react';
import './Home.css'

// Display home page content
function Home() {
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

export default Home;
