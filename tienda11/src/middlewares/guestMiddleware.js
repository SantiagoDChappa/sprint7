let guestMiddleware = (req,res,next)=>{
    if(req.session.userLogged){
        return  res.redirect('/usuario/'+ req.session.userLogged.id)
    }else{
        next();
    }
}

module.exports = guestMiddleware;