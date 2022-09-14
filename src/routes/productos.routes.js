const express = require('express');
const routerProductos = express.Router();
const Contenedor = require('../../public/desafio-async-json');

const contenedor = new Contenedor('./data.json');



routerProductos.post('/', async (req, res) =>{
    const data = req.body;
    try {
        await contenedor.save(data);
        res.status(201).json({code: 201, msg: `Producto ${data.nombre} agregado con exito`});
    } catch (error) {
        console.log(error);
        res.status(500).json({code: 500, msg: `error al obtener ${req.method} ${req.url}`});
    }
    
});


routerProductos.get('/:id', async (req, res) =>{
    const id = req.params.id;

    try{
        const product = await contenedor.getById(id);
        res.status(200).json(product);
            
        
  
    } catch(error){
        console.log(error);
        res.status(500).json({code: 500, msg: `error al obtener ${req.method} ${req.url}`});
    }
});

routerProductos.put('/:id', async (req, res) =>{
        const data = req.body;
        const id = req.params.id;
    try{
        await contenedor.update(id, data);
        res.status(201).json({code: 201, msg: `Producto ${data.titulo} modificado con exito`});
    } catch(error){
        console.log(error);
        res.status(500).json({code: 500, msg: `error al obtener ${req.method} ${req.url}`});
    }
});

routerProductos.delete('/:id', async (req, res) =>{
    const id = req.params.id;
        
    try{
        const products = await contenedor.deleteById(id);
        res.status(200).json({code: 200, msg: `prducto ${id} eliminado con exito`});
    } catch(error){
        console.log(error);
        res.status(500).json({code: 500, msg: `error al obtener ${req.method} ${req.url}`});
    }
        
});

routerProductos.get('/', async (req, res) =>{
    const products = await contenedor.getAll();

        res.status(200).json(products);

    
});

module.exports = routerProductos;