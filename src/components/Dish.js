import React from 'react'
import ReactDom from 'react-dom'

class Button extends React.Component{
	state = {
		active: false
	}
	toBasket = (id) =>{
		return ()=>{
			this.props.toBasket(id)
			this.setState({
				active: true
			})
		}
	}
	render(){
		return(
			<div className="button_active">
			{!this.state.active ?
					<button onClick={this.toBasket(this.props.id)}>Добавить в корзину</button>
				:
				<div className="button_active">
					<button className="hidden" onClick={this.toBasket(this.props.id)}>Добавить в корзину</button>
					<div className="quanti visible">
						<img src="../img/minus.svg" />
						<div className="quantity">
							<span className=""></span>
						</div>
						<img src="../img/plus.svg" data-context="dishes" className="increment" data-flow="list" data-id="" alt=""/>
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
	render(){
		const currentDishes = this.props.items.map((dish)=>{
			return(
				<div className="item" key={dish._id} itemScope itemType="http://schema.org/Restaurant">
					<div className="foto_dish"><img src={dish.img} alt="{name}" itemProp="photo" itemProp="hasMenu"/></div>
					<div className="caption">
						<p itemProp="name" itemProp="hasMenu">{dish.name}</p>
						<p itemProp="description">
							{dish.ingredient}
						</p>
						<p><span>{dish.price} ₽</span><em>
							{dish.gram ? "гр" : "шт"}
						</em></p>

							<Button id={dish._id} toBasket={this.toBasket}/>
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