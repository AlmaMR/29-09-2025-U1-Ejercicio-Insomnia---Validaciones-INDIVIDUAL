// Importa el framework Express para crear y gestionar el servidor.
const express = require("express");
// Importa el enrutador que maneja las peticiones relacionadas con los usuarios.
const userRouters = require("./routers/users.routers");

// Crea una instancia de la aplicación Express.
const app = express();
// Middleware que analiza los cuerpos de las peticiones entrantes en formato JSON.
// Esencial para poder leer los datos enviados en peticiones POST y PUT (req.body).
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({ status: "ok"});
});

// Monta el enrutador de usuarios en la ruta base '/api/users'.
// Todas las peticiones que comiencen con '/api/users' serán manejadas por userRouters.
app.use("/api/users", userRouters);

// Define el puerto en el que se ejecutará el servidor.
// Utiliza el puerto definido en las variables de entorno o el puerto 3000 por defecto.
const PORT = process.env.PORT || 3000;
// Inicia el servidor y lo pone a la escucha de peticiones en el puerto especificado.
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});