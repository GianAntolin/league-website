import '../css/MatchOverviewHeader.css'


interface MatchOverviewHeaderProps{
    win: boolean;
}

/**
 * 
 * @param win : boolean dictates the background color of the component
 * 
 * Creates a table header
 */
function MatchOverviewHeader({win}:MatchOverviewHeaderProps) {
    return (
        <div className="match-overview-header">
            <div className="match-overview-header-victory">
                {win ? 
                <span className='match-overview-outcome' style = {{color: win ? '#3776fc' : '#f82b51'}}>
                    Victory
                </span>
                : 
                <span className='match-overview-outcome' style = {{color: win ? '#3776fc' : '#f82b51'}}>
                    Defeat
                </span>
                }
            </div>
            <div className='match-overview-header-KDA'>
                <span>
                    KDA
                </span>
            </div>
            <div className='match-overview-header-DMG'>
                Damage
            </div>
            <div className='match-overview-header-WARDS'>
                Wards
            </div>
            <div className='match-overview-header-CS'>
                CS
            </div>
            <div className='match-overview-header-ITEMS'>
                Items
            </div>
        </div>
    )
}

export default MatchOverviewHeader