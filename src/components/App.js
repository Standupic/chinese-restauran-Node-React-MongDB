import React from 'react';
import ReactDom from 'react-dom'
import axios from 'axios'
import Menu from './Menu'

class App extends React.Component {
	render(){
		return(
			<div>
				<Menu />
			</div>
		)
	}
}

module.exports = App;