import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';

class Orders extends Component {
	state = {
		orders : null,
		loading : true
	}

	// get all orders from realtime database. use axios from axios instance created
	componentDidMount() {
		axios.get('/orders.json')
			.then(res => {
				const data = [];
				for (let order in res.data) {
					data.push(res.data[order]);
				}
				this.setState({ 
					loading : false,
					orders : data
				});
			})
			.catch(err => {
				this.setState({ loading : false});
			});
	}

	render() {
		const orders = this.state.orders ?
			this.state.orders.map((order, index) => {
				return <Order order={order} key={index} />
			}) :
			null;

		return (
			<div>
				{orders}
			</div>
		);
	}
}

export default ErrorHandler(Orders, axios);