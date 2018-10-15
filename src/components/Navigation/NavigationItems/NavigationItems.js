import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

// all the navlinks in the navbar
const NavigationItems = () => (
	<ul className={classes.NavigationItems}>
		<NavigationItem link="/" exact>Burger Builder</NavigationItem>
		<NavigationItem link="/orders">Orders</NavigationItem>
	</ul>
);

export default NavigationItems;