const express = require('express')
const path = require('path');
const router = express.Router()
const usersController = require('../controllers/usersController')
const guestMiddleware = require('../middlewares/guestMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')
const { body } = require('express-validator')
const validaciones = [
    body('name').notEmpty().withMessage("Debes completar el campo de nombre"),
    body('lastName').notEmpty().withMessage("Debes completar el campo de apellido"),
    //body('images').notEmpty().withMessage("Debes subir una foto de perfil"),
    body('email').notEmpty().withMessage("Debes ingresar un email").bail().isEmail().withMessage("Debes ingresar un email válido"),
    body('password').notEmpty().withMessage("Debes ingresar una contraseña"),
    body('confirmpassword').notEmpty().withMessage("Debes confirmar la contraseña"),
    body('images').custom((value, { req }) => {
        let file = req.file
        if(!file){
            throw new Error('Debes subir una imagen de perfil')
        }
        return true
    })
]
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/img/users')
    },
    filename: function(req, file, cb){
        //console.log("file: ", file)
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})
const upload = multer({storage: storage})

//Muestra todo el listado de usuarios de usuarios.json
router.get('/logout', usersController.logout)
router.get('/', authMiddleware,usersController.listado)

//Muestra detalle de cada usuario
router.get('/:id', authMiddleware,usersController.detalle)
router.post('/registro', upload.single('images'), validaciones, usersController.registro)
router.post('/login', usersController.login)
router.put('/:id', upload.single('images'), usersController.enviarUsuarioEditado)

router.delete('/:id', usersController.borrarUsuario)

// Edicion de usuario
router.get('/:id/editar', authMiddleware,usersController.editarUsuario)

module.exports = router;