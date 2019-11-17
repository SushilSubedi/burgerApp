import React,{Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as actionType from '../../store/action/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component{

    componentDidMount(){
        this.props.onfetchOrder(this.props.token,this.props.userId);
    }

    render(){
        let order=<Spinner/>
        if(!this.props.loading){
            order=  this.props.orders.map(order=>(
                <Order 
                key={order.id}
                ingredients={order.ingredients}
                price={order.price}
                />
           ))
        }

        return(<div>
          {order}
        </div>)
    }
}
const mapStateToProps=state=>{
    return{
    orders:state.orderReducer.orders,
    loading:state.orderReducer.loading,
    token:state.AuthReducer.token,
    userId:state.AuthReducer.userId
}
}
const DispatchStateToProps=dispatch=>{
    return{
        onfetchOrder:(token,userId)=>dispatch(actionType.fetchOrder(token,userId))
    }
}
export default connect(mapStateToProps,DispatchStateToProps)(withErrorHandler(Orders,axios));