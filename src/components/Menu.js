import React from 'react';
// import array from 'lodash/array'
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
	handlerSelect = (e)=>{
		this.props.takeDish(e.target.value*1)
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
		const dishes = [...dishA, ...dishB];
		const options = this.props.category.map((dish, key)=>{
			return(
				<option value={dish.category} key={key}>{dish.dish}</option>
			)
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
					<p className="select">
						<select onChange={this.handlerSelect}>
							<option>Выберите блюда</option>
							{options}
						</select>
					</p>
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