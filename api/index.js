import express from 'express';
// import data from "../src/dishes";
import { MongoClient } from 'mongodb';
import assert from 'assert'; //show if do error mongo
import config from '../config';


let mdb;

let url = "mongodb://standupic:1987svet@localhost:27017/admin"
//mongodb://standupic:1987svet@localhost:27017/admin

MongoClient.connect(url, function(err,db){
	assert.equal(null, err)
	mdb = db
})

const router = express.Router();

router.get("/dishes", (req,res)=>{
	mdb.collection("china").find({})
	.toArray(function(err, docs){
		assert.equal(null, err)
		res.send({dishes: docs})
	})
})

export default router