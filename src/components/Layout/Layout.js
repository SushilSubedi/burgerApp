import React,{Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import { connect } from 'react-redux';
import classes from './layout.module.css';
import Toolbar from './../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Layout/SideDrawer/SideDrawer';

class Layout extends Component{
  state={
    showSideDrawer:false,
  }

  showSideDrawerHandler=()=>{
    this.setState({showSideDrawer:true})
  }
  closedSideDrawerHandler=()=>{
    this.setState({showSideDrawer:false})
  }
  render(){
    return( 
      <Auxiliary>

    <Toolbar isAuth={this.props.isAuthenticated}
     Opened={this.showSideDrawerHandler}>

    <SideDrawer isAuth={this.props.isAuthenticated} 
     open={this.state.showSideDrawer} closed={this.closedSideDrawerHandler}/>
    </Toolbar>
    <main className={classes.Content}>
        {this.props.children}
        </main>
   </Auxiliary>
  )
    }
  }
  const mapStateToProps=state=>{
    return{
      isAuthenticated:state.AuthReducer.token !==null
    }
  }

export default connect(mapStateToProps)(Layout);