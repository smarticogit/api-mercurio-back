const express = require("express");
const { usersList } = require("./controllers/user/user-list");
const { userGet } = require("./controllers/user/user-get");
const { userCreate } = require("./controllers/user/user-create");
const { userDelete } = require("./controllers/user/user-delete");
const { userUpdate } = require("./controllers/user/user-update");
const { validator } = require("./middlewares/validator");

const routers = express();

routers.use("/users", validator);

routers.get("/users", usersList);
routers.get("/users/:id", userGet);
routers.post("/users", userCreate);
routers.put("/users/:id", userUpdate);
routers.delete("/users/:id", userDelete);

module.exports = routers;
