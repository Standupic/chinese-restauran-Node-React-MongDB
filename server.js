import config from "./config";
import path from "path";
import express from "express";
import apiRouter from './api';

const server = express();

server.use(express.static(__dirname + '/public'))
server.use('/api', apiRouter);

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


import serverRender from './serverRender';


server.get("/",(req,res)=>{
	res.render('main', { 
				js:['js/libs.js','https://api-maps.yandex.ru/2.1/?lang=ru_RU'], 
				css:['_main.min.css','owl.carousel_min.css']
				})
})

server.get('/deliver',(req,res)=>{
	serverRender()
		.then(content =>{
			res.render('deliver',{
				content: content,
				js: ['js/react.js'],
				css: ['_deliver.min.css']
			})
		})
		.catch(console.error)
})
server.listen(config.port,config.host,()=>{
	console.log("express listening on port", config.port)
})