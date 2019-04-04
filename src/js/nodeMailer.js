import nodeMailer from "nodemailer"

let transporter = nodeMailer.createTransport({
	host: 'smtp.gmail.com',
	secure: false,
	port: 25,
	auth: {
		user: "saperaviluberzy@gmail.com",
		pass: "saperavi2019"
	},
	tls: {
		rejectUnauthorized: false
	}
});

module.exports = transporter;