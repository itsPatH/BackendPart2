import { Router } from "express";
import cookieParser from 'cookie-parser';

const router = Router();

router.use (cookieParser('gu4r1p0l0'));

router.get('/cookie', (req,res)=>{
    res.cookie('qki',13).send("Cookieee");
    
})

router.get('/cookievalue',(req,res)=>{
  console.log(req.signedCookies);
  res.send(req.cookies);
})

router.get('/cookieD-Y-I-N-G', (req, res) => {
    res.cookie('cookieRIP', 'dasdasdasda', { maxAge: 1000 * 10 }).send("F por la cookie");
});


router.get('/cookieuserlogin',(req, res)=>{
    const user= {
    firstName:'Patricia',
    lastName: 'H',
    role: 'user'}
    res.cookie('user', user, {signed:true}).send('Login was succesful');
})

router.get('/cookieuserlogout', (req,res)=>{
  res.clearCookie('user', user).send("Logout was succesful");
})

export default router;