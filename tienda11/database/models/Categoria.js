module.exports = (sequelize, dataTypes) => {
    let alias = "Categorias"
    let cols = {
        ID_Categoria: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Nombre: {
            type: dataTypes.STRING
        }
    }
    let config = {
        tableName: "categoria",
        timestamps: false
    }
    const Categoria = sequelize.define(alias, cols, config)

    Categoria.associate = function(models){
        Categoria.hasMany(models.CategoriasPorProducto)
    }

    return Categoria
}