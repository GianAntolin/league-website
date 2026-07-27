import './ErrorLeaderboards.css'

interface ErrorLeaderboardsProps{
    message: string
}

function ErrorLeaderboards({message}: ErrorLeaderboardsProps) {
    return (
        <div className='message'>
            {message}
        </div>
    )
}

export default ErrorLeaderboards