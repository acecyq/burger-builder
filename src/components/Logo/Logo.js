import React from 'react';
import BurgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const Logo = (props) => (
	<div className={classes.Logo}>
		<img src={BurgerLogo} alt="burger logo" />
	</div>
);

export default Logo;