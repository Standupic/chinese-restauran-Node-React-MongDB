import React from 'react'
import ReactDom from 'react-dom'
import Increment from './Inсrement'
import Decrement from './Decrement'

class Button extends React.Component{
	toBasket = (id) =>{
		return ()=>{
			this.props.toBasket(id)
		}
	}
	decrement = (id) =>{
		this.props.decrement(id)
	}
	increment = (id) =>{
		this.props.increment(id)
	}
	render(){
		return(
			<div className="button_active">
			{!this.props.quantity ?
					<button onClick={this.toBasket(this.props.id)}>Добавить в корзину</button>
				:
				<div className="button_active">
					<button className="hidden" onClick={this.toBasket(this.props.id)}>Добавить в корзину</button>
					<div className="quanti visible">

						<Decrement id={this.props.id} decrement={this.decrement}/>

						<div className="quantity">
							<span className="">{this.props.quantity}</span>
						</div>

						<Increment id={this.props.id} increment={this.increment}/>

					</div>
				</div>
			}
			</div>
			
		)
	}
}


class Dish extends React.Component{
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
		const currentDishes = this.props.items.map((dish,key)=>{
			return(
				<div className={(dish.quantity) ? "active item" : "item"} key={dish._id} itemScope itemType="http://schema.org/Restaurant">
					<div className="foto_dish"><img src={dish.img} alt="{name}" itemProp="photo" itemProp="hasMenu"/></div>
					<div className="caption">
						<p itemProp="name" itemProp="hasMenu">{dish.name}</p>
						<p itemProp="description">
							{dish.ingredient}
						</p>
						<p><span>{dish.price} ₽</span><em>
							{dish.gram ? "гр" : "шт"}
						</em></p>

							<Button id={dish._id} 
									toBasket={this.toBasket} 
									quantity={dish.quantity} 
									decrement={this.decrement}
									increment={this.increment}/>
					</div>
				</div>
			)
		}) 
		return(
			<div className="wrap_items" id="dishes">
				{currentDishes}
			</div>
		)

	}
}

module.exports = Dish;