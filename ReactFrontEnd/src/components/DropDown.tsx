import '../css/DropDown.css'
import { Options } from '../pages/HomePage'

interface DropdownProps{
    options: Array<Options>;
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
                            <span className='drop-dow-list-label' style= {{backgroundColor: item.color}}>
                                {item.label}
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