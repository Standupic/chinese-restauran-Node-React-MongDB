import React from 'react'
import ReactDom from 'react-dom'
import axios from 'axios'
import Menu from './Menu'
import Basket from './Basket_'
import Form from './Form'
// import collection from 'lodash/collection'
import array from 'lodash/array'


class App extends React.Component{
	state = {
		dishes: this.props.initialContests,
		basket: [],
		category: this.props.category,
		total: 0,
		form: false,
		id: "",
		user: {
			userName: null,
			phone: null,
			street: null,
			home: null,
			port: null,
			intercom: null,
			flat: null,
			email: null
		}
	}
	componentDidMount = () =>{
		console.log('Did')
		if(sessionStorage.getItem('basket')){
			var basket = JSON.parse(sessionStorage.getItem('basket'))
			var total = 0;
			for(let i = 0; i < basket.length; i++){
				total += basket[i]['price'] * basket[i]['quantity']
			}
			this.setState({
				basket : JSON.parse(sessionStorage.getItem('basket')),
				total: total,
				dishes: JSON.parse(sessionStorage.getItem('dishes'))

			})
		}
		axios.get("/deliver/user")
			.then(res=>{
				if(!Object.keys(res.data).length) return
	  			this.setState({
	  				user: {
	  					userName: res.data.name,
	  					phone: res.data.phone,
						street: res.data.street,
						home: res.data.home,
						port: res.data.port,
						intercom: res.data.intercom,
						flat: res.data.flat,
						email: res.data.email
	  				}
	  			})
	  	})
		
	}

	helper = (array,id,type) => {
		var result = array.map((dish)=>{
			if(dish._id == id){
					if(type == 'inc'){
						return Object.assign({},dish,{quantity: dish.quantity + 1})
					}
					if(type == 'dec'){
						return Object.assign({},dish,{quantity: dish.quantity - 1})
					}
					
				}else{
					return dish
			}
		})
		var product = this.state.dishes.filter(d => d.quantity > 0);
		sessionStorage.setItem("basket", JSON.stringify(product));
		sessionStorage.setItem("dishes", JSON.stringify(result));
		return result
	}
	takeDish = (id) =>{
		console.log(id)
		this.setState({
	 		id: id
		})
	}

	takeAllDish = () =>{
		this.setState({
			id: ""
		})
	}

	crash = (id) =>{
		this.setState({
			basket : this.state.basket.filter(d => d._id !== id)
		})
		sessionStorage.setItem("basket", JSON.stringify(this.state.basket.filter(d => d._id !== id)))
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
		var dishes = this.state.dishes.map((dish)=>{
				if(dish._id == id){
					return Object.assign({},dish,{quantity: 0})
				}else{
					return dish
				}
			})
		this.crash(id)
		sessionStorage.setItem("dishes", JSON.stringify(dishes))
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
				dishes: this.helper(this.state.dishes,id,"dec")
			})
		}else{
			this.setState({
				basket: this.helper(this.state.basket,id,'dec'),
				dishes: this.helper(this.state.dishes,id,'dec'),

			})	
		}
		this.setState(prevState => {
			return{
				total: prevState.total - this.state.dishes[indexD]['price']
			}
		})
		sessionStorage.setItem("basket", JSON.stringify(this.state.basket.filter(d => d._id !== id)))
	}

	increment = (id) =>{
		const index = array.findIndex(this.state.dishes, function(o){
			if(o._id == id){
				return o
			}
		})
		this.setState({
				basket: this.helper(this.state.basket,id,'inc'),
				dishes: this.helper(this.state.dishes,id,'inc'),
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
			this.setState({
					basket: this.state.basket.concat(this.state.dishes[index]),
					dishes: this.state.dishes,
					total:  this.state.total + this.state.dishes[index]['price']
			})

			var product = this.state.dishes.filter(d => d.quantity > 0);
			var total = 0;
			for(var i = 0; i < product.length; i++){
				total += product[i]['price']
			}
			sessionStorage.setItem("basket", JSON.stringify(product));
			sessionStorage.setItem("total", total)
			sessionStorage.setItem("dishes", JSON.stringify(this.state.dishes))
			
	}
	form = ()=>{
		this.setState(prev => ({form: !prev.form}))

	}
	refresh = ()=>{
		this.setState({
			dishes: this.props.initialContests.map(function(dish){
				if(dish.quantity){
					delete dish.quantity
				}
				return dish
			}),
			basket: [],
			category: this.props.category,
			total: 0,
			form: false,
			id: ""
		})
	}
	closeForm = () =>{
		this.setState({
			form: false
		})
	}
	render(){
		const dish = this.state.dishes.filter(t=> t)
		return(
			<div>
				<Menu dishes={this.state.dishes}
					  id={this.state.id}
					  category={this.state.category} 
					  takeDish={this.takeDish}
					  takeAllDish={this.takeAllDish}
					  toBasket={this.toBasket} 
					  decrement={this.decrement}
					  increment={this.increment}
					  basket={this.state.basket}/>

				{(this.state.basket.length > 0) ? 
				<Basket product={this.state.basket}
						total={this.state.total}
						increment={this.increment}
						decrement={this.decrement}
						form={this.form}
						crashFromBasket={this.crashFromBasket}/> : null}

				{(this.state.form) ? 
				<Form form={this.state.form}
					   close={this.closeForm}
					   basket={this.state.basket}
					   total={this.state.total}
					   refresh={this.refresh}
					   user={this.state.user}
					   /> : null}										  
				
			</div>
		)
	}
}

module.exports = App;
