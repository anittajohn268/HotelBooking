import express from "express";

const router = express.Router();

router.get("/",(req,res)=>{
    res.send("Hello, this is auth end point")
})


router.get("/register",(req,res)=>{
    res.send("Hello, this is register end point")
})


export default router