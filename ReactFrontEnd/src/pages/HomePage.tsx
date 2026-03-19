import { Outlet, NavLink } from "react-router-dom";

import SearchBar from "../components/SearchBar";

import '../css/HomePage.css';
import 'bootstrap/dist/css/bootstrap.min.css';


export interface Regions{
    value: string;
    label: string;
    color: string;
    name: string;
}

export interface RegionsData{
    regions: Array<Regions>;
    regionTags: Array<String>;
}


/**
 * Serves as the layout for the web browser. 
 * Dictates the outlet of children routes: /leaderboards, /account
 */
function HomePage(){    
    const regionTags = ['NA1', 'LA1', 'LA2', 'BR1', 'EUW1', 'EUN1', 'ME1', 'RU', 'TR1', 'JP1', 'KR', 'SG2', 'TW2', 'VN2', 'OC1']
    const regions = [ {value: 'NA1', label: 'NA', color: '#86858e', name: 'North America'}, 
                      {value: 'LA1', label: 'LAN', color: '#608806', name: 'Latin America North'}, 
                      {value: 'LA2', label: 'LAS', color: '#D16BA5', name: 'Latin America South'}, 
                      {value: 'BR1', label: 'BR', color: '#86A8E7', name: 'Brazil'}, 
                      {value: 'EUW1', label: 'EUW', color: '#09736c', name: 'Europe West'}, 
                      {value: 'EUN1', label: 'EUN', color: '#c81513', name: 'Europe Nordic & East'},
                      {value: 'ME1', label: 'ME', color: '#BF995E', name: 'Middle East'},
                      {value: 'RU', label: 'RU', color: '#18036b', name: 'Russia'},
                      {value: 'TR1', label: 'TR', color: '#a5c3d1', name: 'Turkey'},
                      {value: 'JP1', label: 'JP', color: '#8352b3', name: 'Japan'},
                      {value: 'KR', label: 'KR', color: '#782845', name: 'Korea'},
                      {value: 'SG2', label: 'SEA', color: '#5F5736', name: 'Southeast Asia'},
                      {value: 'TW2', label: 'TW', color: '#bb6d3c', name: 'Taiwan'},
                      {value: 'VN2', label: 'VN', color: '#a6d4c4', name: 'Vietnam'},
                      {value: 'OC1', label: 'OCE', color: '#cea2e7', name: 'Oceania'}]
    return (
        <>
       <header>
            <nav className='nav'>
                <ul>
                    <li>
                        <NavLink className = 'nav-link active' aria-current='page' to='/'> Home </NavLink>
                    </li>
                    <li>
                        <NavLink className = 'nav-link active' aria-current='page' to='/leaderboards'> Leaderboards </NavLink>
                    </li>

                </ul>
            </nav>
            <SearchBar regions={regions} regionTags={regionTags}>
            </SearchBar>
        </header>

        <div className="content">  
            <Outlet context = {{regions, regionTags}}/>
        </div>
        </>
    )
}

export default HomePage;