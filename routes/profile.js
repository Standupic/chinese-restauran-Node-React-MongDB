var User = require('../models/user');
var Order = require('../models/order');
var mail = require("./mail");

module.exports = {
	profile: (req,res,next) => {
		if(!req.session.userId){
				var err = new Error("Вы не аторизован!")
				err.status = 403;
				err.name = 'login';
				return next(err);
			}
		User.findById(req.session.userId)
			.exec(function(error,user){
				if(error){
					return next(error);
			}else{
				return res.render('profile',{
									title: "Личный кабинет",
									css: ['_main.min.css','_profile.min.css'],
									js: ['js/profile.js'],
									id: user._id,
									name: user.name,
									home: user.home,
									email: user.email,
									street: user.street,
									phone: user.phone,
									flat: user.flat,
									intercom: user.intercom,
									port: user.port})
			}
		})
	},
	userId: (req, res) => {
		console.log("Getting user orders");
		if(req.params.userid){
			Order.find(
			{'userId': req.params.userid},
			function(err, order){
				if(!err){
					console.log(order)
					res.json(order)
				}else{
					console.log(err)
					res.json({"status": "error", "error": "Error finding order"})
				}
			})
	}
	},
	orderId: (req, res, next) => {
		if(req.params.orderid){
		Order.findOne(
			{"_id": req.params.orderid},
			function(err, order){
				if(err){
					res.status(500)
				}else{
					User.findById(req.session.userId, function(error, user){
						if(error){
							return next(error)
						}else{
							user.basket = order.listItem
							user.total = order.total
							res.render("order", {layout: null, data: user} , function(err, html){
								if(err) console.log("Ошибка в шаблоне письма!");
									mail.order(user, html, res)
								
								})

							res.render("confirm", {layout: null, data: user}, function(err, html){
								if(err) console.log("Ошибка в шаблоне письма!");
									mail.confirm(user, html, res);
					
								})
							}
						})

					}

				}
			)
		}
	}
}