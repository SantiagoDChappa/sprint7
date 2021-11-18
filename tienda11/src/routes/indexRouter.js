 const express = require('express')
 const router = express.Router()
 const indexController = require('../controllers/indexController')
 const guestMiddleware = require('../middlewares/guestMiddleware')
 const authMiddleware = require('../middlewares/authMiddleware')

router.get('/', indexController.index)

router.get('/ingreso', guestMiddleware,indexController.ingreso)

router.get('/registro', guestMiddleware, indexController.registro)
router.post('/registro', indexController.enviarRegistro)

router.get('/carrito-de-compras', indexController.carrito)



router.get('/editar-producto',authMiddleware,indexController.editarProducto)

module.exports = router;