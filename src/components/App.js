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
		basket: []
	}
	takeDish = (id) =>{
		this.setState({
	 		currentDish: collection.filter(this.state.dishes, {'category': id})
		})
	}
	decrement = (id) =>{
		this.setState({
			basket: this.state.basket.map((dish)=>{
				if(dish._id == id){
					return Object.assign({},dish,{quantity: --dish.quantity})
				}else{
					return dish
				}
			})
		})
	}
	toBasket = (id) =>{
		const index = array.findIndex(this.state.dishes, function(o){
			if(o._id == id){
				o['quantity'] = 1
				return o._id
			}
		})
		this.setState(prevState => {
			basket: prevState.basket.push(this.state.dishes[index])
			})

		this.forceUpdate()

		}
		
	render(){ 
		return(
			<div>
				<Menu dishes={this.state.dishes} 
					  currentDish={this.state.currentDish}
					  takeDish={this.takeDish}
					  toBasket={this.toBasket} 
					  decrement={this.decrement}/>

				{(this.state.basket.length > 0) ? <Basket product={this.state.basket}/> : null}
			</div>
		)
	}
}

module.exports = App;
