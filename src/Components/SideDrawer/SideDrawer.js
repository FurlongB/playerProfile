import React from 'react';

import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import BackDrop from '../DisplayPlayer/BackDrop/BackDrop';
import Aux from '../../hoc/auxiliary'

const sideDrawer = (props) =>{
    let attachedClass = [classes.SideDrawer, classes.Close];
    if(props.open){
        attachedClass = [classes.SideDrawer, classes.Open];
    }
    return(
        <Aux>
            <BackDrop show={props.open} closed={props.closed}/>
            <div className={attachedClass.join(' ')} onClick={props.closed}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <NavigationItems isAuthenicated={props.isAuth} />

            </div>
        </Aux>
    );
};

export default sideDrawer;