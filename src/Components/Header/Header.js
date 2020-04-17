import React from 'react';
import Logo from '../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawToggle from '../SideDrawer/DrawToggle/DrawToggle'

import classes from './header.css'


const header = props => {
   return (
    <header className={classes.Toolbar}>
        <DrawToggle clicked={props.toggleClicked}/>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>

</header> 
    )
};

export default header;