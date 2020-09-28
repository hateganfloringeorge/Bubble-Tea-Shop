/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import { UserContext } from './UserContext';
import {HashRouter, NavLink} from 'react-router-dom';



const NavHeader = () => {

    const { user } = useContext(UserContext);

    return(
        <>
        <header>
            <div className="container">
            <div id="branding">
                <h1>Bubble Tea</h1>
            </div>
            <nav>
                <HashRouter>
                <ul>
                <li><NavLink to="/"><a>Home</a></NavLink></li>
                <li><NavLink to="/about"><a>About</a></NavLink></li>
                <li><NavLink to="/menu"><a>Menu</a></NavLink></li>
                <li><NavLink to="/contact"><a>Contact</a></NavLink></li>
                <li><NavLink to="/faq"><a>FAQ</a></NavLink></li>
                <li><NavLink to="/review"><a>Review</a></NavLink></li>
                {user ? (
                        <li><NavLink to="/logout"><a>Logout</a></NavLink></li>
                    ) : ( <>
                        <li><NavLink to="/register"><a>Register</a></NavLink></li>
                        <li><NavLink to="/login"><a>Login</a></NavLink></li>
                        </>
                    )
                }
                </ul>
                </HashRouter>
            </nav>
            </div>
        </header>
        </>
    )
}

export default NavHeader;