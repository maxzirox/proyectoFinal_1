const express = require('express');
const routerProductos = express.Router();
const Contenedor = require('../../public/desafio-async-json');

const contenedor = new Contenedor('./data.json');

const DB_PRODUCTOS = [];

const dbConection = () => {
    const products = contenedor.getAll();
    products
    .then((all) =>{ 
        const prods = all
        DB_PRODUCTOS.push(prods)
        
    }
        );
}
dbConection();
routerProductos.post('/', (req, res) =>{
    const data = req.body;
    console.log('obj', {data});
    let newId;
        if(DB_PRODUCTOS.length == 0){
            newId = 1;
        } else{
            newId =DB_PRODUCTOS[DB_PRODUCTOS.length - 1].id + 1;
        }

        DB_PRODUCTOS.push({id: newId, ...req.body});
    res.status(201).json({code: 201, msg: `Producto ${data.nombre} agregado con exito`});
});


routerProductos.get('/:id', (req, res) =>{
    try{
        const id = req.params.id;
        const indexObj = DB_PRODUCTOS.findIndex((o) => o.id == id);

        if(indexObj == -1){
            res.status(404).json({code: 404, msg: `Producto ${id} no ecnontrado`});
        }
        res.status(200).json(DB_PRODUCTOS[indexObj]);
    } catch(error){
        console.log(error);
        res.status(500).json({code: 500, msg: `error al obtener ${req.method} ${req.url}`});
    }
});

routerProductos.put('/:id', (req, res) =>{
        const data = req.body;
    try{
        const id = req.params.id;
        const indexObj = DB_PRODUCTOS.findIndex((o) => o.id == id);
        if(indexObj == -1){
            res.status(404).json({code: 404, msg: `Producto ${id} no ecnontrado`});
        }
        res.status(200).json(DB_PRODUCTOS[indexObj]);
        DB_PRODUCTOS.push({id: id, ...req.body});
        res.status(201).json({code: 201, msg: `Producto ${data.nombre} agregado con exito`});
    } catch(error){
        console.log(error);
        res.status(500).json({code: 500, msg: `error al obtener ${req.method} ${req.url}`});
    }
});

routerProductos.delete('/:id', (req, res) =>{
    const id = req.params.id;
    const indexObj = DB_PRODUCTOS.findIndex((o) => o.id == id);
    //const newObj = DB_PRODUCTOS.filter((item) => item.id !== id);
        
    try{
        if(indexObj == -1){
            res.status(404).json({code: 404, msg: `Producto ${id} no ecnontrado`});
        }
        DB_PRODUCTOS.splice(indexObj, 1);
        res.status(200).json(DB_PRODUCTOS);
    } catch(error){
        console.log(error);
        res.status(500).json({code: 500, msg: `error al obtener ${req.method} ${req.url}`});
    }
        
});

routerProductos.get('/', (req, res) =>{
    dbConection;
    console.log('productosDB: ', DB_PRODUCTOS)
    //res.render('vista', {DB_PRODUCTOS});
    res.status(200).json(DB_PRODUCTOS);
});

module.exports = routerProductos;