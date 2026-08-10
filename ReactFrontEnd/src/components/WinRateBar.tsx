import './WinRateBar.css'

interface WinRateBarProps{
    percentage: number;
    barColor: string;
    fillColor: string;
}
// Display a progress bar using the percentage prop as the fill (width %)
function WinRateBar({percentage, barColor, fillColor}: WinRateBarProps) {
    
    return (
        <div className='win-rate-bar' style={{backgroundColor: barColor}}>
            <div className='win-rate-bar-fill' style={{ width:`${percentage}%`, backgroundColor: fillColor}}>            
            </div>

        </div>
    )
}

export default WinRateBar