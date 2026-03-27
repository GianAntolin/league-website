interface WinRateArcProps {
    percentage: number;
    size: number;
    strokeWidth: number;
    fontSize: number;
    wins: number; 
    loses: number;
}

// Display a progress half-circle arc that represents wins/(wins+loses) along with relevant text
function WinRateArc( {percentage, size, strokeWidth, fontSize, wins, loses} : WinRateArcProps) {
    const radius = (size - strokeWidth)/2;
    const winRate = Math.round(percentage * 100);
    const dashArray = Math.PI * radius;
    const dashArrayOffset = dashArray * (1-percentage);
    let winRateColor;

    switch (true){
        case winRate >= 70:
            winRateColor = '#ff9b00';
            break;
        case winRate < 70 && winRate >= 50:
            winRateColor = '#3776fc';
            break;
        default:
            winRateColor = '#b8c6db';
            break;
    }

    return (
        <svg className="win-rate-arc-svg"
            height = {size}
            width= {size}
            viewBox= {`0 0 ${size} ${size}`}
            >
            <path
                d = { `M ${strokeWidth/2}, ${((3 * size)/4)}
                        A ${radius}, ${radius} 0 0 1 ${size - (strokeWidth/2)}, ${((3 * size)/4)}`}
                fill = 'none'
                stroke = '#f82b51'
                strokeWidth= {strokeWidth}
            />
            <path
                className="progress-arc"
                d = { `M ${strokeWidth/2}, ${((3 * size)/4)}
                        A ${radius}, ${radius} 0 0 1 ${size - (strokeWidth/2)}, ${((3 * size)/4)}`}
                fill = 'none'
                stroke = '#3776fc'
                strokeWidth= {strokeWidth}
                strokeDasharray={dashArray}
                strokeDashoffset={dashArrayOffset}
                
            />

            <text 
                className="win-rate-arc-win-rate"
                x = {size/2} 
                y = {size/2}
                fontSize={fontSize}
                textAnchor='middle'
                >                    
                <tspan 
                    fill={`${winRateColor}`}
                    x = {size/2}
                    y = {((3 * size)/4) - (radius/2) - (strokeWidth/2) + fontSize}
                    >
                    {winRate}%
                </tspan>
                <tspan 
                    fill='grey'
                    x = {size/2}
                    y = {(3*size/4) + fontSize}
                    >
                    {wins}W - {loses}L
                </tspan>
                
            </text>
        </svg>
    )
}

export default WinRateArc