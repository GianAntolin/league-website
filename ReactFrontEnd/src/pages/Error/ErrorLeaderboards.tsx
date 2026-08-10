import { useEffect } from 'react'
import './ErrorLeaderboards.css'

interface ErrorLeaderboardsProps{
    message: string
}

function ErrorLeaderboards({message}: ErrorLeaderboardsProps) {
    useEffect( () => {
        document.title = 'Error'
      },[])
    return (
        <div className='message' data-testid='error-leaderboards-message'>
            {message}
        </div>
    )
}

export default ErrorLeaderboards