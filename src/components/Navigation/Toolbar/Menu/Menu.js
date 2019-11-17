import React from 'react';
import classes from './Menu.module.css';

const menu=(props)=>(
<div className={classes.DrawerToggle} onClick={props.clickedMenu}>
<div></div>
<div></div>
<div></div>
</div>
)
export default menu;