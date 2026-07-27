import './ChampionWithStats.css'
import { ChampionsRecentGamesData } from '../pages/Account/Account';



interface ChampionWithStatsProps{
    stats: ChampionsRecentGamesData;
}

// Display champion stats - win rate, wins, losses, kda, kills, deaths, assists - along with it's champion icon
function ChampionWithStats( {stats} : ChampionWithStatsProps) {
    const kda = parseFloat(((stats['kills'] + stats['assists'])/(stats['deaths'] ? stats['deaths'] : 1)).toFixed(2));
    const winrate = Math.round((stats['wins']/stats['games'])* 100);
    let winrateColor;
    let kdaColor;
    // Based on the kda, change the font color of the kda numbers
    switch (true){
        case kda >= 5:
            kdaColor = '#ff9b00';
            break;
        case kda < 5 && kda >= 3:
            kdaColor = '#3776fc';
            break;
        default:
            kdaColor = '#b8c6db';
            break;
    }
    switch (true){
        case winrate >= 70:
            winrateColor = '#ff9b00';
            break;
        case winrate < 70 && winrate >= 60:
            winrateColor = '#3776fc';
            break;
        default:
            winrateColor = '#b8c6db';
            break;
    }
        

    return (
        <div className='champion-stats-overview'>
                <img className = 'champion-stats-img'src = {stats['championPic']}/>
                <div className='champion-stats'>
                    <div className='champion-stats-kda'>
                        <strong style ={{color: kdaColor}}> 
                            {kda}
                        </strong>
                        <span className ='champion-stats-kda-letters'>
                            KDA
                        </span> 
                    </div>
                    <div>
                        <span className ='champion-stats-WR' style = {{color: winrateColor, fontWeight: "bolder"}}>
                            {winrate}%
                        </span> 
                        <span style={{color: 'gray', fontWeight: "bolder"}}>
                            &nbsp;| {stats['wins']}W {stats['games'] - stats['wins']}L
                        </span>
                    </div>
                </div>
        </div>
    )
    }

export default ChampionWithStats