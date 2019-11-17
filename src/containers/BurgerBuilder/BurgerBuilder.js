import React,{Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as BurgerBuilderactionType from '../../store/action/index';

class BurgerBuilder extends Component{
  state={
    orderMode:false,
    loader:false
  }
  componentDidMount(){
  this.props.oninitIngredients();
  }
 
  PurchasableItem(ingredients){
    const sum=Object.keys(ingredients)
    .map(igkey=>{
      return ingredients[igkey]; 
    })
    .reduce((sum,el)=>{
    return sum+el;
  },0);

    return sum>0
  }

  // addMoreIngredients=(type)=>{
  //   const oldCount=this.state.ingredients[type];
  //   const updatedCount=oldCount+1;
  //   const updatedIngredient={
  //     ...this.state.ingredients
  //   };
  //   //ingredients=null;
  //   //TotalPrice=40;
  //   updatedIngredient[type]=updatedCount;
  //   const priceAddition=INGREDIENTS_PRICE[type];
  //   const newPrice=this.state.TotalPrice+priceAddition;
  //   this.setState({TotalPrice:newPrice,ingredients:updatedIngredient});
  //   this.PurchasableItem(updatedIngredient);
  // }

  // subtractLessIngredients=(type)=>{
  //   const oldCount=this.state.ingredients[type];
  //   if(oldCount<=0){
  //     return;
  //   }
  //   const updatedCount=oldCount-1;
  //   const updatedIngredient={
  //     ...this.state.ingredients
  //   };
  //   updatedIngredient[type]=updatedCount;
  //   const priceSubtract=INGREDIENTS_PRICE[type];
  //   const newPrice=this.state.TotalPrice-priceSubtract;
  //   this.setState({TotalPrice:newPrice,ingredients:updatedIngredient});
  //   this.PurchasableItem(updatedIngredient);
  // }

  PurchaseHandler=()=>{
    if(this.props.isAuthenticated){
      this.setState({orderMode:true});
    }
    else{
      this.props.onsetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  }

  PurchasableCancelHandler=()=>{
    this.setState({orderMode:false})
  }

  PurchasableContinueHandler=()=>{
    this.props.oninitAction();
    this.props.history.push('/checkout');
  }
  
render(){

  const disabledInfo={
    ...this.props.ing
  }
  for(let key in disabledInfo){
    disabledInfo[key]=disabledInfo[key]<=0
  } 

  let orderSummary=null;
  let burger=this.props.error?<p>Ingredients cannot be loaded!</p>:<Spinner/>;
  if(this.props.ing){       
  burger=(
    <Auxiliary>  
    <Burger ingredients={this.props.ing}/>

    <BurgerControls deleteIngredients={this.props.deleteIngredients}
                      addIngredients={this.props.addIngredients}
                      disabled={disabledInfo}
                      current={this.props.price}
                      Purchase={this.PurchasableItem(this.props.ing)}
                      Order={this.PurchaseHandler}
                      isAuth={this.props.isAuthenticated}/>
                      </Auxiliary>)

            orderSummary=<OrderSummary 
                            price={this.props.price}
                           cancelled={this.PurchasableCancelHandler}
                           continued={this.PurchasableContinueHandler}
                           ingredients={this.props.ing}/>
                                    
                           if(this.state.loader){
                            orderSummary=<Spinner/>
                                    };
  };
  return(
    <Auxiliary>

    <Modal show={this.state.orderMode}
      modelclosed={this.PurchasableCancelHandler}>
      {orderSummary}
    </Modal>
            {burger}
    
    </Auxiliary>
    )
}
}

const mapStateToProps=state=>{
return{
ing:state.burgerReducer.ingredients,
price:state.burgerReducer.TotalPrice,
error:state.burgerReducer.error,
isAuthenticated:state.AuthReducer.token!==null
}
}
const mapDispatchToProps=dispatch=>{
return{
addIngredients:(igName)=>dispatch(BurgerBuilderactionType.addIngredient(igName)),
deleteIngredients:(igName)=>dispatch(BurgerBuilderactionType.deleteIngredient(igName)),
oninitIngredients:()=>dispatch(BurgerBuilderactionType.initIngredient()),
oninitAction:()=>dispatch(BurgerBuilderactionType.initAction()),
onsetAuthRedirectPath:(path)=>dispatch(BurgerBuilderactionType.setAuthRedirectPath(path))

}
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));