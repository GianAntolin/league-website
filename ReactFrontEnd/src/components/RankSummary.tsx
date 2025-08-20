import '../css/RankSummary.css'

interface RankSummaryProps{
    tier: string;
    tierImg: string;
    rank: string;
    lp: number; 
    wins: number;
    losses: number;
    queueType: string;
}

function RankSummary({tier, tierImg, rank, lp, wins, losses, queueType} : RankSummaryProps ) {
    const unranked = tier === 'UNRANKED'
    const dontDisplayRank = tier === 'CHALLENGER' || tier === 'GRANDMASTER' || tier === 'MASTER'
    const winRate = Math.round(wins / (wins+losses) * 100)
    let winrateColor
    switch (true){
        case winRate >= 70:
            winrateColor = '#ff9b00';
            break;
        case winRate < 70 && winRate >= 60:
            winrateColor = '#3776fc';
            break;
        default:
            winrateColor = '#b8c6db';
            break;
    }
    return (
        <div className='rank-summary-overview'>
            <div className='rank-summary-header' style={{gridArea: unranked ? '1/1/3/3': '1/1/2/3'}}>
                <span className='rank-summary-queuetype'>
                    {queueType}
                </span>
                { unranked &&
                    <div className='unranked'>
                        <span>
                            Unranked
                        </span>
                    </div>
                }
            </div>
            { !unranked && 
                <div className='rank-summary-content'>
                    <img src = {tierImg}/>
                    <div className='rank-summary-content-1'>
                        <span className='rank-summary-content-tier'>
                            {tier} {dontDisplayRank ? '' : rank}
                        </span>
                        <div className='rank-summary-content-W-L'>
                            {wins} W {losses} L
                        </div>
                    </div>
                    <div className='rank-summary-content-2'>
                        <span className='rank-summary-content-lp'>
                             {lp} LP
                        </span>
                        <div className='rank-summary-content-WR' style={{color: winrateColor}}>
                           {winRate}% WR
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default RankSummary