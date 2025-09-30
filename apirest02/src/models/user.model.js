// Importa la función para generar identificadores únicos universales (UUIDs).
const { randomUUID } = require("node:crypto");

// Arreglo que funciona como una base de datos en memoria para los usuarios.
let users = [
    { id: randomUUID(), name: "Israel", email: "iarjona@gmail.com", active: true, age: 43 },
    { id: randomUUID(), name: "Alma", email: "amercado@gmail.com", active: false, age: 22 }
];

// Devuelve todos los usuarios en la base de datos.
function findAll() {
    return users;
}

// Busca un usuario por su ID.
function findById(id) {
    return users.find((u) => u.id === id) || null;
}

// Crea un nuevo usuario y lo añade a la base de datos.
function addUser(item) {
    const user = {
        id: randomUUID(),
        name: item.name,    //obligattorio
        email: item.email,  //obligatorio
        active: true,       // Por defecto, los nuevos usuarios están activos.
        age: item.age       //obligatorio
    };
    users.push(user);
    return user;
}

// Actualiza los datos de un usuario existente por su ID.
function updateUser(id, data) {
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) {
        return null;
    }
    // Combina los datos existentes con los nuevos datos recibidos.
    // Si un campo no viene en 'data', mantiene el valor original.
    users[index] = {
        ...users[index],
        name: typeof data.name === "undefined" ? users[index].name : data.name,
        email: typeof data.email === "undefined" ? users[index].email : data.email,
        active: typeof data.active === "undefined" ? users[index].active : Boolean(data.active),
        age: typeof data.age === "undefined" ? users[index].age : Number(data.age)
    }
    return users[index];
}

// Exporta las funciones del modelo para que el controlador pueda usarlas.
module.exports = { findAll, findById, addUser, updateUser };