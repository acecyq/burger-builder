import React from 'react';
import classes from './Button.css';

const Button = (props) => {
	let disabled;
	if (props.formValid === undefined || props.formValid === true) {
		disabled = false;
	} else if (props.formValid === false) {
		disabled = true;
	}

	return (
		<button
			className={[classes.Button, classes[props.btnType]].join(' ')}
			onClick={props.click}
			disabled={disabled}
		>
			{props.children}
		</button>
	);
}

export default Button;