import React from 'react'
import { NavLink } from 'react-router-dom'



const NavBar = () => {
    return (
        <div>
            <NavLink to='/' 
            exact 
            activeClassName='activepage'>Home
            </NavLink>
            <NavLink to='/about' 
            exact 
            activeClassName='activepage'>About
            </NavLink>
            <NavLink to='/contacts' 
            exact 
            activeClassName='activepage'>Contacts
            </NavLink>
        </div>


    )

}

export default NavBar