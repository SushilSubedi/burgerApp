import React from 'react';
import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';
import classes from './CheckoutSummary.module.css';
const checkoutSummary=(props)=>{

    return(
        <div className={classes.CheckoutSummary}>
            <h1>Enjoy Your Meal..!</h1>
            <div style={{height:'100%',width:'300px',margin:'auto'}}>
                <Burger ingredients={props.ingredients}/>
                </div>
            <Button btnType='Danger'clicked={props.cancelHandler}>CANCEL</Button>
            <Button btnType='Success' clicked={props.continueHandler}>CONTINUE</Button>
        </div>
    )

}
export default checkoutSummary;