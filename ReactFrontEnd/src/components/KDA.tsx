import '../css/KDA.css'

interface KDAProps{
    k: number | string,
    d: number | string,
    a: number | string,
    size: string
}

// Creates a text that prints numbers or a string seperated by slashes: (number or string) / (number or string) / (number or string)
function KDA({k,d,a, size}:KDAProps) {
  return (
    <div className = 'KDA-totals-container'>
        <strong className = 'k' style={{fontSize: `${size}`}}> {k} </strong>
        <span className = 'slash' style={{fontSize: `${size}`}}> <strong> / </strong></span>
        <strong className = 'd' style={{fontSize: `${size}`}}> {d} </strong>
        <span className = 'slash' style={{fontSize: `${size}`}}> <strong> / </strong></span>
        <strong className = 'a' style={{fontSize: `${size}`}}> {a} </strong>
    </div>
  )
}

export default KDA