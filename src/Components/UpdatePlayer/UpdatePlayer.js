import React, {useState, useContext, useEffect} from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { Redirect } from 'react-router-dom';

import Input from '../UI/Input/Input';
import Dialog from '../UI/Dialog/Dialog';

import {updateObject, checkValidity} from '../../shared/utility';
import ProfileContext from '../profile-context';
import ValidContext from '../valid-context';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import classed from '../AddPlayer/AddPlayer.css';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
  });


const updatePlayer = (props) =>{
    const profileStatus = useContext(ProfileContext);
    const validStatus = useContext( ValidContext);
    const { classes } = props;
    const ProfilePlayer = profileStatus.profile;
    const [error, setError] = useState(null);
    const [playerId, setPlayerId] = useState('')
    const [formIsValid, setFormIsValid] = useState(true);
    const [playerForm, setPlayerForm] = useState({
        name:{
            elementType: 'input',
            elementConfig:{
                type: 'text',
                placeholder: ProfilePlayer.name
            },
            value: ProfilePlayer.name,
            validation:{
                required: false
            },
            valid: true,
            touched: true
        },
        age:{
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: ProfilePlayer.age
                },
                value: ProfilePlayer.age,
                validation:{
                    required: false
                },
                valid: true,
                touched: true
            },
        country:{
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: ProfilePlayer.country
                },
                value: ProfilePlayer.country,
                validation:{
                    required: false
                },
                valid: true,
                touched: true
           },
        position:{
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: ProfilePlayer.position
                },
                value: ProfilePlayer.position,
                validation:{
                    required: false
                },
                valid: true,
                touched: true        
        },
        height:{
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: ProfilePlayer.height
                },
                value: ProfilePlayer.height,
                validation:{
                    required: false
                },
                valid: true,
                touched: true
        },
        weight:{
            elementType: 'input',
            elementConfig:{
                type: 'text',
                placeholder: ProfilePlayer.weight
            },
            value: ProfilePlayer.weight,
            validation:{
                required: false
            },
            valid: true,
            touched: true
        },
    });

    useEffect(() =>{
        const playerId = queryString.parse(props.location)
		console.log('playerId', playerId)
        setPlayerId(playerId.ID);
    }, []);

    const playerHandler = () => {
        const playerData = {img: ProfilePlayer.img, userId:validStatus.valid.userId};
        for (let formID in playerForm){
            playerData[formID] = playerForm[formID].value;
        }
        axios.put(`https://player-profile-2ca14.firebaseio.com/players/${playerId}.json`, playerData)
        .then(res =>{
            console.log(res)
            setPlayerId('updated');
            setError(null);
        })
        .catch(err =>{
            console.log(err)
            setError(err.message)
        });
        
    };

    const inputChangedHandler = (event, eventID) => {
        
        const playerFormUpdate = updateObject(playerForm[eventID],{
            value: event.target.value,
            valid: checkValidity(event.target.value, playerForm[eventID].validation),
            touched: true
        })

        const updatedplayerForm = updateObject(playerForm,{
            [eventID]: playerFormUpdate
        })
        
        let formIsValid = true;
        for (let inputID in updatedplayerForm){
            formIsValid = updatedplayerForm[inputID].valid && formIsValid;
        }
        setFormIsValid(formIsValid);
        setPlayerForm(updatedplayerForm);
      };

        const formElementsArray = [];
        for (let key in playerForm){
            formElementsArray.push({
                id: key,
                config: playerForm[key]

            });
        }
        let form =(<form>
            {formElementsArray.map(formElement =>(
                <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value = {formElement.config.value}
                    invalid = {!formElement.config.valid}
                    shouldValidate = {formElement.config.validation}
                    touched = {formElement.config.touched}
                    changed = {(event) => inputChangedHandler(event, formElement.id)}
                />
            ))}
            <Button variant="contained" className={classes.button} disabled={!formIsValid} onClick={playerHandler.bind(this, playerId)}>
                UPDATE PLAYER
            </Button>
        </form>);


    return(
        <div className={classed.AddPlayer}>
            <h4>Update The Players Details</h4>
            {form}
            {playerId === 'updated' ? <Redirect to="/viewPlayer" /> : null}
            {error ? <Dialog title="Network Error" message={error} redirect="/" /> : null}
        </div>
    )
}

updatePlayer.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(updatePlayer);