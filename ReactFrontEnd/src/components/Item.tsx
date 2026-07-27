import './Item.css'


interface ItemProps{
    url: string;
}

// Create an img element using the url as a source. If no source is found, return an empty div. 
function Item({url} : ItemProps){
    if (url.length === 0 || url === null) {
        return (
            <div className = 'item'>
            </div>
        )       
    } else{

        return(
            <img className = 'item' src={url}/>
        )
    }   
}

export default Item;