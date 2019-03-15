import nodeMailer from "nodemailer"

let transporter = nodeMailer.createTransport({
	host: 'smtp.gmail.com',
	secure: false,
	port: 25,
	auth: {
		user: "satndupic87@gmail.com",
		pass: "5827Ifyz87"
	},
	tls: {
		rejectUnauthorized: false
	}
});

module.exports = transporter;