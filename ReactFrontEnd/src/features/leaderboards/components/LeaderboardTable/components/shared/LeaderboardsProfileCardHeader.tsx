import './LeaderboardsProfileCardHeader.css'


// Creates a table header for the profiles
function LeaderboardsProfileCardHeader() {
    return (
        <div className='leaderboards-profile-card-header-top'>
            <div className='leaderboards-profile-card-header-rank'>
                #
            </div>
            <div className='leaderboards-profile-card-header-name'>
                Name
            </div>
            <div className='leaderboards-profile-card-header-tier'>
                Tier
            </div>
            <div className='leaderboards-profile-card-header-lp'>
                LP
            </div>
            <div className='leaderboards-profile-card-header-wr'>
                Win Rate
            </div>
        </div>
    )
}

export default LeaderboardsProfileCardHeader