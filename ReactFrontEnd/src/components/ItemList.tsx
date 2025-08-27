import '../css/ItemList.css'
import Item from './Item'
import { ChampionItems } from './MatchHistory'

interface ItemListProps{
    items: ChampionItems;
    win: boolean;
}

/**
 * @param {items} - Array of strings that represents the url of an img
 * Iterates through an array of string and creates Item components 
 */
function ItemList({items, win}:ItemListProps) {
  return (
    <div className='item-list'>
      <div className='item-list-1'>
        {
        Object.entries(items).slice(0,3).map( ([key, value]) => (
            <div key = {key} style = {{backgroundColor: win ? '#314b94' : '#6e4049'}}>
                <Item url = {value}></Item>
            </div>
        ))}
      </div>
      <div className='item-list-2'>
        {
        Object.entries(items).slice(3,6).map( ([key, value]) => (
            <div key = {key} style = {{backgroundColor: win ? '#314b94' : '#6e4049'}}>
                <Item url = {value}></Item>
            </div>
        ))}
      </div>
      <div className='item-list-3'>
        {
        Object.entries(items).slice(6,7).map( ([key, value]) => (
            <div key = {key} style = {{backgroundColor: win ? '#314b94' : '#6e4049'}}>
                <Item url = {value}></Item>
            </div>
        ))}
      </div>
    </div>
  )
}

export default ItemList