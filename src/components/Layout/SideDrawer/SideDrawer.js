import React from 'react';
import Logo from '../../Layout/Logo/Logo';
import NavigationItems from '../../Navigation/Navigationitems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary'; 

const sidedrawer=(props)=>{
let attachedClasses=[classes.SideDrawer,classes.Close];
if(props.open){
    attachedClasses=[classes.SideDrawer,classes.Open];
}
 return(
     <Auxiliary>
    <Backdrop show={props.open} clicked={props.closed}/>
    <div className={attachedClasses.join(' ')} onClick={props.closed}>
    <Logo height="11%"/>
    <nav>
        <NavigationItems 
        isAuthentication={props.isAuth}/>
    </nav>
    </div>
    </Auxiliary>
)
 }
export default sidedrawer;