import React from 'react'
import ReactDom from 'react-dom'
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import $ from 'jquery'
import InputMask from 'react-input-mask'
import axios from 'axios'
// import transport from '../js/nodeMailer'



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

  // 		let transporter = nodeMailer.createTransport({
		// 	service: 'gmail',
		// 	secure: false,
		// 	port: 25,
		// 	auth: {
		// 		user: "satndupic87@gmail.com",
		// 		pass: "5827ifyz"
		// 	},
		// 	tls: {
		// 		rejectUnauthorized: false
		// 	}
		// });

  		var data = {
  			name: evt.target.name.value,
  			phone: evt.target.phone.value,
  			street: evt.target.street.value,
  			home: evt.target.home.value,
  			port: evt.target.port.value,
  			intercom: evt.target.intercom.value,
  			flat: evt.target.flat.value,
  			area: evt.target.area.value,
  			basket: this.props.basket
  		}
  		// var options = {
  		// 	from: 'satndupic87@gmail.com',
  		// 	to: 'frontendmasterru@gmail.com',
  		// 	subject: "fucking you",
  		// 	text: `${data.name},${data.phone}`
  		// } 
  		// transporter.sendMail(options,(error, info)=>{
  		// 	if(error){
  		// 		console.log(error)
  		// 	}
  		// 	console.log("The message was sent")
  		// 	console.log(info);
  		// })

  	

  	this.props.close()
  	sessionStorage.clear()

  	axios.post("/deliver",{
  			  content: data
  	}).then(res=>{
  		console.log(res)
  		if(res.status == 200){
  			this.props.refresh()


  		}
  	}).catch(error=>{
  		console.log(error)
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
								<input type="text" name="name" placeholder="Ваше имя" required/>
								<InputMask name="phone" mask="+7 (999) 999-99-99" placeholder="Ваш телефон"/>
							</div>
							<div className="street">
								<input type="text" name="street" placeholder="Название улицы" required/>
							</div>
							<div className="adress">
								<input type="text" name="home" placeholder="Дом" required/>
								<input type="number" name="port" placeholder="Подьезд" required/>
								<input type="text" name="intercom" placeholder="Домофон"/>
								<input type="number" name="flat" placeholder="Квр." required/>			
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