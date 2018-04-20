var mongoose = require("mongoose");

var orderSchema = new mongoose.Schema({
	userId: String,
	listItem: {type: Array, "default": []},
	total: Number,
	date: String,
},{emitIndexErrors: true})



var Order = mongoose.model("Order", orderSchema);


module.exports = Order;