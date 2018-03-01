import React from 'react'
import ReactDom from 'react-dom'
import Increment from './Inсrement'
import Decrement from './Decrement'

class Basket extends React.Component{
	state = {
		show: false
	}
	decrement = (id) =>{
		this.props.decrement(id)
	}
	increment = (id) =>{
		this.props.increment(id)
	}
	crash = (id) =>{
		return () =>{
			this.props.crashFromBasket(id)
		}
	}
	show = ()=>{
		this.setState({
			show: !this.state.show
		})
	}
	send = ()=>{
		this.props.form()
	}
	transform = ()=>{
		var a = 50 * this.props.product.length
		return `translateY(${a})px`
	}
	render(){
		const product = this.props.product.map((dish,key)=>{
			return(
				<ul key={key}>
					<li className="name" itemProp="name" itemProp="hasMenu">{dish.name}</li>
					<li className="gramm">{dish.gramm}</li>
					<li className="quanti"><em>Количество</em>

					<Decrement decrement={this.decrement} id={dish._id}/>

						<div className="quantity">
							<span>{dish.quantity}</span>
						</div>

					<Increment increment={this.increment} id={dish._id}/>
					</li>
					<li className="price">{dish.price} ₽</li>
					<li className="delete" onClick={this.crash(dish._id)}>удалить</li>
				</ul>
			)
		})
		return(
		<section className="basket" style={(!this.state.show) ? {transform: `translateY(${50*this.props.product.length}px)`} : {transform: `translateY(0px)`,transition: `transform .7s`}}>
			<div className="container">
				<div className="wrap_basket">
					<div className="wrap_items">
						<div className="item">
							<img src="../img/recycle.svg" alt=""/>
							<div className="mobile"><span className="order"></span></div>
							<div className="desktop"><span>Количество заказов: <em className="order">{this.props.product.length}</em></span><a className="show" onClick={this.show}>{(this.state.show ? "скрыть" : "показать")}</a></div>
						</div>
						<div className="item">
							<span className="total">{this.props.total}</span><em>₽</em>
							<button className="send_order" onClick={this.send}>Оформить заказ</button>
						</div>
					</div>
					<div className="wrap_list" id="list">
						<div className="item" itemScope itemType="http://schema.org/Restaurant">
							{product}
						</div>	
					</div>
				</div>
			</div>
		</section>
		)
	}
}

module.exports = Basket;