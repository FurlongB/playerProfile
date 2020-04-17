import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


import classCSS from './NavigationItem.css';


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

const navigationItem = (props) =>{
    const { classes } = props;
    return(
    <li className={classCSS.NavigationItem}>
       <NavLink to={props.link}
           exact = {props.exact}
          >
       <Button variant="outlined" className={classes.button}>
           {props.children}
       </Button>
       </NavLink>
    </li>
    );
};

navigationItem.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(navigationItem);

