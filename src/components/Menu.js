import React from 'react';
// import array from 'lodash/array'
import Dish from './Dish'

class Menu extends React.Component{
	takedish = (id) =>{
		return () => {
			// id
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
		const dishA= this.props.category.map((dish,key)=>{
			if(key <= 6){
				return(
					<li key={key}><a onClick={this.takedish(dish.category)} itemProp="hasMenu" itemProp="name">{dish.dish}</a></li>
				)
			}
		})
		const dishB = this.props.category.map((dish,key)=>{
			if(key >=7){
				return(
					<li key={key}><a onClick={this.takedish(dish.category)} itemProp="hasMenu" itemProp="name">{dish.dish}</a></li>
				)
			}
		})
		return(
			<div>
				<h1>Meню</h1>
				<div className="toogle" itemScope itemType="http://schema.org/Restaurant">
					<ul>
						<li className="active" data-menu="deliver" onClick={this.takeAllDish}>
							<img src="../img/rezerv_stolik.svg" width="50" alt="Меню доставки"/><span itemProp="hasMenu">Меню доставки</span>
						</li>
					</ul>
				</div>
				<div className="deliver_menu" itemScope itemType="http://schema.org/Restaurant">
					<ul>
						{dishA}
					</ul>
					<ul>
						{dishB}
					</ul>
				</div>
					<Dish items={this.props.dishes}
						  id={this.props.id}
						  toBasket={this.toBasket}
						  decrement={this.decrement}
						  increment={this.increment}/>
			</div>
		)
	}
}

module.exports = Menu;