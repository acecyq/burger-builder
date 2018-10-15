import React, { Component, Fragment } from 'react';
// import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
	state = {
		show : false
	}

	closeSideDrawer = () => {
		this.setState(prevState => { 
			return { show : !prevState.show };
		});
	}

	render() {
		return (
			<Fragment>
				<Toolbar click={this.closeSideDrawer} />
				<SideDrawer show={this.state.show} close={this.closeSideDrawer} />
				<main className={classes.Content}>
					{this.props.children}
				</main>
			</Fragment>
		);
	}
}

export default Layout;