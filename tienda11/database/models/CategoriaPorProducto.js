module.exports = (sequelize, dataTypes) => {
    let alias = "CategoriasPorProducto"
    let cols = {
        ID_CategoriaPorProducto: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }
    let config = {
        tableName: "categoriaporproducto",
        timestamps: false
    }
    const ColorPorProducto = sequelize.define(alias, cols, config)

    ColorPorProducto.associate = function(models){
        ColorPorProducto.belongsTo(models.Categorias, { foreignKey: "ID_Categoria" })
        ColorPorProducto.belongsTo(models.Productos, { foreignKey: "ID_Producto" })
    }

    return ColorPorProducto
}