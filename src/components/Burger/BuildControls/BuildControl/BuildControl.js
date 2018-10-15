import React from 'react';
import classes from './BuildControl.css';

// more and less buttons to add and remove ingredients from the burger
const BuildControl = (props) => {
	return (
		<div className={classes.BuildControl}>
			<div className={classes.Label}>{props.label}</div>
			<button className={classes.Less} onClick={props.removeIngredient} disabled={props.disable}>Less</button>
			<button className={classes.More} onClick={props.addIngredient}>More</button>
		</div>
	);
}

export default BuildControl;