import React from 'react';
import BurgerControl from './BurgerControl/BurgerControl';
import classes from './BurgerControls.module.css';

const control=[
    {Label:'Salad', type:'salad'},
    {Label:'Bacon', type:'bacon'},
    {Label:'Cheese', type:'cheese'},
    {Label:'Meat', type:'meat'}
];
const burgerControls=(props)=>(
    <div className={classes.BurgerControls}>
    <p>Current Price: Rs{props.current}/-</p>
    {control.map(ctrl=>(
        <BurgerControl 
        subtract={()=>props.deleteIngredients(ctrl.type)}
        added={()=>props.addIngredients(ctrl.type)}
        key={ctrl.Label}
         label={ctrl.Label}
         disabled={props.disabled[ctrl.type]}/>
    ))}
    <button className={classes.OrderButton}
        disabled={!props.Purchase}
        onClick={props.Order}>{props.isAuth?'ORDER NOW':'SIGNUP TO ORDER'}</button>
    </div>
)
export default burgerControls;