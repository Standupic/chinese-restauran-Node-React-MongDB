import React from 'react'
import ReactDom from 'react-dom'

class Increment extends React.Component{
	increment = (id) =>{
		return ()=>{
			this.props.increment(id)
		}
	}
	render(){
		return(
			<img src="../img/plus.svg" onClick={this.increment(this.props.id)} className="increment"/>
		)
	}
}

module.exports = Increment