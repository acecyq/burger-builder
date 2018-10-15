import React from 'react';
import Burger from  '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

// checkout summary is shown when user has confirmed to checkout with his burger order
export default props => {
	return (
		<div className={classes.CheckoutSummary}>
			<h1>We hope it tastes well!</h1>
			<div style={{width : '100%', margin : 'auto'}}>
				<Burger ingredients={props.ingredients}/>
				<Button btnType="Danger" click={props.cancelCheckout} >
					CANCEL
				</Button>
				<Button btnType="Success" click={props.continueCheckout} >
					CONTINUE
				</Button>
			</div>
		</div>
	);
}
