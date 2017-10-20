import React from 'react'
import ReactDom from 'react-dom'

class Basket extends React.Component{
	render(){
		<section className="basket">
			<div className="container">
				<div className="wrap_basket">
					<div className="wrap_items">
						<div className="item">
							<img src="../img/recycle.svg" alt=""><!-- <span class="order">1</span> -->
							<div class="mobile"><span class="order"></span></div>
							<div class="desktop"><span>Количество заказов: <em class="order">1</em></span><a href="#" class="show">показать</a></div>
						</div>
						<div class="item">
							<span class="total">360</span><em>₽</em>
							<button class="send_order">Оформить заказ</button>
						</div>
					</div>
					<div class="wrap_list" id="list">
						<script id="template_list" type="text/x-handlebars-template">
							{{#each list}}
								<div class="item" itemscope itemtype="http://schema.org/Restaurant">
									<ul>
										<li class="name" itemprop="name" itemprop="hasMenu">{{name}}</li>
										<li class="gramm">{{gramm}}</li>
										<li class="{{_id}} quanti"><em>Количество</em>
										<img src="../img/minus.svg" class="decrement" data-id={{_id}} data-context="list" data-flow="dishes" alt=""/>
											<div class="quantity">
												<span class="{{_id}}">{{quantity}}</span>
											</div>
										<img src="../img/plus.svg" data-context="list" data-flow="dishes" class="increment" data-id={{_id}} alt=""/>
										</li>
										<li class="price">{{price}} ₽</li>
										<li data-id="{{_id}}" data-flow="dishes" class="delete">удалить</li>
									</ul>
								</div>
							{{/each}}
						</script>	
					</div>
				</div>
		</section>
	}
}