import '../css/WinRateChart.css'

interface WinRateChartProps{
    radius: number;
    percentage: number;
    circleWidth: number;
    strokeWidth: number;
}

// Display a circular progress bar using the percentage as the fill (dashOffset)
function WinRateChart( {percentage, radius, circleWidth, strokeWidth} : WinRateChartProps ) {
    const dashArray = 2 * Math.PI * radius;
    const dashOffset= dashArray * (1-percentage);
    
    return (
        <div className = 'win-rate-chart'>
            <svg className='win-rate-svg' 
                viewBox={`0 0 ${circleWidth} ${circleWidth}`}
                height = {circleWidth}
                width = {circleWidth}
                >
                <circle className='win-rate-circle' 
                    strokeWidth= {strokeWidth} 
                    cx = {circleWidth/2} 
                    cy = {circleWidth/2} 
                    r = {radius}
                />
                <circle className='win-rate-fill' 
                    strokeWidth={strokeWidth}
                    cx = {circleWidth/2} 
                    cy = {circleWidth/2} 
                    r = {radius}
                    style ={
                        {
                            strokeDasharray: dashArray,
                            strokeDashoffset: dashOffset
                        }
                    }
                    transform={`rotate(-90 ${circleWidth/2} ${circleWidth/2})`}
                />
                    
            </svg>
        </div>
    )
}

export default WinRateChart