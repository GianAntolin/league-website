import { FormEvent, useState} from "react";
import { useNavigate, NavLink } from 'react-router-dom';
import '../css/SearchBar.css';
import DropDown from "./DropDown";
import { Regions } from "../pages/HomePage";
import useFetch from "../hooks/useFetch";


interface SearchBarProps{
    regions: Array<Regions>;
    regionTags: Array<String>;
}

interface UserSearchSuggestions{
    name: string; 
    tag: string;
    icon: string;
    region: string;
}

type SearchSuggestions = UserSearchSuggestions[];




/**
 * @param list - drop down option list
 * Autocomplete search bar with a toggelable drop down list 
 */
function SearchBar( {regions ,regionTags} : SearchBarProps){
    const baseURL = 'http://127.0.0.1:5000/api/search'; 

    // Keep tracks of the input of the search bar
    const [accountIdentifier, setaccountIdentifier] = useState('');
    const navigate = useNavigate();
    const [selected, setSelected] = useState(regions[0].value);
    const [toggleOptions, setToggleOptions] = useState(false);
    // Regular Expression for gameName#tag
    const pattern = /[\s]*[\w\s]+#[\s]*[\w]+[\s]*/g;
    // Abort Controller for HTTPS request for account suggestions
    const [url,setUrl] = useState<string>(''); 
    const {data, isPending, error} = useFetch<SearchSuggestions>(url)

    const handleSelected = (value : any) => {
        setSelected(value);
        setToggleOptions(false);
    }

    // When the input changes, set the accountIdentifier to new value and make an API call to get account suggestions
    const handleOnChange = async (event: React.ChangeEvent<HTMLInputElement>) =>{
        setaccountIdentifier(event.target.value)

        // Use the most updated value
        let inputString = event.target.value;
         //match to 'gameName#tag' pattern
        let found = inputString.match(pattern);
        
        console.log('on change: ', event.target.value)

         if (found){
            // Split the input
            let input = inputString.split('#');
            console.log('found: ', input);
            let gameName = input[0].trim();
            let tagLine = input[1].trim();
            // Use the input as search query parameters for API calls
            setUrl( baseURL +'?region=' + selected + '&name=' + gameName + '&tag=' + tagLine);

            
        } else{
            // Split the input
            let input = inputString.split('#');
            let gameName = input[0].trim();
            let tag = input.length > 1 ? input[1].trim() : '';
            // Use the input as search query parameters for API calls
            setUrl( baseURL +'?region=' + selected + '&name=' + gameName + '&tag=' + tag);

        }

    }
    
    // Handles the submit and navigates to a url based on the input
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        let inputString = accountIdentifier;
        // match to 'gameName#tag' pattern
        let found = inputString.match(pattern);
        console.log('submit:', found)
        if (found){
            // Split the input
            let input = inputString.split('#');
            console.log('submit:', input)
            let gameName = input[0].trim();
            let tagLine = input[1].trim();
            // Use the input as parameters to a route path
            let url = '/account/' + selected + '/' + gameName + '/' + tagLine;
            navigate(url);
            
        } else{
            // Use the input as parameters to a route path
            let input = inputString.split('#');
            let gameName = input[0].trim();
            // If a tag is not provided, set a default value
            let tag = input.length > 1 ? input[1].trim() : selected;
            let url = '/account/' + selected + '/' + gameName + '/' + tag;

            navigate(url);
        }
            
    };

    return (
        <div className="search-bar-top">
            <div className = 'search-bar-region'>
                <div className = 'search-bar-sections' 
                    style ={{
                        borderRadius: toggleOptions ? '.25rem .25rem 0 0' : '.25rem',
                        borderTop: toggleOptions ? '1px solid rgb(170, 119, 28)' : '0',
                        borderRight: toggleOptions ? '1px solid rgb(170, 119, 28)' : '0',
                        borderLeft: toggleOptions ? '1px solid rgb(170, 119, 28)' : '0'
                    }}>
                    <div className="search-bar-section1">
                        <button
                            onClick={() => setToggleOptions(!toggleOptions)}
                        >
                            {regions[regionTags.indexOf(selected.toLocaleUpperCase())].label}
                        </button>
                    </div>
                    <form className = 'form-search' onSubmit = {handleSubmit}>
                        <div className ='search'>
                            <input
                                className = 'search-bar' 
                                type = 'search' 
                                value = {accountIdentifier}
                                placeholder={`Game Name + #${selected}`}
                                onChange ={handleOnChange}
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
            {toggleOptions && 
                <div className = 'search-bar-drop-down'>
                    <div className="search-bar-drop-down-top">
                        <div className='search-bar-drop-down-header'>
                            Regions
                        </div>
                        <DropDown options = {regions} handleSelected ={handleSelected}/>
                    </div>
                </div>
            }

            {!toggleOptions && data && 
                <div className='search-bar-drop-down'>
                    <div className="search-bar-drop-down-top">
                        <div className="search-bar-drop-down-header">
                            Profiles
                        </div>
                        <div className="search-bar-suggestions">
                            <ul>
                                {data.map( user => (
                                    <NavLink key={`${user.name}#${user.tag}`} to = {`/account/${user.region}/${user.name}/${user.tag}`}>
                                        <li>  
                                            <img src = {user.icon}/>
                                                <span className='search-bar-suggestions-name'>
                                                    {user.name}&nbsp;
                                                </span>
                                                <span className='search-bar-suggestions-tag'>
                                                    #{user.tag}
                                                </span>

                                        </li>
                                    </NavLink>
                                    ))
                                }

                            </ul>

                        </div>
                        
                    </div>
                </div>
            }
            
        </div>
    )
};

export default SearchBar;