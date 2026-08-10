import { NavLink, Outlet } from "react-router-dom";


import './AppLayout.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from "@/features/account/components/SearchBar";


/**
 * Serves as the layout for the web browser. 
 * Dictates the outlet of children routes: /leaderboards, /account
 */
function AppLayout(){    

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
            <SearchBar/>
        </header>

        <div className="content">  
            <Outlet/>
        </div>
        </>
    )
}

export default AppLayout;