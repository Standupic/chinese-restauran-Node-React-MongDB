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
	}
);

server.engine("hbs", handlebars.engine)
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'hbs')


// import './serverRender';


server.get('/',(req,res)=>{
	res.render("deliver")
})

server.get("/about",(req,res)=>{
	res.send("Hello Express")
})

server.listen(config.port,()=>{
	console.log("express listening on port", config.port)
})