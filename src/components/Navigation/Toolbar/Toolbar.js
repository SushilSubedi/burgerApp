import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Layout/Logo/Logo';
import NavigationItems from '../Navigationitems/NavigationItems';
import Menu from './Menu/Menu';

const toolbar=(props)=>(
<header className={classes.ToolBar}>
<Menu clickedMenu={props.Opened}/>
<Logo height="80%"/>
<nav className={classes.DesktopOnly}>
<NavigationItems 
 isAuthentication={props.isAuth}/> 
</nav>
{props.children}
</header>
)
export default toolbar; 