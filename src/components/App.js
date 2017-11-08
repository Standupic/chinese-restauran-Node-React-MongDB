import React from 'react';
import ReactDom from 'react-dom'
import axios from 'axios'
import Menu from './Menu'
import Basket from './Basket'
import collection from 'lodash/collection'
import array from 'lodash/array'


class App extends React.Component{
	state = {
		dishes: [],
		currentDish: [],
		basket: [],
		category: [],
		total: 0
	}
	componentDidMount = () =>{
		axios.get('/api/dishes')
			.then(res => {
				this.setState({
					dishes: res.data.dishes,
					category: array.uniqBy(res.data.dishes, 'category')

				})
			})
			.catch(console.error)		
	}
	takeDish = (id) =>{
		this.setState({
	 		currentDish: collection.filter(this.state.dishes, {'category': id})
		})
	}
	takeAllDish = () =>{
		this.setState({
			currentDish: []
		})
	}
	crash = (id) =>{
		this.setState({
			basket: this.state.basket.filter(d => d._id !== id)
		})
	}
	crashFromBasket = (id) => {
		const index = array.findIndex(this.state.dishes, function(o){
			if(o._id == id){
				return o
			}
		})
		this.setState({
			dishes: this.state.dishes.map((dish)=>{
				if(dish._id == id){
					return Object.assign({},dish,{quantity: 0})
				}else{
					return dish
				}
			}),
			total: this.state.total - (this.state.dishes[index]['quantity'] * this.state.dishes[index]['price'])
		})
		this.crash(id)
	}
	decrement = (id) =>{
		const index = array.findIndex(this.state.basket, function(o){
			if(o._id == id){
				return o
			}
		})
		const indexD = array.findIndex(this.state.dishes, function(o){
			if(o._id == id){
				return o
			}
		})
		if(this.state.basket[index].quantity == 1){
			this.crash(id)
			this.setState({
				dishes: this.state.dishes.map((dish)=>{
					if(dish._id == id){
						return Object.assign({},dish,{quantity: dish.quantity - 1})
					}else{
						return dish
					}
				})
			})
		}else{
			this.setState({
				basket: this.state.basket.map((dish)=>{
					if(dish._id == id){
						return Object.assign({},dish,{quantity: dish.quantity - 1})
					}else{
						return dish
					}
				}),
				dishes: this.state.dishes.map((dish)=>{
					if(dish._id == id){
						return Object.assign({},dish,{quantity: dish.quantity - 1})
					}else{
						return dish
					}
				})
			})	
		}
		this.setState(prevState => {
			return{
				total: prevState.total - this.state.dishes[indexD]['price']
			}
		})
	}
	increment = (id) =>{
		const index = array.findIndex(this.state.dishes, function(o){
			if(o._id == id){
				return o
			}
		})
		this.setState({
				basket: this.state.basket.map((dish)=>{
					if(dish._id == id){
						return Object.assign({},dish,{quantity: dish.quantity + 1})
					}else{
						return dish
					}
				}),
				dishes: this.state.dishes.map((dish)=>{
					if(dish._id == id){
						return Object.assign({},dish,{quantity: dish.quantity + 1})
					}else{
						return dish
					}
				})
			})	
		this.setState(prevState => {
			return{
				total: prevState.total + this.state.dishes[index]['price']
			}
		})
	}
	toBasket = (id) =>{
		const index = array.findIndex(this.state.dishes, function(o){
			if(o._id == id){
				o.quantity = 1
				return o
			}
		})
			this.setState(prevState => {
				return{
					basket: prevState.basket.concat(this.state.dishes[index]),
					dishes: this.state.dishes,
					total:  prevState.total + this.state.dishes[index]['price']
				}
			})
		}
		
	render(){ 
		const dish = this.state.dishes.filter(t=> t)
		return(
			<div>
				<Menu dishes={this.state.dishes}
					  category={this.state.category} 
					  currentDish={this.state.currentDish}
					  takeDish={this.takeDish}
					  takeAllDish={this.takeAllDish}
					  toBasket={this.toBasket} 
					  decrement={this.decrement}
					  increment={this.increment}
					  basket={this.state.basket}/>

				{(this.state.basket.length > 0) ? <Basket product={this.state.basket}
														  total={this.state.total}
														  increment={this.increment}
														  decrement={this.decrement}
														  crashFromBasket={this.crashFromBasket}/> : null}
			</div>
		)
	}
}

module.exports = App;
