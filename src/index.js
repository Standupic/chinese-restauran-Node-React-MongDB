import React from 'react';
import ReactDom from 'react-dom'
import axios from 'axios'
import App from "./components/App"
import array from 'lodash/array'

axios.get('/api/dishes')
	.then(res => {
		ReactDom.hydrate(<App
				initialContests={res.data.dishes} category={array.uniqBy(res.data.dishes, 'category')}/>, 
				document.getElementById("app"))
		// this.setState({
		// 	dishes: res.data.dishes,
		// 	category: array.uniqBy(res.data.dishes, 'category')

		// })
	})
	.catch(console.error)	

// ReactDom.hydrate(<App
// 				initialContests={[]} category={[]}/>, 
// 				document.getElementById("app"))