import React, { Component, Fragment } from 'react';
// import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
	render() {
		// list down summary of ingredients of the burger
		const ingredientSummary = [];
		for (let ingredient in this.props.ingredients) {
			ingredientSummary.push(
				<li key={ingredient}>
					<span style={{textTransform : 'capitalize'}}>
						{ingredient}
					</span> : {this.props.ingredients[ingredient]}
				</li>
			);
		}

		return (
			<Fragment>
				<h3>Your Order</h3>
				<p>A delicious burger with the following ingredients:</p>
				<ul>
					{ingredientSummary}
				</ul>
				<p>{this.props.price.toFixed(2)}</p>
				<p>Proceed to checkout?</p>
				<Button btnType="Danger" click={this.props.click}>CANCEL</Button>
				<Button btnType="Success" click={this.props.continue}>CONTINUE</Button>
			</Fragment>
		);
	}	
}

export default OrderSummary;