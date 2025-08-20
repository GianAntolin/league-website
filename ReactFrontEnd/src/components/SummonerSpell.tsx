import '../css/SummonerSpell.css'

interface SummonerSpellProps{
    url: string;
    height: string;
    width: string;
}

/**
 * 
 * @param url - img url
 * 
 * Display the img using the height and width props. 
 */
function SummonerSpell({url, height, width}: SummonerSpellProps) {
  return (
    <div className='summoner-spell-container'>
        <img className='summoner-spell' src= {url} style = {{height: `${height}`, width: `${width}`}}></img>
    </div>
  )
}

export default SummonerSpell