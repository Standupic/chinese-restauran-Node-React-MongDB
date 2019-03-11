var transporter = require("../src/js/nodeMailer")

module.exports = {
	options: {
		from: '"China" satndupic87@gmail.com',
	  	generateTextFromHtml: true,
	},
	order: (data, html, res) => {  
		var self = module.exports;
		self.options.html = html;
		self.options.to = 'frontendmasterru@gmail.com';
		self.options.subject = "Доставка"
			transporter.sendMail(self.options,(error, info)=>{
			if(error){
				var err = new Error("Заказ не отправился!")
				err.status = 400;
				return next(err);
			}else{
				res.send("Success")
			}
		})
	},
	confirm: (data, html, res) => {
		var self = module.exports;
		console.log(data)
		self.options.to = data.email;
		self.options.subject = "Подтвержедния заказа Китайская стена";
		self.options.html = html
		transporter.sendMail(self.options,(error, info)=>{
			if(error){
				var err = new Error("Подтверждения не отправилось!")
				err.status = 400;
				return next(err);
			}else{
				res.send("Success confirm")
			}
		})
	}
}