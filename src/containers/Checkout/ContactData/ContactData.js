import React, { Component } from 'react';
import { connect } from 'react-redux'

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css';

class ContactData extends Component {
	state = {
		orderForm : {
			name : {
				elementType : "input",
				elementConfig : {
					type: "text",
					placeholder: "Your name"
				},
				value: "",
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			street : {
				elementType : "input",
				elementConfig : {
					type: "text",
					placeholder: "Street"
				},
				value: "",
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			zipCode : {
				elementType : "input",
				elementConfig : {
					type: "text",
					placeholder: "Postal Code"
				},
				value: "",
				validation: {
					required: true,
					length: 6
				},
				valid: false,
				touched: false
			},
			country: {
				elementType : "input",
				elementConfig : {
					type: "text",
					placeholder: "Country"
				},
				value: "",
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			email : {
				elementType : "input",
				elementConfig : {
					type: "email",
					placeholder: "Email Address"
				},
				value: "",
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			deliveryMethod : {
				elementType : "select",
				elementConfig : {
					options : [
						{value : "fastest", displayValue : "Fastest"},
						{value : "cheapest", displayValue : "Cheapest"}
					]
				},
				value: "fastest"
			}
		},
		loading : false,
		valid : false
	}

	orderClick = (event) => {
		event.preventDefault();

		// show spinner
		this.setState({ loading : true });
		const formData = {};
		for (let formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
		}
		
		// construct json file for post request
		const order = {
			ingredients : this.props.ingredients,
			totalPrice : this.props.price,
			orderData : formData
		}

		// send post request
		axios.post('/orders.json', order)
			.then(res => {

				// if there is response, close order summary and spinner
				this.setState({
					loading : false
				});
				this.props.history.push('/');
			})
			.catch(err => {

				// if there is response, close order summary and spinner also
				this.setState({
					loading : false
				});
			});
	}

	inputChange = (event, inputtype) => {

		const updatedOrderForm = {
			...this.state.orderForm
		};
		const updatedFormElement = {
			...updatedOrderForm[inputtype]
		};
		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
		updatedFormElement.touched = true;
		updatedOrderForm[inputtype] = updatedFormElement;
		let valid = true;
		for (let key in this.state.orderForm) {
			if (key !== "deliveryMethod" && !this.state.orderForm[key].valid) {
				valid = false;
			}
		}
		this.setState({
			orderForm : updatedOrderForm,
			valid : valid
		});
	}

	checkValidity = (value, rules) => {
		let isValid = false;
		if (rules) {
			if (rules.required) {
				isValid = value.trim() !== "";
			}
			if (rules.length) {
				isValid = value.length === rules.length && isValid;
			}
		}
		return isValid;
	}

	render() {
		const formElementsArray = [];
		for (let key in this.state.orderForm) {
			formElementsArray.push({
				id : key,
				config : this.state.orderForm[key]
			});
		}

		return (
			<div className={classes.ContactData}>
				<h4>Enter your Contact Data!</h4>
				{this.state.loading ?
					<Spinner /> :
					<form onSubmit={this.orderClick}>
						{formElementsArray.map(formElement => {
							return (
								<Input
									key={formElement.id}
									elementType={formElement.config.elementType}
									elementConfig={formElement.config.elementConfig}
									value={formElement.config.value}
									change={(event) => this.inputChange(event, formElement.id)}
									invalid={!formElement.config.valid}
									shouldValidate={formElement.config.validation}
									touched={formElement.config.touched}
								/>
							);
						})}
						<Button btnType="Success" formValid={this.state.valid}>ORDER</Button>
					</form>
				}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	ing: state.ingredients,
	price: state.totalPrice
})

export default connect(mapStateToProps)(ContactData);