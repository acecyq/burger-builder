import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../store/Actions';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import axios from '../../axios-orders';

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
				this.props.getIng(res.data);
			})
			.catch(err => {
				this.setState({

					// if error, set this.state.error = true
					error : true
				})
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
		for (let ingredient in this.props.ing) {
			queryString = queryString.concat(`${ingredient}=${this.props.ing[ingredient]}&`);
		}
		queryString = queryString.concat(`price=${this.props.price}`);
		this.props.history.push(`/${queryString}`);
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
						<OrderSummary ingredients={this.props.ing} click={this.checkOutHandler} continue={this.continueHandler} price={this.props.price} />
					}
				</Modal>
				{afterModal}
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
	return {
		getIng: (data) => dispatch({ type: Actions.GETING, ingredients: data }),
		addIng: (ing) => dispatch({ type: Actions.ADDING, ingredient: ing}),
		remIng: (ing) => dispatch({ type: Actions.REMING, ingredient: ing})
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(BurgerBuilder, axios));