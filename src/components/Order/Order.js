import React from 'react';
import classes from './Order.css';

// displays all orders in the orders route
export default props => {
	let ingredients = [];
	for (let ingredient in props.order.ingredients) {
		ingredients.push(<span 
			key={ingredient}
			style={{ 
				textTransform : 'capitalize',
				display : 'inline-block',
				margin : '0 8px',
				border : '1px solid #ccc',
				padding : '5px'
			}}
		>
			{ingredient} {props.order.ingredients[ingredient]}
		</span>);
	}

	return (
		<div className={classes.Order}>
			<p>Ingredients: {ingredients}</p>
			<p>Price: <strong>USD {Number.parseFloat(props.order.totalPrice).toFixed(2)}</strong></p>
		</div>
	);
}