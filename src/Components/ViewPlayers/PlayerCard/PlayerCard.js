import React from 'react';

import Image from '../../Image/Image';
import classes from './PlayerCard.css';

const playerCard = props =>{
    return(
        <div id={props.id} className={classes.PlayerCard} onClick={props.clicked}>
            <Image img={props.img}/>
            {props.name}
        </div>
    );
};

export default playerCard;

