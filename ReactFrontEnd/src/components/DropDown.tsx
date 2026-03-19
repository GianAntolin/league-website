import '../css/DropDown.css'
import { Regions } from '../pages/HomePage'

interface DropdownProps{
    options: Array<Regions>;
    handleSelected: (value: any) => void;
}

/**
 * 
 * @param options - represents an array of options that configure the list: 
 *                     value of each list,  
 *                     label of each list, 
 *                     color of each list
 * @param handleSelected - callback function 
 * Create a drop down list of strings for user inputs
*/
function DropDown( {options, handleSelected} : DropdownProps)  {

    return (
        <div className = 'Drop-down-top'>
            {options.length > 0 && 
                <ul>
                    {options.map( (item) => (
                        <li 
                            key = {item.value}
                            onClick = { () => {
                                handleSelected(item.value)
                            }}>
                            <span className='drop-down-list-label' style= {{backgroundColor: item.color}}>
                                {item.label}
                            </span>
                            <span className='drop-down-list-name'>
                                {item.name}
                            </span>

                        </li>
                    ))
                    }
                </ul>
            }
        </div>
    )
}

export default DropDown