import React from 'react';
import classes from './Order.module.css';

const order=(props)=>{
    let ingredients=[];
    for(let IngredientsName in props.ingredients){
        ingredients.push({
            name:IngredientsName,
            amount:props.ingredients[IngredientsName]
        })
    }
const Ingredients=ingredients.map(ig=>{
    return <span 
    key={ig.name}
    style={{display:'inline-block',
    textTransform:'capitalize',
    margin:'0 8px',
    border:'1px solid #ccc',
    padding:'10px'}}>
    {ig.name} ({ig.amount})</span>
})

return(
<div className={classes.Order}>
    <div>Ingredients:{Ingredients}</div>
    <div>Price:<strong>{props.price}</strong></div>
</div>
)
}
export default order;
