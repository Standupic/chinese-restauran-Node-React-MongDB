import React from 'react'
import ReactDom from 'react-dom'
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import $ from 'jquery'
import InputMask from 'react-input-mask'
import axios from 'axios'




class Form extends React.Component{
	state = {
		show: false
	}
	componentDidMount = ()=>{
		var me = this
		if(this.props.form){
			setTimeout(function(){
				me.setState({
					show: true
				})
			},300)
		}
	}
	componentWillReceiveProps(update) {
    	this.setState({ show: update.value });
  	}
  	onFormSubmit = (evt)=>{
  		evt.preventDefault();
  		var data = {
  			name: evt.target.name.value,
  			phone: evt.target.phone.value,
  			street: evt.target.street.value,
  			home: evt.target.home.value,
  			port: evt.target.port.value,
  			intercom: evt.target.intercom.value,
  			flat: evt.target.flat.value,
  			email: evt.target.email.value,
  			area: evt.target.area.value,
  			basket: this.props.basket,
  			total: this.props.total,
  		}
  	

  	this.props.close()
  	sessionStorage.clear()

  	axios.post("/deliver",{
  			  content: data
  	}).then(res=>{
  		if(res.status == 200){
  			this.props.refresh()
  		}
  	}).catch(error=>{
  		alert("Заказ не был отправлен!")
  	})

  	}
	render(){
		return(
			<div id="popover" className={this.state.show ? "slideIn" : "slideOut"}>
				<div id="box" className={this.state.show ? "slideIn" : "slideOut"}>	
					<div className="out" onClick={this.props.close}>
						&times;
					</div>
					<h3>Оформление заказа</h3>
					<form action="deliver" method="POST" id="form" onSubmit={this.onFormSubmit}>
						<div className="top_input">
							<input type="text" name="name" value={this.props.user.userName ? this.props.user.userName : null} placeholder="Ваше имя" required/>
							<InputMask name="phone" value={this.props.user.phone ? this.props.user.phone : null} mask="+7 (999) 999-99-99" placeholder="Ваш телефон"/>
						</div>
						<div className="street">
							<input type="text" name="street" value={this.props.user.street ? this.props.user.street : null} placeholder="Название улицы" required/>
						</div>
						<div className="adress">
							<input type="text" name="home" value={this.props.user.home ? this.props.user.home : null} placeholder="Дом" required/>
							<input type="number" name="port" value={this.props.user.port ? this.props.user.port : null} placeholder="Подьезд" required/>
							<input type="text" name="intercom" value={this.props.user.intercom ? this.props.user.intercom : null} placeholder="Домофон"/>
							<input type="number" name="flat" value={this.props.user.flat ? this.props.user.flat : null} placeholder="Квр." required/>	
							<input type="email" name="email" value={this.props.user.email ? this.props.user.email : null} placeholder="Почта" required/>		
						</div>
						<div className="description">
							<textarea placeholder="Примечания к заказу" name="area" id="" cols="30" rows="5"></textarea>
						</div>
						<button type="submit">Отправить</button>
					</form>	
				</div>
			</div>
		)
	}
}


module.exports = Form;