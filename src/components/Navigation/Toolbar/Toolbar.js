import React from 'react';
import Menu from '../../Menu/Menu';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Toolbar.css';

// the navbar that does not appear in less than 499px width
const Toolbar = (props) => (
	<header className={classes.Toolbar}>
		<Menu click={props.click} />
		<div className={classes.Logo}>
			<Logo />
		</div>
		<nav className={classes.DesktopOnly}>
			<NavigationItems />
		</nav>
	</header>
)

export default Toolbar;