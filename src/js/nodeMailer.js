import nodeMailer from "nodemailer"

let transporter = nodeMailer.createTransport("SMTP",{
	service: 'gmail',
	secure: false,
	port: 25,
	auth: {
		user: "satndupic87@gmail.com",
		pass: "5827ifyz"
	},
	tls: {
		rejectUnauthorized: false
	}
});

module.exports = transporter;