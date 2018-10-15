import React from 'react';
import classes from './Menu.css';

// the burger logo
export default props => (
	<div className={classes.Menu} onClick={props.click}>
		<div></div>
		<div></div>
		<div></div>
	</div>
);