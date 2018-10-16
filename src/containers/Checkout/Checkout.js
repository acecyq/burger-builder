import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';

class Checkout extends Component {
	// state = {
	// 	ingredients : {},
	// 	price : ""
	// }

	// query params is extracted from props.location.search to set state
	// componentWillMount() {
	// 	const query = new URLSearchParams(this.props.location.search);
	// 	const ingredients = {};
	// 	let price;
	// 	for (let param of query.entries()) {
	// 		param[0] === 'price' ?
	// 			price = Number(param[1]).toFixed(2) :
	// 			ingredients[param[0]] = +param[1];
	// 	}
	// 	this.setState({ 
	// 		ingredients : ingredients,
	// 		price : price
	// 	});
	// }

	// goes back one page
	cancelCheckout = () => {
		this.props.history.goBack();
	}

	// replace current url
	continueCheckout = () => {
		this.props.history.replace('/checkout/contact-data');
	}

	render() {
		return (
			<Fragment>
				<div>
					<CheckoutSummary 
						ingredients={this.props.ing}
						cancelCheckout={this.cancelCheckout}
						continueCheckout={this.continueCheckout}
					/>
				</div>
				<Route
					path={`${this.props.match.url}/contact-data`}
					render={() => <ContactData ingredients={this.props.ing} price={this.props.price} {...this.props} />}
				/>
			</Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		ing: state.ingredients,
		price: state.totalPrice
	};
}

const mapDispatchToProps = dispatch => {
	return null;
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)