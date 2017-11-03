import React from 'react';
import ReactDom from 'react-dom'
import axios from 'axios'
import Menu from './Menu'
import Basket from './Basket'
import collection from 'lodash/collection'
import array from 'lodash/array'


class App extends React.Component{
	state = {
		dishes: [
			{
			    "_id": "59875b4bd1986e66f589cc15",
			    "name": "Утка по-Пекински на двоих",
			    "price": 980,
			    "gramm": 200,
			    "ingredient": "Утка",
			    "img": "../img/deliver/Utka_po-pekinski2.jpg",
			    "dish": "Утка",
			    "category": 1
			  },
			  {
			    "_id": "59875b4b5c1d4f657150ed04",
			    "name": "Утка по-Пекински на четверых",
			    "price": 1950,
			    "gramm": 200,
			    "ingredient": "Утка",
			    "img": "../img/deliver/Utka_po-pekinski.jpg",
			    "dish": "Утка",
			    "category": 1
			  },
			  {
			    "_id": "59875b4b0af536087f710a13",
			    "name": "Жареная лепешка с луком",
			    "price": 150,
			    "gramm": 350,
			    "ingredient": "Лук, тесто",
			    "img": "../img/deliver/Lepeshka_s_lukom.jpg",
			    "dish": 'Ролл',
			    "category": 2
			  },
			  {
			    "_id": "59875b4ba229e48799c4e31a",
			    "name": "Салат Бар",
			    "price": 290,
			    "gramm": 280,
			    "ingredient": "Ассорти салатов, маринованных в китайских специях из провинции Сычуань",
			    "img": "../img/deliver/Salat_bar.jpg",
			    "dish": 'Салат',
			    "category": 3
			  },
			  {
			    "_id": "59875b4b659f82bd316b80d8",
			    "name": "Салат из свежих овощей",
			    "price": 220,
			    "gramm": 210,
			    "ingredient": "Огурец, айсберг, помидор, болгарский перец, кунжутное масло",
			    "img": "../img/deliver/Sakat_iz_ovoshey.jpg",
			    "dish": 'Салат',
			    "category": 1
			  }
		],
		currentDish: [],
		basket: [],
		category: [],
		total: 0
	}
	componentDidMount = () =>{
		this.setState({
			category: array.uniqBy(this.state.dishes, 'category')
		})		
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
	decrement = (id) =>{
		const index = array.findIndex(this.state.basket, function(o){
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
	}
	increment = (id) =>{
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
														  total={this.state.total}/> : null}
			</div>
		)
	}
}

module.exports = App;
