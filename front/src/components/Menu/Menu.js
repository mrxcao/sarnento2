import React from 'react';
import NavBar from './NavBar';
import SideBar from './SideBar';


function Menu() {
    return (
    <React.Fragment>        
        <NavBar />
        {localStorage.getItem("token") && <SideBar />}
        
        
    </React.Fragment>)
}

export default Menu;