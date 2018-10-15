import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const controls = [
	{label: 'Salad', type: 'salad'},
	{label: 'Bacon', type: 'bacon'},
	{label: 'Cheese', type: 'cheese'},
	{label: 'Meat', type: 'meat'}
];

// shows total Price
// controls are mapped into labels and more or less buttons
// Buildcontrols have a disable props to disable the button when the amount of the ingredient is <= 0
const BuildControls = (props) => {
	return(
		<div className={classes.BuildControls}>
			<p>Current Price : <strong>{props.totalPrice.toFixed(2)}</strong></p>
			{controls.map(ctrl => (
				<BuildControl 
					key={ctrl.label}
					label={ctrl.label}
					addIngredient={() => props.addIngredient(ctrl.type)}
					removeIngredient={() => props.removeIngredient(ctrl.type)}
					disable={props.disable[ctrl.type]}
				/>
			))}
			<button className={classes.OrderButton} disabled={props.stopOrder} onClick={props.click}>ORDER NOW</button>
		</div>
	);
}

export default BuildControls;