const UserModel = require('../models/User.js')

const userLoggedMiddleware = (req,res,next) => {
    res.locals.isLogged = false

    let emailUser= req.cookies.recordar
    let userFromCookies = UserModel.getUserByField('email', emailUser)

    if (userFromCookies) {
        req.session.userLogged = userFromCookies
    }

    if(req.session.userLogged){
        res.locals.isLogged = true
        res.locals.userLogged = req.session.userLogged
    }
    


   next();
}

module.exports = userLoggedMiddleware;