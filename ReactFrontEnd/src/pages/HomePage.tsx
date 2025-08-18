import { Outlet, NavLink } from "react-router-dom";

import SearchBar from "../components/SearchBar";

import '../css/HomePage.css';
import 'bootstrap/dist/css/bootstrap.min.css';


export interface Options{
    value: string,
    label: string,
    color: string,
}

export interface Regions{
    value: string,
    label: string,
    color: string
}

export interface RegionsData{
    regions: Array<Regions>,
    regionTags: Array<String>
}


/**
 * Serves as the layout for the web browser. 
 * Dictates the outlet of children routes: /leaderboards, /account
 */
function HomePage(){    
    const regionTags = ['NA1', 'LA1', 'LA2', 'BR1', 'EUW1', 'EUN1', 'ME1', 'RU', 'TR1', 'JP1', 'KR', 'SG2', 'TW2', 'VN2', 'OC1']
    const regions = [ {value: 'NA1', label: 'NA', color: '#D16E6C'}, 
                      {value: 'LA1', label: 'LAN', color: '#A8EB12' }, 
                      {value: 'LA2', label: 'LAS', color: '#D16BA5'}, 
                      {value: 'BR1', label: 'BR', color: '#86A8E7'}, 
                      {value: 'EUW1', label: 'EUW', color: '#5FFBF1'}, 
                      {value: 'EUN1', label: 'EUN', color: '#735F32'},
                      {value: 'ME1', label: 'ME', color: '#BF995E'},
                      {value: 'RU', label: 'RU', color: '#18036b'},
                      {value: 'TR1', label: 'TR', color: '#a5c3d1'},
                      {value: 'JP1', label: 'JP', color: '#8352b3'},
                      {value: 'KR', label: 'KR', color: '#782845'},
                      {value: 'SG2', label: 'SEA', color: '#5F5736'},
                      {value: 'TW2', label: 'TW', color: '#FFD700'},
                      {value: 'VN2', label: 'VN', color: '#D19C8E'},
                      {value: 'OC1', label: 'OCE', color: '#cea2e7'}]
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