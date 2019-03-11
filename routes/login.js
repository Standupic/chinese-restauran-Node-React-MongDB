var User = require('../models/user');

module.exports = {
	login: (req, res, next) => {
		res.render('login',{
			css: ['_main.min.css']
		})
	},
	logOut: (req, res, next) =>{
		if(req.session){
			req.session.destroy(function(err){
				if(err){
					return next(err);
				}else{
					return res.redirect('/')
				}
			})
		}
	},
	post: (req, res, next) =>{
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
	}
}