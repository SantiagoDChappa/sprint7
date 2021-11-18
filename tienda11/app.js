const express = require('express');
const session = require('express-session')
const cookies = require('cookie-parser')
const path = require('path');
const app = express();
const rutasIndex = require('./src/routes/indexRouter.js');
const rutasProductos = require('./src/routes/listaProductosRouter.js');
const rutasUsers = require('./src/routes/usersRouter.js');
const port = 3000;
const methodOverride = require('method-override');
const userLoggedMiddleware = require('./src/middlewares/userLoggedMiddleware.js');


app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))

app.use(cookies())

app.use(userLoggedMiddleware)


app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());


app.use(methodOverride('_method'));
app.use('/', rutasIndex);
app.use('/productos', rutasProductos);
app.use('/usuario', rutasUsers);

app.listen(port, ()=>{
    console.log('Servidor funcionando en http://localhost:' + port);
});

