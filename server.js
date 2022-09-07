const express = require('express');
const morgan = require('morgan');
const app = express();


const routerProductos = require('./src/routes/productos.routes.js');
const routerCarrito = require('./src/routes/carrito.routes');


const PORT = 8080;
//middleware se configura para que express pueda recibir json
app.use(express.json());
//morgan se ejecuta durante los usos de las rutas
app.use(morgan('dev'));
//middleware para recibir parametros desde un formulario
app.use(express.urlencoded({ extended: true}));
//middleware para visualizar un index.html dentro de public
// app.use(express.static(__dirname + '/public'))

// app.set('views', './views');
// app.set('view engine', 'pug');

app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarrito);



app.get('*', (req, res) =>{
    res.status(404).json({
        code: 404,
        msg: 'not found'
    });
});



const server = app.listen(PORT, ()=>{
    console.log(`servidor alojado en express escuchando el puerto: ${server.address().port}`);
})

server.on('error', err => console.log(`error eb el servidor ${err}`));