import { Router } from "express";

const router = Router();

router.get('/',(req,res)=>{
    res.render('Home');
})

router.get('/users',(req,res)=>{
    res.render('Users');
})

router.get('/register',(req,res)=>{
    res.render('Register')
})

router.get('/login', (req,res)=>{
    res.render('Login')
})

router.get('/profile',(req,res)=>{
    res.render('Profile')
})

export default router;