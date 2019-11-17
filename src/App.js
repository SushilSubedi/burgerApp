import React,{Component,Suspense,lazy} from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import{Route,Switch,withRouter,Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionType from './store/action/index';
import Logout from './containers/Authentication/Logout/Logout';
import Spinner from './components/UI/Spinner/Spinner';


class App extends Component{
  componentDidMount(){
    this.props.onAutoSignIn();
  }

render(){

const ayscCheckout=React.lazy(()=>import('./containers/Checkout/Checkout'));
const ayscOrder=React.lazy(()=>import('./containers/Order/Order'));
const ayscAuth=React.lazy(()=>import('./containers/Authentication/Authentication'));

let routes=(
<Switch>
   <Route path="/" exact component={BurgerBuilder}/>
   <Route path="/auth"  component={ayscAuth}/>
   <Redirect to='/'/>
</Switch>);

if(this.props.isAuthenticated){
  routes=(
    <Switch>
    <Route path="/checkout" component={ayscCheckout}/>
    <Route path="/order" component={ayscOrder}/>
    <Route path="/auth"  component={ayscAuth}/>
    <Route path="/logout"  component={Logout}/>
    <Route path="/" exact component={BurgerBuilder}/>
    <Redirect to='/'/>
    </Switch>
  );
}

  return(
    <div>
       <Layout>
         <Suspense fallback={<Spinner/>}>
         {routes}
         </Suspense>
       </Layout>
    </div>)
}
};

const mapStateToProps=state=>{
  return{
    isAuthenticated:state.AuthReducer.token!==null
  }
}

const dispatchStateToProps=dispatch=>{
  return{
    onAutoSignIn:()=>dispatch(actionType.authCheckState())
  }
}
export default withRouter(connect(mapStateToProps,dispatchStateToProps)(App));