import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import * as bba from '../../store/actions/BurgerBuilder';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import axios from '../../axios-orders';

class BurgerBuilder extends Component {
	state = {
		checkOut : false,
		loading : false
	}

	// run get request to server to get ingredients
	// componentDidMount() runs after render so that the component can render first before getting a response
	componentDidMount() {
		this.props.fetchIng('/ingredients.json');
	}

	checkOutHandler = () => {
		this.setState(state => {
			return {checkOut : !state.checkOut}
		});
	}

	continueHandler = () => {

		/*
		//////////////////////////////////////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////////////////////////////////////////////////////
		PREV ALTERNATIVE METHOD
		//////////////////////////////////////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////////////////////////////////////////////////////
		*/
		// const queryParams = [];
		// for (let i in this.state.ingredients) {
		// 	queryParams.push(`${encodeURIComponent(i)}=${encodeURIComponent(this.state.ingredients[i])}`);
		// }
		// const queryString = queryParams.join("&");
		// this.props.history.push({
		// 	pathname : "/checkout",
		// 	search : `?${queryString}`
		// });

		/*
		//////////////////////////////////////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////////////////////////////////////////////////////
		PREV METHOD
		//////////////////////////////////////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////////////////////////////////////////////////////
		*/
		// let queryString = `checkout?`;
		// for (let ingredient in this.props.ing) {
		// 	queryString = queryString.concat(`${ingredient}=${this.props.ing[ingredient]}&`);
		// }
		// queryString = queryString.concat(`price=${this.props.price}`);
		// this.props.history.push(`/${queryString}`);

		this.props.history.push('/checkout');
	}
	
	render() {

		// clone this.state.ingredients and if ingredient is 0 or lesser, turn the ingredient's value into a false boolean
		let disable = {
			...this.props.ing
		};
		for (let ingredient in disable) {
			disable[ingredient] = disable[ingredient] <= 0;
		}

		// if there is no ingredient, stop the order
		let stopOrder = this.props.price === 4;

		let afterModal;

		// if ingredients are loaded, show burger and build controls
		if (this.props.ing) {
			afterModal = (
				<Fragment>
					<Burger ingredients={this.props.ing} />
					<BuildControls 
						addIngredient={this.props.addIng} 
						removeIngredient={this.props.remIng} 
						disable={disable}
						totalPrice={this.props.price} 
						stopOrder={stopOrder}
						click={this.checkOutHandler}
					/>
				</Fragment>
			);

		// if there is no ingredients AND no errors, show spinner. so it tells that page is loading
		} else if (!this.props.error) {
			afterModal = (
				<div style={{ textAlign : "center" }}>
					<Spinner />
				</div>
			);

		// if there is no ingredient and error is returned, show user that ingredients could not be loaded
		} else if (this.props.error) {
			afterModal = (
				<h1>Ingredients could not be loaded!</h1>
			);
		}

		// if loading, only show spinner. else show order summary
		// if this.state.ingredients, show burger and buildcontrols. else show spinner
		return (
			<Fragment>
				<Modal checkOut={this.state.checkOut} click={this.checkOutHandler} loading={this.state.loading} >
					{this.state.loading ?
						<Spinner /> :
						<OrderSummary ingredients={this.props.ing} click={this.checkOutHandler} continue={this.continueHandler} price={this.props.price} />
					}
				</Modal>
				{afterModal}
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	ing: state.ingredients,
	price: state.totalPrice,
	error: state.error
})

const mapDispatchToProps = dispatch => ({
	fetchIng: url => dispatch(bba.fetchIng(url)),
	addIng: ing => dispatch(bba.addIng(ing)),
	remIng: ing => dispatch(bba.remIng(ing))
})

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(BurgerBuilder, axios));