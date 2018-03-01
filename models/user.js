var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

// Схема
var UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true,
		lowercase: true
	},
	password:{
		type: String,
		required: true
	},
	order: [{dish: String, gramm: Number, count: Number, price: Number}]

},{emitIndexErrors: true})

//middleware before save data in DB

UserSchema.pre('save', function(next){
	var user = this; // link to Schema
	bcrypt.hash(user.password, 10, function(err, hash){
		if(err){
			return next(err);
		}
		user.password = hash
		next()
	})

})

UserSchema.statics.authentication = function(email, password, callback){
	User.findOne({"email": email}) // запрос к базе
		.exec(function(error,user){ // callback по запросу к базе
			if(error){ // обработки ошибок на строне базы
				return callback(error);
			}else if(!user){
				var err = new Error("Пользователь не найден!")
				err.status = 401;
				return callback(err)
			}
			bcrypt.compare(password, user.password, function(error, result){
				if(result === true){
					return callback(null, user)
				}else{
					return callback()
				}
			})
		})
}

var handleE11000 = function(error, res, next){
	if(error.name === 'MongoError' && error.code === 11000){
		next(new Error("Такой пользователь уже существует!"))
	}else{
		next();
	}
};


UserSchema.post('save',handleE11000)


var User = mongoose.model("User", UserSchema);
module.exports = User;