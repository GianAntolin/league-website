import './ErrorLeaderboards.css'

interface ErrorLeaderboardsProps{
    message: string
}

function ErrorLeaderboards({message}: ErrorLeaderboardsProps) {
    return (
        <div className='message' data-testid='error-leaderboards-message'>
            {message}
        </div>
    )
}

export default ErrorLeaderboards