import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationitems=(props)=>(
    
  <ul className={classes.NavigationItems}>
        <NavigationItem exact 
        link={'/'}>Burger-Builder</NavigationItem>
        {props.isAuthentication ? <NavigationItem link={'/order'}>Order</NavigationItem>:null}
        { !props.isAuthentication ? <NavigationItem link={'/auth'}>Authentication</NavigationItem>:
         <NavigationItem link={'/logout'}>LOGOUT</NavigationItem>}
    </ul>
    
)
export default navigationitems;