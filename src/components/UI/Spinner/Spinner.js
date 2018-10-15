import React from 'react';
import classes from './Spinner.css';

export default props => {
	return (	
		<div className={classes["lds-ellipsis"]}>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
}