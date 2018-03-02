import express from 'express';
// import data from "../src/dishes";
import { MongoClient } from 'mongodb';
import assert from 'assert'; //show if do error mongo
import config from '../config';


let mdb;

let url = "mongodb://localhost:27017/china"

MongoClient.connect(url, function(err,db){
	assert.equal(null, err)
	mdb = db
})

const router = express.Router();

router.get("/dishes", (req,res)=>{
	mdb.collection("dishes").find({})
	.toArray(function(err, docs){
		assert.equal(null, err)
		res.send({dishes: docs})
	})
})

export default router