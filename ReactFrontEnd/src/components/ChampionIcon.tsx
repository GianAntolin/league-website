import '../css/championIcon.css'

interface ChampionIconProps{
    url: string,
    level: number | null,
    height: string,
    width: string
  }

// Display an image with the number at the bottom left corner
function ChampionIcon({url, level, height, width} : ChampionIconProps) {
  return (
    <div className='champion-level-container'>
        <div className='championIcon-level'>
            <img src = {url} className="championIcon" style = {{height: `${height}`, width: `${width}`}}></img>
        </div>
        <div className='champ-level-box'>
            <span className='champ-level'>
                {level}
            </span>
        </div>
    </div>
  )
}

export default ChampionIcon;