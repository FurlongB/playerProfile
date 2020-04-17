import React from 'react';
import classes from './Image.css';

const images = props =>{
    return (
        <div className={classes.Images}>
            <img src={require(`./images/${props.img}`)} alt="profile_picture" className={classes.Img}/>
        </div>
    );
};

export default images;