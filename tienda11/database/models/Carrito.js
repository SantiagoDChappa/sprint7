module.exports = (sequelize, dataTypes) => {
    let alias = "Carritos"
    let cols = {
        ID_Carrito: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Nombre_Comprador: {
            type: dataTypes.STRING,
            allowNull: true
        },
        Cant_Items_Total: {
            type: dataTypes.INTEGER
        },
        Precio_Total: {
            type: dataTypes.FLOAT
        },
    }
    let config = {
        tableName: "carrito",
        timestamps: false
    }
    const Carrito = sequelize.define(alias, cols, config)

    Carrito.associate = function(models){
        Carrito.belongsTo(models.Usuarios)
        Carrito.hasMany(models.ProductosEnCarrito)
    }
    return Carrito
}