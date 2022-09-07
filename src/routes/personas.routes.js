const express = require('express');
const routerPersonas = express.Router();

const DB_PERSONA = [
    {
        nombre: 'maxi',
        apellido: 'Guzman',
        edad: 29
    }
];
routerPersonas.post('/', (req, res) =>{
    const {nombre, apellido, edad} = req.body;
    console.log('obj', {nombre, apellido, edad});

    DB_PERSONA.push(req.body);
    res.status(201).json({code: 201, msg: `usuario ${nombre} agregado con exito`});
});


routerPersonas.get('/', (req, res) =>{
    res.status(200).json(DB_PERSONA);
});

module.exports = routerPersonas;