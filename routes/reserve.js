var transporter = require("../src/js/nodeMailer");
var mail = require("./mail");

module.exports ={
	post: (req, res, next) => {
		if(!req.body){
			var err = new Error("Данные не пришли");
			err.status = 400;
			return next(err);
		}else{
			var data = req.body;
			res.render("reserve", {layout: null, data: req.body} , function(err, html){
				if(err) console.log("Ошибка в переданных данных!");
					mail.reserve(data, html, res);
			})
		}
	}
}