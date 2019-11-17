import React,{ Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as action from '../../../store/action/index';

class Logout extends Component{

    componentDidMount(){
        this.props.onlogout();
    }
render(){
    return <Redirect to="/"/>
}
}
const dipatchStateToProps=dispatch=>{
return{
onlogout:()=>dispatch(action.logout())
}
}

export default connect(null,dipatchStateToProps)(Logout);