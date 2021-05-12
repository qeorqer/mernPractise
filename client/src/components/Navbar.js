import React, {useContext} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {AuthContext} from "../context/authContext";
export const Navbar = () =>{
    const auth = useContext(AuthContext);
    const history = useHistory();

    const logoutHandler = event =>{
        event.preventDefault();
        auth.logout();
        history.push('/');
    }
    return(
    <nav className="nav-wrapper" style={{padding:"0 15px"}}>
            <a href="/" className="brand-logo">links contractions</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><NavLink to="/create">Create</NavLink></li>
                <li><NavLink to="/links">Links</NavLink></li>
                <li><a href="/" onClick={logoutHandler}>Log out</a></li>
            </ul>
    </nav>

)}