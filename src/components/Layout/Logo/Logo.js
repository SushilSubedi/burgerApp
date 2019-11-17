import React from 'react';
import classes from './Logo.module.css';
import BurgerLogo from '../../../assets/Image/burger-logo.png';

const Logo=(props)=>(
    <div className={classes.Logo} style={{height:props.height}}>
    <img src={BurgerLogo} alt='MyBurger'/>
    </div>
    )
    export default Logo;