import React from 'react'
import ReactDom from 'react-dom'
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import $ from 'jquery'
import InputMask from 'react-input-mask'
import axios from 'axios'
import transport from '../js/nodeMailer'


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
  			area: evt.target.area.value,
  			basket: this.props.basket
  		}
  		var options = {
  			from: 'satndupic87@gmail.com',
  			to: 'formyphp@mail.com',
  			subject: "fucking you",
  			text: `${data.name},${data.phone}`
  		} 
  		transport.sendMail(options,(error, info)=>{
  			if(error){
  				console.log(error)
  			}
  			console.log("The message was sent")
  			console.log(info);
  		})

  	// axios.post("/deliver",{
  	// 	content: data
  	// })

  	this.props.close()
  	sessionStorage.clear()
  	console.log(sessionStorage)
  	// console.log(data)
  		 // $.ajax({
     //        url: "/orderData.php",
     //        type: "POST",
     //        data: data,
     //        success: function(res){
                // console.log(res)
            // }
         // })

  		 // console.log(data)

  	}
	render(){
		return(
			<div id="popover" className={this.state.show ? "slideIn" : "slideOut"}>
				<div id="box" className={this.state.show ? "slideIn" : "slideOut"}>	
						<div className="out" onClick={this.props.close}>
							&times;
						</div>
						<h3>Оформление заказа</h3>
						<form action="" method="POST" id="form" onSubmit={this.onFormSubmit}>
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
							<a href="/order"><button type="submit">Отправить</button></a>
						</form>	
				</div>
			</div>
		)
	}
}


module.exports = Form;