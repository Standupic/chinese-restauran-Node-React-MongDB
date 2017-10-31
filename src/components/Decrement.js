import React from 'react'
import ReactDom from 'react-dom'

class Decrement extends React.Component{
	decrement = (id) =>{
		return ()=>{
			this.props.decrement(id)
		}
	}
	render(){
		return(
			<img src="../img/minus.svg" onClick={this.decrement(this.props.id)} className="decrement"/>
		)
	}
}

module.exports = Decrement