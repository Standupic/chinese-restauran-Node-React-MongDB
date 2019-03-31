var express = require('express');
var router = express.Router();
var deliver = require('./deliver');
var profile = require('./profile');
var login = require('./login');
var registration = require("./registration");
var User = require('../models/user');
var Order = require('../models/order');
var transporter = require("../src/js/nodeMailer")
var mongoose = require("mongoose");

router.get("/", function(req,res){
	res.render('main', { 
				js:['js/common.js','js/libs.js','https://api-maps.yandex.ru/2.1/?lang=ru_RU'], 
				css:['_main.min.css','owl.carousel_min.css']
				})
})

router.get('/deliver/user', deliver.user);

router.get('/deliver', deliver.deliver);

router.post('/deliver', deliver.post);

router.get('/profile', profile.profile);

router.get('/profile/:userid', profile.userId);

router.get('/profile/repeat/:orderid', profile.orderId)

router.get('/login', login.login);

router.post('/login', login.post);

router.get('/logout', login.logOut)

router.get('/registration', registration.registration);

router.post('/registration', registration.post);

module.exports = router;