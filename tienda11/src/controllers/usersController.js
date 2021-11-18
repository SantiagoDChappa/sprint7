const fs = require('fs')
const path = require('path')
const usersPath = path.join(__dirname,'../data/usuarios.json')
const { validationResult } = require('express-validator')
const UserModel = require('../models/User.js')
const bcryptjs = require('bcryptjs')

const listaUsersController = {
    listado: (req,res)=>{
        let usuarios = UserModel.getUsers()
        //console.log("usuarios: ", usuarios)
        res.render('listado-usuarios', { users: usuarios })
    },
    registro: (req,res) => {
        let usuarios = UserModel.getUsers()
        let errors = validationResult(req)
        if(errors.isEmpty()){
            //console.log("body: ", req.body)
            let userInDB = UserModel.getUserByField('email', req.body.email)
            if(userInDB){
                res.render('register', { errors: {email: {msg: 'Este email ya se encuentra registrado'}} })
            }else{
                let userNuevo = {
                    id: usuarios.length + 1,
                    name: req.body.name,
                    images: req.file.filename,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: bcryptjs.hashSync(req.body.password, 10),
                }
                UserModel.createUser(userNuevo)
                res.redirect('../ingreso')
            }
        }else{
            console.log("errores: ", errors)
            res.render('register', { errors: errors.mapped() })
        }
    },
    login: (req, res) => {
        let user = UserModel.getUserByField('email', req.body.email)
        if(user && bcryptjs.compareSync(req.body.password, user.password)){
            delete user.password
            req.session.userLogged = user

            if(req.body.recordar){
                res.cookie('recordar', req.body.email, { maxAge: (1000*60)*60 })
            }
            res.redirect('../usuario/'+user.id)
        }else{
            res.render('login', { errors: {login: {msg: 'Email o contraseña incorrectos'}} })
        }
    },
    logout: (req,res) => {
        res.clearCookie('recordar')
        req.session.destroy()
        res.redirect('../ingreso')
    },
    editarUsuario: (req,res)=>{
        let usuarios = UserModel.getUsers()
        let userEdicion = UserModel.getUserByID(req.params.id)
        if(userEdicion != undefined && userEdicion != null){
            res.render('editar-usuario', {user: userEdicion})
        }else{
            res.render('listado-usuarios', { users: usuarios })
        }
    },
    enviarUsuarioEditado: (req,res) => {
        let userNuevo = {
            id: req.params.id,
            name: req.body.name,
            images: req.file.filename,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10),
        }
        UserModel.editUser(userNuevo)
        res.redirect('../usuario/'+req.params.id)
    },
    borrarUsuario: (req,res) => {
        let usuarios = UserModel.getUsers()
        if(req.params.id != undefined){
            if(UserModel.deleteUser(req.params.id)){
                res.redirect('../usuario')
            }
        }
        res.render('listado-usuarios', { users: usuarios })
    },
    detalle: (req,res)=>{
        //console.log('sesion en detalle: ', req.session)
        let usuarios = UserModel.getUsers()
        let userDetalle = UserModel.getUserByID(req.params.id)
        if(userDetalle != undefined || userDetalle != null){
            res.render('usuario', {user: userDetalle})
        }else{
            //console.log("usuarios redirect detalle: ", usuarios)
            res.render('listado-usuarios', { users : usuarios })
        }
    }
};
module.exports = listaUsersController;