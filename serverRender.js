import axios from 'axios';
import config from './config';

axios.get(`${config.serverUrl}/api/dishes`)
	.then(resp =>{
		console.log(resp.data)
	})