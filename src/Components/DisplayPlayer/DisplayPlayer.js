import React, {useContext, useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios'

import Aux from '../../hoc/auxiliary';
import {NavLink} from 'react-router-dom';
import BackDrop from './BackDrop/BackDrop';
import Image from '../Image/Image';
import Close from '../../assests/images/close.png';
import ProfileContext from '../profile-context';
import AuthContext from '../auth-context';
import Dialog from '../UI/Dialog/Dialog';


import classed from './DisplayPlayer.css';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
  });


const displayPlayer = props => {
    const [error, setError] = useState(null);
    const [deletedPlayer, setDeletedPlayer] = useState(false);
    const profileStatus = useContext(ProfileContext);
    const authStatus = useContext(AuthContext);
    const { classes } = props;
    useEffect(() =>{

       return () =>{
            setError(null);
            setDeletedPlayer(false);
            console.log('Clean Up');
        }
        
    }, []);

    /*const playerSummary  = Object.keys(props.profile).map( igKey =>{
        if(igKey !== 'img' && igKey !== 'userId'){
             return(
                <p key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.profile[igKey]}
                </p> 
            )    
        }
     });*/

     const delPlayerHandler = () => {
        axios.delete(`https://player-profile-2ca14.firebaseio.com/players/${props.ids}.json`)
        .then(res =>{

            setDeletedPlayer(true);
            setError(null)
        })
        .catch(err =>{
            console.log(err)
            setError(err.message)
        });
        
    };

    return(
        <Aux>
            <BackDrop show={props.show} closed={props.closed}/>
            <div className={classed.DisplayPlayer}
                style={{transform: props.show ? 'translateY(0)': 'translateY(-100vh)',
                            opacity: props.show ? '1' : '0'
             }}>
                <div className={classed.flexcontainer}>
                    <div>
                        <h3>Players Profile</h3>
                    </div>
                    <div onClick={props.closed}>
                        <img src={Close} alt='closeButton' className={classed.close} />
                    </div>
                </div>
                <hr/>
                <div className={classed.flexcontainer}>
                    <div>
                       <p>Name: {props.profile.name}</p> 
                       <p>Age: {props.profile.age}</p> 
                       <p>Nationality: {props.profile.country}</p> 
                       <p>Position: {props.profile.position}</p>
                       <p>Height: {props.profile.height+'cm'}</p> 
                       <p>Weight: {props.profile.weight+'kg'}</p>  
                    </div>
                    <div>
                        <Image img={props.img} />
                    </div>
                </div>
                <span>
               {authStatus.status ? <NavLink to={{
                    pathname: '/updatePlayer',
                    search:'?ID='+props.ids
                }} exact>
                    <Button variant="contained" className={classes.button} onClick={profileStatus.profileStat.bind(this, props.profile)}>
                        UPDATE PLAYER
                    </Button> 
                </NavLink>     
                : null}
                {authStatus.status ? 
                    <Button variant="contained" className={classes.button} onClick={delPlayerHandler.bind(this, props.ids)}>
                        DELETE PLAYER
                    </Button>          
                : null}
                </span>
            </div> 
            {deletedPlayer ? <Redirect to="/" /> : null}
            {error ? <Dialog title='Network Error' message={error} redirect='/'/> : null}
        </Aux>
    );
};

displayPlayer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(displayPlayer);
