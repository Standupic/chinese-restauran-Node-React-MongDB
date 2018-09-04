var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Order = require('../models/order');
var transporter = require("../src/js/nodeMailer")
var mongoose = require("mongoose");


import serverRender from '../serverRender';

router.get("/", function(req,res){
	res.render('main', { 
				js:['js/common.js','js/libs.js','https://api-maps.yandex.ru/2.1/?lang=ru_RU'], 
				css:['_main.min.css','owl.carousel_min.css']
				})
})

router.get('/deliver/user', (req,res, next)=>{
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
})



router.get('/deliver',(req,res, next)=>{
	serverRender()
		.then(content =>{
				res.render('deliver',{
					content: content,
					js: ['js/common.js','js/react.js'],
					css: ['_deliver.min.css']
				})
		})
		.catch(console.error)
})

router.post("/deliver",(req,res,next) =>{

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
						console.log("User updated")
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
					console.log("oder created")
				}
			})
		}

	if(!req.body.content){
		var err = new Error("Данные не пришли");
	}else{
		let data = req.body.content;

		var options = {
			from: '"China" satndupic87@gmail.com',
  			generateTextFromHtml: true,
		}

		res.render("order", {layout: null, data: data} , function(err, html){
			if(err) console.log("Ошибка в шаблоне письма!");
			options.html = html;
			options.to = 'frontendmasterru@gmail.com';
			options.subject = "Доставка"
				transporter.sendMail(options,(error, info)=>{
				if(error){
					var err = new Error("Заказ не отправился!")
					err.status = 400;
					return next(err);
				}else{
					res.send("Success")
				}
			})
		})
			
		res.render("confirm", {layout: null, data: data}, function(err, html){
			if(err) console.log("Ошибка в шаблоне письма!");
			
			options.to = data.email;
			options.subject = "Подтвержедния заказа Китайская стена";
			options.html = html
			transporter.sendMail(options,(error, info)=>{
				if(error){
					var err = new Error("Подтверждения не отправилось!")
					err.status = 400;
					return next(err);
				}else{
					res.send("Success confirm")
				}
			})

		})
	}
})



router.get('/profile', (req,res,next)=>{ // Данные пользователя
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
})
router.get('/profile/:userid', function(req, res){ // Список заказов 
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
})

router.get('/profile/repeat/:orderid', function(req, res){ // отп
	if(req.params.orderid){
		// console.log(req.params.orderid)
		var data = {
			order: "",
			user: ""
		}
		Order.findOne(
			{"_id": req.params.orderid},
			function(err, order){
				if(err){
					res.status(500)
				}else{
					res.status(200)

				}
			}

		)
	}
})
// LOGIN

//GET
router.get('/login', (req,res,next)=>{
	res.render('login',{
		css:['_main.min.css']
	})
})

//POST
router.post('/login', (req,res,next)=>{
	if(req.body.email && req.body.password){
		User.authentication(req.body.email, req.body.password, function(err, user){
			if(err || !user){
				var err = new Error("Неверный пароль или почта!")
				err.status = 401;
				err.name = 'login';
				return next(err)
			}else{
				req.session.userId = user._id; // Указываем сессию по ID из DB
				return res.redirect('/profile');
			}
		})
	}else{
		var err = new Error("Заполните все поля!");
		err.status = 400;
		err.name = 'login'
		return next(err);
	}
})

//LogOUT

//GET
router.get('/logout', function(req, res, next){
	if(req.session){
		req.session.destroy(function(err){
			if(err){
				return next(err);
			}else{
				return res.redirect('/')
			}
		})
	}
})

// REGISTRATION

//GET
router.get('/registration', (req,res,next)=>{
	res.render('registration',{
		css:['_main.min.css']
	})
})

//POST
router.post('/registration', (req,res,next)=>{
	if(req.body.name && req.body.email && req.body.password && req.body.confirmPassword){
		if(req.body.password !== req.body.confirmPassword){
			var err = new Error("Пароль не совпадает");
			err.status = 400;
			return next(err);
		}

		var userData = {
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
		}

		User.create(userData, function(error, user){
			if(error){
				return next(error)
			}else{
				req.session.userId = user._id; // Указываем сессию по ID из DB
				return res.redirect("/profile")
			}
		})

	}else{
		var err = new Error("Необходимо заполнить все поля!")
		err.status = 400;
		return next(err);
	}
})
// ORDER

module.exports = router;