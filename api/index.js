import express from 'express';
import data from "../src/dishes";

const router = express.Router();

router.get("/dishes", (req,res)=>{
	res.send({dishes: data})
})

export default router