// Importa el framework Express.
const express = require("express");
// Importa el objeto controlador que contiene la lógica para manejar las peticiones de usuarios.
const controller = require("../controllers/users.controller");

// Crea una nueva instancia de Router de Express para definir rutas modulares.
const router = express.Router();

// Asigna la función `findAll` del controlador a la petición GET en la ruta raíz ('/').
router.get("/", controller.findAll);

// Asigna la función `findById` a la petición GET en la ruta con un parámetro de ID ('/:id').
router.get("/:id", controller.findById);

// Asigna la función `addUser` a la petición POST en la ruta raíz ('/').
router.post("/", controller.addUser);

// Asigna la función `updateUser` a la petición PUT en la ruta con un parámetro de ID ('/:id').
router.put("/:id", controller.updateUser);

// Exporta el enrutador para que pueda ser utilizado en el archivo principal de la aplicación (app.js).
module.exports = router;