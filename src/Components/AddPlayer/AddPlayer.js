import React, {useState, useContext} from 'react';
import axios from 'axios';
import ValidContext from '../valid-context';
import Dialog from '../UI/Dialog/Dialog'
import Input from '../UI/Input/Input';
import classed from './AddPlayer.css';
import {updateObject, checkValidity} from '../../shared/utility';

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

const addPlayer = props => {
    const { classes } = props;
    const validStatus = useContext( ValidContext);
    const [error, setError] = useState(null);
    const [formIsValid, setFormIsValid] = useState(false);
    const [playerForm, setPlayerForm] = useState({
        name:{
            elementType: 'input',
            elementConfig:{
                type: 'text',
                placeholder: 'Players Name'
            },
            value: '',
            validation:{
                required: true
             },
            valid: false,
            touched: false
        },
        age:{
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Players Age'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
        },
        country:{
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Players Nationality'
                },
                value: '',
                validation:{
                    required: true,
                },
                valid: false,
                touched: false
        },
        position:{
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Players Position'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
        },
        height:{
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Players Height in cms'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
        },
        weight:{
            elementType: 'input',
            elementConfig:{
                type: 'text',
                placeholder: 'Players Weight in Kgs'
            },
            value: '',
            validation:{
                required: true
            },
            valid: false,
            touched: false
        },
    })
    const playerHandler = (event) => {
        event.preventDefault();
        const playerData = {img:'profile_'+Math.round(Math.random() * 4)+'.png', userId:validStatus.valid.userId};
        for (let formID in playerForm){
            playerData[formID] = playerForm[formID].value;
        }
        const myJSON = JSON.stringify(playerData);
        axios.post('https://player-profile-2ca14.firebaseio.com/players.json', myJSON)
        .then(res =>{
            validStatus.validStat({playerAddedStatus: true});
            setError(null);
        })
        .catch(err =>{
            validStatus.validStat({playerAddedStatus: false});
            setError(err.message);
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
            <Button variant="contained" className={classes.button} disabled={!formIsValid} onClick={playerHandler}>
                SUBMIT PLAYER
            </Button>
        </form>);
           
        return(        
            <div className={classed.AddPlayer}>
                <h4>Enter The Players Details</h4>
                {form}
                {validStatus.valid.playerAddedStatus ? <Dialog title="Congratulations" message="Thank you for adding a player to our system" redirect='/' /> : null}
                {error ? <Dialog title="Network Error" message={error} redirect="/" /> : null}
            </div>
        );
}

addPlayer.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles) (addPlayer);


