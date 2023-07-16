
const Coder=require('../models/coder.js');
const cryptoJS=require('crypto-js');
const router=require('express').Router();
const pass_key='jkmo786@'
let user=false;
router.post('/register',async (req,res)=>{
    let newcoder=new Coder({
       username:req.body.username,
       email:req.body.email,
       password: cryptoJS.AES.encrypt(req.body.password,pass_key).toString()
       
    });

    try{
     let savedCoder=await newcoder.save();
     user=true;
     res.status(200).send(user);
    }catch(err){
        res.status(400).send(err);
    }
})

router.post('/login',async (req,res)=>{
    let username=req.body.username
    let password=req.body.password
    try{
      
        const coder= await Coder.findOne({username:req.body.username})
        !coder && res.status(400).json("wrong credential");
        const decryptedPass= cryptoJS.AES.decrypt(coder.password,pass_key);
        const password=decryptedPass.toString(cryptoJS.enc.Utf8);
        password!==req.body.password && res.status(400).json("wrong credential");
        user=true;
        res.status(200).send(user);
    }catch(err){
        res.status(500).json(err);
    }
})
module.exports=router;