import React from 'react';
import array from 'lodash/array'
import Dish from './Dish'

class Menu extends React.Component{
	takedish = (id) =>{
		return () => {
			this.props.takeDish(id)
		}
	}
	toBasket = (id) =>{
		this.props.toBasket(id)
	}
	decrement = (id) =>{
		this.props.decrement(id)
	}
	render(){
		const uniq = array.uniqBy(this.props.dishes, 'category')
		const dish = uniq.map((dish)=>{
			return(
				<li key={dish.category}><a href="#" onClick={this.takedish(dish.category)} itemProp="hasMenu" itemProp="name">{dish.dish}</a></li>
			)
		})
		return(
			<div>
				<div className="deliver_menu" itemScope itemType="http://schema.org/Restaurant">
					<ul>
						{dish}
					</ul>
				</div>
					{(this.props.currentDish.length === 0) ? 

					<Dish items={this.props.dishes} toBasket={this.toBasket} decrement={this.props.decrement}/> 
					: 
					<Dish items={this.props.currentDish} toBasket={this.toBasket} decrement={this.props.decrement}/>
				}
			</div>
		)
	}
}

module.exports = Menu;