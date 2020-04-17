import React, {useState, useContext} from 'react';
import axios from 'axios'
import Input from '../UI/Input/Input';
import AuthContext from '../auth-context';
import ValidContext from '../valid-context';
import { Redirect } from 'react-router-dom';

import classed from './Auth.css';
import {updateObject, checkValidity} from '../../shared/utility'
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

const Auth = props => {
    const { classes } = props;  
    const [isSignedUp, setIsSignedUp] = useState(false);
    const [controls, setControls] = useState(
    {
        email:{
            elementType: 'input',
            elementConfig:{
                type: 'email',
                placeholder: 'Mail Address'
            },
            value: '',
            validation:{
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password:{
            elementType: 'input',
            elementConfig:{
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation:{
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    });

    const authStatus = useContext(AuthContext);
    const validStatus = useContext(ValidContext)

    const submitHandler = (event) =>{
        event.preventDefault();
        const authData = {
            email: controls.email.value,
            password: controls.password.value
        }
        console.log(controls.password.value)
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBP0RoTE7Js6XCCNvWk70lAyLoXztl0pDw';
        if(!isSignedUp){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBP0RoTE7Js6XCCNvWk70lAyLoXztl0pDw';
        }
        axios.post(url, authData)
        .then(res => {
            console.log(res)
            authStatus.login(true);
            validStatus.validStat({playerAddedStatus: false, userId:res.data.localId});
        })
        .catch(err =>{
            console.log(err)
        });

    }
    

    const signUpHandler = () =>{
        setIsSignedUp(!isSignedUp)
    }

       // let errorMessage = null

        /*let onRedirect = null;
        if(this.props.isAuthenticated){
            onRedirect = <Redirect to={this.props.onSetRedirectPath} />
        }*/

        const inputChangedHandler = (event, ControlName) =>{
            const updatedControls = updateObject(controls, {
                [ControlName]:updateObject(controls[ControlName],{
                    value: event.target.value,
                    valid: checkValidity(event.target.value, controls[ControlName].validation),
                    touched: true
                })
            })
            setControls(updatedControls);
        }

        const formElementsArray = [];
        for (let key in controls){
            formElementsArray.push({
                id: key,
                config: controls[key]

            });
        }
        
        let form = formElementsArray.map(formElement =>(
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
        ))
        //if(this.props.loading){
            //form = <Spinner />;
        //}
        return(
            <div className={classed.Auth}>
                <form >
                    {form}
                    <Button variant="contained" className={classes.button} onClick={submitHandler.bind(this)}>
                        SUBMIT
                    </Button>
                </form>
                <Button variant="contained" color="primary" className={classes.button} onClick={signUpHandler.bind(this)}>
                    Switch To {isSignedUp ? 'Sign In' : 'Sign Up'}
                </Button>
                {authStatus.status ? <Redirect to="/viewPlayer" /> : null}
            </div>
           
        );
}

Auth.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Auth);