import React, { Component, Fragment } from 'react';
import Modal from '../../components/UI/Modal/Modal';

// higher order component which wraps components running http requests
// when errors occur, axios interceptors will catch errors and show in a modal
export default (Wrapped, axios) => (
	class extends Component {
		state = {
			error : null
		}

		componentWillMount() {
			this.reqInterceptors = axios.interceptors.request.use(req => {
				this.setState({ error : null });
				return req;
			});
			this.resInterceptors = axios.interceptors.response.use(res => res, err => {
				this.setState({ error : err });
			});
		}

		componentWillUnmount() {
			axios.interceptors.request.eject(this.reqInterceptors);
			axios.interceptors.response.eject(this.resInterceptors);
		}

		errorConfirm = () => {
			this.setState({ error : null });
		}

		render() {
			return (
				<Fragment>
					<Modal 
						checkOut={this.state.error}
						click={this.errorConfirm}
					>
						<p>{this.state.error ? this.state.error.message : null}</p>
					</Modal>
					<Wrapped {...this.props} />
				</Fragment>
			);
		}
	}
);