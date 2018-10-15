import React from 'react';

// import classes from the burger scoped css file
import classes from './Burger.css';

// import burger ingredient component
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {

	// map keys of props.ingredients return array of length of amount of the individual ingredient 
	// mapped to return divs with the className with respect to the type of ingredient
	let transformedIngredients = Object.keys(props.ingredients).map(key => {
		return [...Array(props.ingredients[key])].map((_, i) => {
			return <BurgerIngredient key={key + i} type={key} />;
		})
	})

	// flattening of the array of arrays into a single array
	.reduce((arr, el) => {
		return arr.concat(el);
	}, []);

	// if transformedIngredients is an empty array, then ask user to start adding ingredients
	if (transformedIngredients.length === 0) {
		transformedIngredients = <p>Please start adding ingredients</p>
	}
	
	return (
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top" />
			{transformedIngredients}
			<BurgerIngredient type="bread-bottom" />
		</div>
	);
}

export default Burger;