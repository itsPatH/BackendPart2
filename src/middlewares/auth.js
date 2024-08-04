const authMiddleware = (req,res,next)=>{
    if(!req.session.user){
        return res.status(401).send({status:"error", error:"Not logged"})
    }
    if(req.session.user.role==="admin"){
        return res.status(403).send({status:"error", error:"You don't have permission to access"})
    }
    next();
}

export default authMiddleware;