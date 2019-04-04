var transporter = require("../src/js/nodeMailer")

module.exports = {
	options: {
		from: '"Саперави" saperaviluberzy@gmail.com',
	  	generateTextFromHtml: true,
	},
	reserve: (data, html, res) => {  
		var self = module.exports;
		self.options.html = html;
		self.options.to = 'saperaviluberzy@gmail.com';
		self.options.subject = "Резерв или организация мероприятия"
			transporter.sendMail(self.options,(error, info)=>{
			if(error){
				var err = new Error("Резерв не отправился!")
				err.status = 400;
				return next(err);
			}else{
				res.send("Success")
			}
		})
	},
	order: (data, html, res) => {  
		var self = module.exports;
		self.options.html = html;
		self.options.to = 'saperaviluberzy@gmail.com';
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