module.exports = (sequelize, dataTypes) => {
    let alias = "Marcas"
    let cols = {
        ID_Marca: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Nombre: {
            type: dataTypes.STRING
        }
    }
    let config = {
        tableName: "marca",
        timestamps: false
    }
    const Marca = sequelize.define(alias, cols, config)

    Marca.associate = function(models){
        Marca.hasMany(models.Productos)
    }

    return Marca
}