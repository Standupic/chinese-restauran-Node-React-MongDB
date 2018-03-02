import config from "./config";
import path from "path";
import express from "express";
import apiRouter from './api';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import session  from 'express-session';

var MongoStore = require('connect-mongo')(session);

const server = express(); 

// DB server
// mongodb://localhost:27017/china 

mongoose.connect("mongodb://localhost/china",{
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});

var db = mongoose.connection;

server.use(session({ // option session
  secret: "treehouse loves you",
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

server.use(function(req, res, next){
	res.locals.currentUser = req.session.userId;
	next()
})

db.on('error', console.error.bind(console, 'connection error:'));


server.use(express.static(__dirname + '/public'))

server.use('/api', apiRouter);

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

var handlebars = require("express-handlebars").create(
	{
	 defaultLayout:'base', 
	 LayoutsDir: __dirname + '/views/layouts',
	 extname:"hbs",
	 helpers: {
	 	section: function (name, options) {
	 		if(!this._sections[name]) this._sections = {};
	 		this._sections[name] = options.fn(this);
	 		return null
	 	}
	 }
	}
);

server.engine("hbs", handlebars.engine)
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'hbs')


// import serverRender from './serverRender';

var routes = require('./routes/index');

server.use('/',routes); 

server.use(function(err,req,res,next){ // обработчик ошибок
	res.status(err.status || 500);

	var obj = {
		message:err.message,
		error:{},
		css:['_main.min.css']
	}

	if(err.name === 'login'){
		obj.login = true;
	}
	
	res.render('error',obj);
});

server.listen(config.port,config.host,()=>{
	console.log("express listening on port", config.port)
});