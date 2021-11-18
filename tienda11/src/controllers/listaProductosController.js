const fs = require('fs')
const path = require('path')
const db = require('../../database/models')
const Producto = db.Productos

const listaProductosController={
    listado: (req,res)=>{
        Producto.findAll()
            .then((productos)=>{
                if(productos == null){
                    return res.render('listado')
                }else{
                    return res.render('listado', { productos })        
                }
            })
        
    },
    detalle: (req,res)=>{
        let productoDetalle= productos.find(producto=>{
            return producto.id == req.params.id
        })
        if(productoDetalle != undefined || productoDetalle != null){
            res.render('detalle-producto', {producto: productoDetalle})
        }else{
            res.render('listado', { productos })
        }
    },
    crearProducto: (req,res)=>{
       
        
    },
    enviarProducto: (req,res)=>{
        Producto.create({
            Nombre: req.body.name,
            Descuento: req.body.discount,
            Imagen: req.body.images,
            ID_Marca: req.body.mark,
            Precio: req.body.price,

        })

            res.redirect('../productos')
    },
    editarProducto: (req,res)=>{
        let productoEdicion = productos.find(producto => {
            return producto.id == req.params.id
        })
        if(productoEdicion != undefined || productoEdicion != null){
            res.render('editar-producto', {producto: productoEdicion})
        }else{
            res.render('listado', { productos })
        }
    },
    enviarProductoEditado: (req,res) => {
        let productoNuevo = {
            id: req.params.id,
            name: req.body.name,
            image: req.body.images,
            discount: req.body.discount,
            price: req.body.price
        }
        let productosActualizados = productos
        productosActualizados[req.params.id - 1] = productoNuevo
        let productosJSON= JSON.stringify(productosActualizados)
        fs.writeFileSync(productosPath, productosJSON)
        res.redirect('../productos/'+req.params.id)
    },
    borrarProducto: (req,res) => {
        if(req.params.id != undefined){
            let productosActualizados = productos
            if(productosActualizados.find(producto=>{return producto.id == req.params.id}) != undefined){
                productosActualizados.splice(req.params.id - 1, 1)
                console.log(productosActualizados)
            }
        }
        res.render('listado', { productos })
    }
}
module.exports= listaProductosController;