module.exports = (sequelize, dataTypes) => {
    let alias = "Productos"
    let cols = {
        ID_Producto: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Nombre: {
            type: dataTypes.STRING
        },
        Imagen: {
            type: dataTypes.STRING
        },
        Descuento: {
            type: dataTypes.INTEGER,
            allowNull: true,
            default: 0
        },
        Precio: {
            type: dataTypes.FLOAT
        }
    }
    let config = {
        tableName: "producto",
        timestamps: false
    }
    const Producto = sequelize.define(alias, cols, config)

    Producto.associate = function(models){
        Producto.hasOne(models.Carritos, {
            foreignKey: "ID_Carrito"
        })
        Producto.hasMany(models.ProductosEnCarrito)
        Producto.hasMany(models.ColoresPorProducto)
        Producto.hasMany(models.CategoriasPorProducto)
        Producto.belongsTo(models.Marcas, { foreignKey: "ID_Marca" })
    }
    return Producto
}