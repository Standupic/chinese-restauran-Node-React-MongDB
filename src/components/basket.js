import React from 'react'
import ReactDom from 'react-dom'

class Basket extends React.Component{
	render(){
		console.log(this.props.product,"basket")
		const product = this.props.product.map((dish)=>{
			return(
				<ul key={dish._id}>
					<li className="name" itemProp="name" itemProp="hasMenu">{dish.name}</li>
					<li className="gramm">{dish.gramm}</li>
					<li className="quanti"><em>Количество</em>
					<img src="../img/minus.svg" className="decrement" alt=""/>
						<div className="quantity">
							<span>{dish.quantity}</span>
						</div>
					<img src="../img/plus.svg" className="increment" alt=""/>
					</li>
					<li className="price">{dish.price} ₽</li>
					<li className="delete">удалить</li>
				</ul>
			)
		})
		return(
		<section className="basket">
			<div className="container">
				<div className="wrap_basket">
					<div className="wrap_items">
						<div className="item">
							<img src="../img/recycle.svg" alt=""/>
							<div className="mobile"><span className="order"></span></div>
							<div className="desktop"><span>Количество заказов: <em className="order">{this.props.product.length}</em></span><a href="#" className="show">показать</a></div>
						</div>
						<div className="item">
							<span className="total">360</span><em>₽</em>
							<button className="send_order">Оформить заказ</button>
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