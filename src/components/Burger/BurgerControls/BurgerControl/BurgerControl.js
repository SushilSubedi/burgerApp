import React from 'react';
import classes from './BurgerControl.module.css';

const BurgerControl=(props)=>(
    <div className={classes.BuildControl}>
    <div className={classes.label}>{props.label}</div>
    <button onClick={props.subtract} className={classes.Less} disabled={props.disabled}>less</button>
    <button onClick={props.added} className={classes.More}>more</button>
    </div>
    )
export default BurgerControl;