module.exports = (sequelize, dataTypes) => {
    let alias = "Usuarios"
    let cols = {
        ID_Usuario: {
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
        Apellido: {
            type: dataTypes.STRING
        },
        Email: {
            type: dataTypes.STRING
        },
        Contraseña: {
            type: dataTypes.STRING(500)
        }
    }
    let config = {
        tableName: "usuario",
        timestamps: false
    }
    const Usuario = sequelize.define(alias, cols, config)
    return Usuario
}