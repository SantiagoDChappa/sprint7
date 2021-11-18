const express = require('express')
const router = express.Router()
const listaProductosController = require('../controllers/listaProductosController')
const guestMiddleware = require('../middlewares/guestMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')

//Muestra todo el listado de productos de productos.json
router.get('/', listaProductosController.listado)

//Muestra el formulario de crear un producto y el envio de los datos a prodcutos.json
router.get('/crear', authMiddleware,listaProductosController.crearProducto)
router.post('/', listaProductosController.enviarProducto)

//Muestra detalle de cada producto
router.get('/:id', listaProductosController.detalle)

router.put('/:id', listaProductosController.enviarProductoEditado)

router.delete('/:id', listaProductosController.borrarProducto)

// Edicion de producto
router.get('/:id/editar', authMiddleware,listaProductosController.editarProducto)

module.exports= router;