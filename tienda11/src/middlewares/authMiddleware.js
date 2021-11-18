let authMiddleware = (req,res,next)=>{
    if(!req.session.userLogged){
        return  res.redirect('/ingreso')
    }else{
        next();
    }
}

module.exports = authMiddleware;