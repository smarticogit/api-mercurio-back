const express = require('express');
const userController = require('./controladores/users');

const rotas = express();

rotas.get('/users', userController.listarUsuarios);
rotas.get('/users/:id', userController.obterUsuario);

rotas.post('/users', userController.criarUsuario);

module.exports = rotas;