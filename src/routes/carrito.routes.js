const express = require('express');
const routerCarrito = express.Router();

const DB_CARRITO = [
    {
        id: 1,
        timestamp: Date.now(),
        productos: [{
            id: 1,
            nombre: 'Quix',
            precio: 1000,
            url: 'https://santaisabel.vtexassets.com/arquivos/ids/162927/Lavaloza-concentrado-limon-750-ml.jpg?v=637479988970600000'
        }
    ]
    }
];
routerCarrito.post('/', (req, res) =>{
    const data = req.body;
    console.log('obj', {data});
    let newId;
        if(DB_CARRITO.length == 0){
            newId = 1;
        } else{
            newId =DB_CARRITO[DB_CARRITO.length - 1].id + 1;
        }

        DB_CARRITO.push({id: newId, ...req.body});
    res.status(201).json({code: 201, msg: ` Carrito ${newId} agregado con exito`});
});


routerCarrito.get('/:id/productos', (req, res) =>{
    try{
        const id = req.params.id;
        const indexObj = DB_CARRITO.findIndex((o) => o.id == id);

        if(indexObj == -1){
            res.status(404).json({code: 404, msg: `Carrito ${id} no ecnontrado`});
        }
        res.status(200).json(DB_CARRITO[indexObj].productos);
    } catch(error){
        console.log(error);
        res.status(500).json({code: 500, msg: `error al obtener ${req.method} ${req.url}`});
    }
});

routerCarrito.post('/:id/productos', (req, res) =>{
    const id = req.params.id;
        const indexObj = DB_CARRITO.findIndex((o) => o.id == id);
    const data = req.body;
    console.log('obj', {data});
    let newId;
        if(DB_CARRITO[indexObj].productos.length == 0){
          newId = 1;
         } else{

            newId = DB_CARRITO[indexObj].productos.length + 1
            //newId =DB_CARRITO[DB_CARRITO.length - 1].id + 1;
        }

        DB_CARRITO[indexObj].productos.push({id: newId, ...req.body});
    res.status(201).json({code: 201, msg: ` Carrito ${newId} agregado con exito`});
});

routerCarrito.put('/:id', (req, res) =>{
        const data = req.body;
    try{
        const id = req.params.id;
        const indexObj = DB_CARRITO.findIndex((o) => o.id == id);
        if(indexObj == -1){
            res.status(404).json({code: 404, msg: `Carrito ${id} no ecnontrado`});
        }
        res.status(200).json(DB_CARRITO[indexObj]);
        DB_CARRITO.push({id: id, ...req.body});
        res.status(201).json({code: 201, msg: `Carrito ${data.nombre} agregado con exito`});
    } catch(error){
        console.log(error);
        res.status(500).json({code: 500, msg: `error al obtener ${req.method} ${req.url}`});
    }
});

routerCarrito.delete('/:id', (req, res) =>{
    const id = req.params.id;
    const indexObj = DB_CARRITO.findIndex((o) => o.id == id);
    //const newObj = DB_PRODUCTOS.filter((item) => item.id !== id);
        
    try{
        if(indexObj == -1){
            res.status(404).json({code: 404, msg: `Producto ${id} no ecnontrado`});
        }
        DB_CARRITO.splice(indexObj, 1);
        res.status(200).json(DB_CARRITO);
    } catch(error){
        console.log(error);
        res.status(500).json({code: 500, msg: `error al obtener ${req.method} ${req.url}`});
    }
        
});

routerCarrito.delete('/:id/productos/:idProd', (req, res) =>{
    const id = req.params.id;
    const idProd = req.params.idProd;
    const indexObj = DB_CARRITO.findIndex((o) => o.id == id);
    const indexProd = DB_CARRITO[indexObj].productos.findIndex((producto) => producto.id == idProd);
    //const newObj = DB_PRODUCTOS.filter((item) => item.id !== id);
        
    try{
        if(indexObj == -1 || indexProd == -1){
            res.status(404).json({code: 404, msg: `carrito ${id} no ecnontrado`});
        }
        DB_CARRITO[indexObj].productos.splice(indexProd, 1)
        //DB_CARRITO.splice(indexObj, 1);
        res.status(200).json(DB_CARRITO);
    } catch(error){
        console.log(error);
        res.status(500).json({code: 500, msg: `error al obtener ${req.method} ${req.url}`});
    }
        
});



routerCarrito.get('/', (req, res) =>{
    //res.render('vista', {DB_PRODUCTOS});
    res.status(200).json(DB_CARRITO);
});

module.exports = routerCarrito;