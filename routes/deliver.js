import serverRender from '../serverRender';

var User = require('../models/user');
var Order = require('../models/order');
// var mongoose = require("mongoose");
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

			var options = {
				from: '"China" satndupic87@gmail.com',
	  			generateTextFromHtml: true,
			}

			res.render("order", {layout: null, data: data} , function(err, html){
				if(err) console.log("Ошибка в шаблоне письма!");
					mail.order(data,html, res);
				// options.html = html;
				// options.to = 'frontendmasterru@gmail.com';
				// options.subject = "Доставка"
				// 	transporter.sendMail(options,(error, info)=>{
				// 	if(error){
				// 		var err = new Error("Заказ не отправился!")
				// 		err.status = 400;
				// 		return next(err);
				// 	}else{
				// 		res.send("Success")
				// 	}
				// })
			})
			
			res.render("confirm", {layout: null, data: data}, function(err, html){
				if(err) console.log("Ошибка в шаблоне письма!");
					mail.confirm(data, html, res);
				// options.to = data.email;
				// options.subject = "Подтвержедния заказа Китайская стена";
				// options.html = html
				// transporter.sendMail(options,(error, info)=>{
				// 	if(error){
				// 		var err = new Error("Подтверждения не отправилось!")
				// 		err.status = 400;
				// 		return next(err);
				// 	}else{
				// 		res.send("Success confirm")
				// 	}
				// })

			})
		}
	},
	deliver: (req,res, next) => {
		serverRender()
		.then(content =>{
				res.render('deliver',{
					content: content,
					js: ['js/common.js','js/react.js'],
					css: ['_deliver.min.css']
				})
		})
		.catch(console.error)
	}	
}// end module

