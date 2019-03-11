var User = require('../models/user');

module.exports = {
	registration: (req, res, next)=>{
		res.render('registration',{
			css:['_main.min.css']
		})
	},
	post: (req, res, next)=>{
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
	}
}