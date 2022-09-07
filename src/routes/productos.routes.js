const express = require('express');
const routerProductos = express.Router();

const DB_PRODUCTOS = [
    {
        id: 1,
        nombre: 'Quix',
        precio: 1000,
        url: 'https://santaisabel.vtexassets.com/arquivos/ids/162927/Lavaloza-concentrado-limon-750-ml.jpg?v=637479988970600000'
    }
];
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

routerProductos.get('/', (req, res) =>{
    //res.render('vista', {DB_PRODUCTOS});
    res.status(200).json(DB_PRODUCTOS);
});

module.exports = routerProductos;