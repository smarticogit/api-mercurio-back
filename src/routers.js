const express = require('express');
const userController = require('./controllers/users');

const routers = express();

routers.get('/users', userController.usersList);
routers.get('/users/:id', userController.userGet);
routers.post('/users', userController.userCreate);
routers.put('/users/:id', userController.userUpdate);
routers.delete('/users/:id', userController.userDelete);

module.exports = routers;