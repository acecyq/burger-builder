import React, { Fragment } from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../UI/BackDrop/BackDrop';
// import Aux from '../../../hoc/Aux';
import classes from './SideDrawer.css';

// sidedrawer that houses the navlinks in the navbars when it comes to a narrower interface like on mobile phones
const SideDrawer = (props) => {
	let openOrClose;
	props.show ? openOrClose = [classes.SideDrawer, classes.Open] : openOrClose = [classes.SideDrawer, classes.Close]

	return (
		<Fragment>
			<BackDrop show={props.show} click={props.close} />
			<div className={openOrClose.join(' ')}>
				<div className={classes.Logo}>
					<Logo />
				</div>
				<nav>
					<NavigationItems />
				</nav>
			</div>
		</Fragment>
	);
}

export default SideDrawer;