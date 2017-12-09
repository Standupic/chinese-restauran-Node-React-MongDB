import React from "react"
import ReactDOMServer from "react-dom/server"

import axios from 'axios'
import config from './config'

import App from "./src/components/App.js"
import array from 'lodash/array'


const serverRender = () => 
	axios.get(`${config.serverUrl}/api/dishes`)
		.then(resp =>{
			return ReactDOMServer.renderToString(
				   <App initialContests={resp.data.dishes} category={array.uniqBy(resp.data.dishes, 'category')}/>
				)
		})

export default serverRender 