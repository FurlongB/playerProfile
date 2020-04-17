import React, {useContext} from 'react';
import AuthContext from '../auth-context';
import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = props => {
    const authLogin = useContext(AuthContext);
    return(
        <ul className={classes.NavigationItems}>
            <NavigationItem  link="/viewPlayer" >View Players</NavigationItem>
            {authLogin.status ? <NavigationItem link="/addPlayer" >Add Player</NavigationItem> : null}
            { !authLogin.status
            ? <NavigationItem link="/" exact>Authentication</NavigationItem>
            : <NavigationItem link="/logout">Logout</NavigationItem>}
        </ul>
    );
};

export default navigationItems