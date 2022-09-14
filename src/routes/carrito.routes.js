const express = require('express');
const Contenedor = require('../../public/desafio-async-json');
const routerCarrito = express.Router();

const cart = new Contenedor('./carrito.json');
const products = new Contenedor('./data.json');


routerCarrito.post('/', async (req, res) =>{
    const data = req.body;
    console.log('obj', {data});
    try {
        await cart.save(data);
        res.status(201).json({code: 201, msg: ` Carrito agregado con exito`});
    } catch (error) {
        console.log(error);
        res.status(500).json({code: 500, msg: `error al obtener ${req.method} ${req.url}`});
    }
    
});


routerCarrito.get('/:id/productos', async (req, res) =>{
    try{
        const id = req.params.id;
        const cartId = await cart.getById(id);
        console.log('carrito: ',cartId[0].productos);
        res.status(200).json(cartId[0].productos);
        
    } catch(error){
        console.log(error);
        res.status(500).json({code: 500, msg: `error al obtener ${req.method} ${req.url}`});
    }
});

routerCarrito.post('/:id/productos', async (req, res) =>{
    const idProduct = req.body.id;
    const idCart = req.params.id;
        const product = await products.getById(idProduct);
        const cartObj = await cart.getById(idCart);
        const indexCart = cartObj.findIndex((cart) => cart.id == idCart);
        cartObj[indexCart].productos.push(... product);
        await cart.update(idCart, cartObj[indexCart]);
        res.end();

});


routerCarrito.delete('/:id', async (req, res) =>{
    const id = req.params.id;   
    try{
        await cart.deleteById(id);
        res.status(200).json({code: 200, msg: `carrito ${id} eliminado con exito`});
    } catch(error){
        console.log(error);
        res.status(500).json({code: 500, msg: `error al obtener ${req.method} ${req.url}`});
    }
        
});

routerCarrito.delete('/:id/productos/:idProd', async (req, res) =>{
    const idProduct = req.params.idProd;
    const idCart = req.params.id;
        try {
            const cartObj = await cart.getById(idCart);
            const indexCart = cartObj.findIndex((cart) => cart.id == idCart);
            const indexProd = cartObj[indexCart].productos.findIndex((product) => product.id == idProduct);
            cartObj[indexCart].productos.splice(indexProd, 1);
            await cart.update(idCart, cartObj[indexCart]);
            res.end();
        } catch (error) {
            console.log(error);
            res.status(500).json({code: 500, msg: `error al obtener ${req.method} ${req.url}`});
        }

        
});



module.exports = routerCarrito;