import React from 'react';
import array from 'lodash/array'
import Dish from './Dish'

class Menu extends React.Component{
	takedish = (id) =>{
		return () => {
			this.props.takeDish(id)
		}
	}
	takeAllDish = () =>{
		this.props.takeAllDish()
	}
	toBasket = (id) =>{
		this.props.toBasket(id)
	}
	decrement = (id) =>{
		this.props.decrement(id)
	}
	increment = (id) =>{
		this.props.increment(id)
	}
	render(){
		const dish = this.props.category.map((dish,key)=>{
			return(
				<li key={key}><a href="#" onClick={this.takedish(dish.category)} itemProp="hasMenu" itemProp="name">{dish.dish}</a></li>
			)
		})
		return(
			<div>
				<h1>Meню</h1>
				<div className="toogle" itemScope itemType="http://schema.org/Restaurant">
					<ul>
						<li className="active" data-menu="deliver" onClick={this.takeAllDish}>
							<img src="../img/rezerv_stolik.svg" width="50" alt="Основное меню"/><span itemProp="hasMenu">Меню доставки</span>
						</li>
					</ul>
				</div>
				<div className="deliver_menu" itemScope itemType="http://schema.org/Restaurant">
					<ul>
						{dish}
					</ul>
				</div>
					<Dish items={(this.props.currentDish.length == 0) ? this.props.dishes : this.props.currentDish} 
						  toBasket={this.toBasket} 
						  decrement={this.decrement}
						  increment={this.increment}/>
			</div>
		)
	}
}

module.exports = Menu;