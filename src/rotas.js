const express = require('express');
const userControler = require('./controladores/users');

const rotas = express();

rotas.get('/users', userControler.listarUsuarios);
rotas.get('/users/:id', userControler.obterUsuario);

module.exports = rotas;