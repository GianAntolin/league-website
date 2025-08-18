import { FormEvent, useState} from "react";
import { useNavigate } from 'react-router-dom';
import '../css/SearchBar.css';
import DropDown from "./DropDown";
import { Regions } from "../pages/HomePage";



interface SearchBarProps{
    regions: Array<Regions>,
    regionTags: Array<String>
}

/**
 * @param list - drop down option list
 * Create a search bar with a drop down option list
 */
function SearchBar( {regions ,regionTags} : SearchBarProps){
    // Keep tracks of the input of the search bar
    const [accountIdentifier, setaccountIdentifier] = useState('');
    const navigate = useNavigate();
    const [selected, setSelected] = useState(regions[0].value)
    const [toggleOptions, setToggleOptions] = useState(false)
    
    
    const handleSelected = (value : any) => {
        setSelected(value);
        setToggleOptions(false);
    }
    
    // Handles the submit and navigates to a url based on the input
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        let inputString = accountIdentifier;
        
        //Pattern to match 'game Name#tag'
        let pattern = /^[\s]*[\w\s]+#[\s]*[\w]+[\s]*$/g;
        let found = inputString.match(pattern);

        if (found){
            // Split the input
            let input = inputString.split('#');
            let gameName = input[0].trim();
            let tagLine = input[1].trim();
            // Use the input as parameters to a route path
            let url = '/account/' + selected + '/' + gameName + '/' + tagLine;

            navigate(url);
            
        } else{
            // Use the input as parameters to a route path
            let url = '/account/' + selected + '/' + inputString + '/' + selected;
            navigate(url);
        }
            
    };


    return (
        <div className="search-bar-top">
            <div className = 'search-bar-sections'>
                <div className="search-bar-section1">
                    <button
                        onClick={() => setToggleOptions(!toggleOptions)}
                    >
                        {regions[regionTags.indexOf(selected.toLocaleUpperCase())].label}
                    </button>
                    {toggleOptions && 
                        <div className = 'search-bar-drop-down'>
                            <DropDown options = {regions} handleSelected ={handleSelected}/>
                        </div>
                    }
                </div>
                <form className = 'form-search' onSubmit = {handleSubmit}>
                    <div className ='search'>
                        <input
                            className = 'search-bar' 
                            type = 'search' 
                            value = {accountIdentifier}
                            placeholder={`Game Name + #${selected}`}
                            onChange ={
                                (event) => {
                                    setaccountIdentifier(event.target.value)
                                }
                            }
                        >
                        </input>
                        <button
                            className="button-search"
                            onClick={handleSubmit}
                            disabled = {accountIdentifier.trim() === ''}
                        >
                            <span className="search-icon material-symbols-outlined">
                                search
                            </span>
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
};

export default SearchBar;