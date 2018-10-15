import React, { Component, Fragment } from 'react';
import classes from './Modal.css';
// import Aux from '../../../hoc/Aux';
import BackDrop from '../BackDrop/BackDrop';

class Modal extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.checkOut !== this.props.checkOut || nextProps.children !== this.props.children;
	}

	render() {
		const modal = this.props.loading ? `${classes.Modal} ${classes.Center}` : classes.Modal;
		return (
			<Fragment>
				<BackDrop show={this.props.checkOut} click={this.props.click} />
				<div 
					className={modal}
					style={{
						transform : this.props.checkOut ? 'translateY(0)' : 'translateY(100vh)',
						opacity : this.props.checkOut ? '1' : '0'
					}}
				>
					{this.props.children}
				</div>
			</Fragment>
		);
	}
}

export default Modal;