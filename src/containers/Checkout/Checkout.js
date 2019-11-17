import React,{Component} from 'react';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';
import { Route,Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Checkout extends Component{

    cancelOrderHandler=()=>{
        this.props.history.goBack();
    };

    continueOrderHandler=()=>{
        this.props.history.replace('/checkout/contactdata');
    };

render(){
    let summary=<Redirect to ='/'/>
    const redirect=this.props.purchased?<Redirect to='/'/>:null;
    if(this.props.ing){
        summary=(
            <div>
                {redirect}
             <CheckoutSummary
            cancelHandler={this.cancelOrderHandler}
            continueHandler={this.continueOrderHandler}
             ingredients={this.props.ing}/>
             <Route path={this.props.match.path+'/contactdata'} exact component={ContactData}/>
             </div>
             );
        }
    return(
        <div>
            {summary}
        </div>
    )
}

}

 const mapStateToProps=state=>{
     return{
        ing:state.burgerReducer.ingredients,
        purchased:state.orderReducer.purchased
     }
 }

export default connect(mapStateToProps)(Checkout);
