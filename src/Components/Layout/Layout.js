import React, {useState, useContext} from 'react';

import AuthContext from '../auth-context';

import Aux from '../../hoc/auxiliary';
import classes from './Layout.css';
import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from '../SideDrawer/SideDrawer';

const layout =(props)=> {
    const [sideDrawerClose, setSideDrawerClose] = useState(false);
    const authStatus = useContext(AuthContext);
    const sideDrawerClosedHandler = () =>{
        setSideDrawerClose(false);
    }

    const sideDrawerToggleHandler = () =>{
        setSideDrawerClose(!sideDrawerClose);
    }

        return(
            <Aux>
                <Toolbar 
                isAuth={authStatus.status}
                toggleClicked = {sideDrawerToggleHandler}/>
                <SideDrawer 
                isAuth={authStatus.status}
                open={sideDrawerClose} closed={sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {props.children}
                </main> 
             </Aux>
        )
}


export default layout;