import Item from '@/components/Item';
import './ItemList.css'
import { ChampionItems } from '@/features/account/type';

interface ItemListProps{
    items: ChampionItems;
    color: string;
}

/**
 * @param {items} - Array of strings that represents the url of an img
 * Iterates through an array of string and creates Item components 
 */
function ItemList({items, color}:ItemListProps) {
  return (
    <div className='item-list'>
      <div className='item-list-1'>
        {
        Object.entries(items).slice(0,3).map( ([key, value]) => (
            <div key = {key} style = {{backgroundColor: color}}>
                <Item url = {value}></Item>
            </div>
        ))}
      </div>
      <div className='item-list-2'>
        {
        Object.entries(items).slice(3,6).map( ([key, value]) => (
            <div key = {key} style = {{backgroundColor: color}}>
                <Item url = {value}></Item>
            </div>
        ))}
      </div>
      <div className='item-list-3'>
        {
        Object.entries(items).slice(6,7).map( ([key, value]) => (
            <div key = {key} style = {{backgroundColor: color}}>
                <Item url = {value}></Item>
            </div>
        ))}
      </div>
    </div>
  )
}

export default ItemList