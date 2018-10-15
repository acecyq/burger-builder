import React, { Component, Fragment } from 'react';
// import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import axios from '../../axios-orders';

const PRICES = {
	salad: 0.5,
	bacon: 0.7,
	cheese: 0.4,
	meat: 1.3
};

class BurgerBuilder extends Component {
	state = {
		ingredients : null,

		// all burgers start at $4
		totalPrice : 4,

		// if true, Modal will show
		checkOut : false,

		// if true, Spinner will show
		loading : false,
		error : false
	}

	// run get request to server to get ingredients
	// componentDidMount() runs after render so that the component can render first before getting a response
	componentDidMount() {
		axios.get('/ingredients.json')
			.then(res => {
				this.setState({

					// sets ingredients to be the data from the response
					ingredients : res.data
				})
			})
			.catch(err => {
				this.setState({

					// if error, set this.state.error = true
					error : true
				})
			});
	}

	// when more button is clicked
	addIngredientHandler = (type) => {

		// clone this.state.ingredients and update ingredient count + 1
		const update = {
			...this.state.ingredients
		};
		update[type] += 1;

		// add ingredient price to total price
		const newPrice = this.state.totalPrice + PRICES[type];
		this.setState({
			ingredients : update,
			totalPrice : newPrice
		});
	}

	// when less button is clicked
	removeIngredientHandler = (type) => {

		// clone this.state.ingredients and update ingredient count + 1
		const update = {
			...this.state.ingredients
		};
		
		// reduce the ingredient only if the count is more than 0
		let newPrice;
		if (update[type] > 0) {
			update[type] -= 1;
			newPrice = this.state.totalPrice - PRICES[type];	
		}
		
		this.setState({
			ingredients : update,
			totalPrice : newPrice
		});
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
		ALTERNATIVE METHOD
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

		let queryString = `checkout?`;
		for (let ingredient in this.state.ingredients) {
			queryString = queryString.concat(`${ingredient}=${this.state.ingredients[ingredient]}&`);
		}
		// queryString = queryString.slice(0, -1);
		queryString = queryString.concat(`price=${this.state.totalPrice}`);
		this.props.history.push(`/${queryString}`);
	}
	
	render() {

		// clone this.state.ingredients and if ingredient is 0 or lesser, turn the ingredient's value into a false boolean
		let disable = {
			...this.state.ingredients
		};
		for (let ingredient in disable) {
			disable[ingredient] = disable[ingredient] <= 0;
		}

		// if there is no ingredient, stop the order
		let stopOrder = this.state.totalPrice === 4;

		let afterModal;

		// if ingredients are loaded, show burger and build controls
		if (this.state.ingredients) {
			afterModal = (
				<Fragment>
					<Burger ingredients={this.state.ingredients} />
					<BuildControls 
						addIngredient={this.addIngredientHandler} 
						removeIngredient={this.removeIngredientHandler} 
						disable={disable} totalPrice={this.state.totalPrice} 
						stopOrder={stopOrder}
						click={this.checkOutHandler}
					/>
				</Fragment>
			);

		// if there is no ingredients AND no errors, show spinner. so it tells that page is loading
		} else if (!this.state.error) {
			afterModal = (
				<div style={{ textAlign : "center" }}>
					<Spinner />
				</div>
			);

		// if there is no ingredient and error is returned, show user that ingredients could not be loaded
		} else if (this.state.error) {
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
						<OrderSummary ingredients={this.state.ingredients} click={this.checkOutHandler} continue={this.continueHandler} price={this.state.totalPrice} />
					}
				</Modal>
				{afterModal}
			</Fragment>
		);
	}
}

export default ErrorHandler(BurgerBuilder, axios);