import serverRender from '../serverRender';

var User = require('../models/user');
var Order = require('../models/order');
var transporter = require("../src/js/nodeMailer");
var mail = require("./mail");

module.exports = {
	user: (req, res, next) => {
		if(req.session.userId){
			User.findOne(
			{'_id': req.session.userId},
			function(err, user){
				if(err){
					return next(err)
				}else{
					res.send(user)
				}
			})
		}else{
			return res.send({})
		}
	}, 
	post: (req, res, next) => {

		if(req.session.userId){

			User.findByIdAndUpdate(
				req.session.userId,
				{$set:{"street": req.body.content.street,
					   "phone":   req.body.content.phone,
					   "home" :   req.body.content.home,
					   "port":    req.body.content.port,
					   "flat":    req.body.content.flat,
					   "intercom":req.body.content.intercom,
					   "date": req.body.content.date,
					},
				},
				{safe: true, upsert: true, new: true},
				function(err,model){
					if(err){
						return next(err)
					}else{
						// console.log("User updated")
					}
				})

			Order.create({
				userId: req.session.userId,
				listItem: req.body.content.basket,
				total: req.body.content.total,
				date: new Date().toLocaleString('ru',{ year: "numeric",
  												   month: "numeric", 
  												   day: "numeric", 
  												   timezone: "UTC"
  												})
			},
			function(err, order){
				if(err){
					return next(err)
				}else{
					// console.log("oder created")
				}
			})
		}

	if(!req.body.content){
		var err = new Error("Данные не пришли");
	}else{
			var data = req.body.content;

			res.render("order", {layout: null, data: data} , function(err, html){
				if(err) console.log("Ошибка в шаблоне письма!");
					mail.order(data, html, res);
			})
			
			res.render("confirm", {layout: null, data: data}, function(err, html){
				if(err) console.log("Ошибка в шаблоне письма!");
					mail.confirm(data, html, res);

			})
		}
	},
	deliver: (req,res, next) => {
		serverRender()
		.then(content =>{
				res.render('deliver',{
					content: content,
					mainPage: false,  
					js: ['js/deliver.js','js/react.js'],
					css: ['_deliver.min.css',"_side_menu.min.css"]
				})
		})
		.catch(console.error)
	}	
}// end module

