import axios from 'axios';

export default axios.create({
	baseURL : 'https://reactberger.firebaseio.com/'
})