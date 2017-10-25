import React from 'react';
import ReactDom from 'react-dom'
import array from 'lodash/array'
import collection from 'lodash/collection'
import Dish from './Dish'

class Menu extends React.Component{
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
	takedish = (id) =>{
		return () => {
		 	this.setState({
		 		currentDish: collection.filter(this.state.dishes, {'category': id})
		 	})
		}
	}
	toBasket = (id) =>{
		const index = array.findIndex(this.state.dishes, function(o){
			return o._id == id 
		})
		console.log(index)
		this.setState(prevState => {
				basket: prevState.basket.push(this.state.dishes[index])
		})
		console.log(this.state.basket)
	}
	render(){
		console.log(this.state.currentDish.length === 0)
		const uniq = array.uniqBy(this.state.dishes, 'category')
		const dish = uniq.map((dish)=>{
			return(
				<li key={dish.category} onClick={this.takedish(dish.category)}><a href="#" itemProp="hasMenu" itemProp="name">{dish.dish}</a></li>
			)
		})
		return(
			<div>
				<div className="deliver_menu" itemScope itemType="http://schema.org/Restaurant">
					<ul>
						{dish}
					</ul>
				</div>
					{(this.state.currentDish.length === 0) ? 

					<Dish items={this.state.dishes} toBasket={this.toBasket}/> 
					: 
					<Dish items={this.state.currentDish} toBasket={this.toBasket}/>
				}
				{(this.state.currentDish.length === 0) ? console.log("empty") : console.log("not empty")}
			</div> 
		)
	}
}

module.exports = Menu;