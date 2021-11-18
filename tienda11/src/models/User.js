const fs = require('fs')
const path = require('path')

const User = {
    filename: path.join(__dirname,'../data/usuarios.json'),
    getData: function(){
        return JSON.parse(fs.readFileSync(this.filename, 'utf-8'))
    },
    getUsers: function(){
        return this.getData()
    },
    getUserByID: function(id){
        let users = this.getData()
        let user = users.find(oneUser => oneUser.id == id)
        return user
    },
    getUserByField: function(field, text){
        let users = this.getData()
        let user = users.find(oneUser => oneUser[field] == text)
        return user
    },
    createUser: function(userData){
        let users = this.getData()
        users.push(userData)
        fs.writeFileSync(this.filename, JSON.stringify(users, null, ' '))
    },
    deleteUser: function(id){
        let users = this.getData()
        if(this.getUserByID(id) != undefined){
            users.splice(id - 1, 1)
            fs.writeFileSync(this.filename, JSON.stringify(users, null, ' '))
            return true
        }else{
            return false
        }
    },
    editUser: function(newUser){
        let users = this.getData()
        users[newUser.id - 1] = newUser
        fs.writeFileSync(this.filename, JSON.stringify(users, null, ' '))
    }
}

module.exports = User