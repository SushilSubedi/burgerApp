import React,{Component} from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{
    //this should be function component not class component
    render(){
    const IngredientSummary=Object.keys(this.props.ingredients)
    .map(igkey=>{
        return (<li key={igkey}>
        <span style={{textTransform:'capitalize'}}>{igkey}</span>:{this.props.ingredients[igkey]}
        </li>);
    }); 
    
return(
    <Auxiliary>
    <h3>your order</h3>
    <p>Here is the list of different Ingredient you order:</p>
    <ul>
        {IngredientSummary}
    </ul>
    <p><strong>TOTAL PRICE:Rs {this.props.price}</strong></p>
    <p>Continue to Checkout?:</p>
    <Button btnType="Danger" clicked={this.props.cancelled}>CANCEL</Button>
    <Button btnType="Success" clicked={this.props.continued}>CONTINUE</Button>
    </Auxiliary>

)  
    }

}
export default OrderSummary;