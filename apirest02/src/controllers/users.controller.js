// Importa el modelo de usuario, que contiene las funciones para interactuar con los datos.
const User = require('../models/user.model');

// Obtiene todos los usuarios y los envía como respuesta.
function findAll(req, res) {
    const data = User.findAll();
    res.status(200).json(data);
}

// usca un usuario por su ID y lo envía como respuesta.
function findById(req, res) {
    const user = User.findById(req.params.id);
    return user ? res.status(200).json(user) : res.status(404).json({ message: 'Usuario no encontrado' });
}

// Valida y añade un nuevo usuario.
function addUser(req, res) {
    // --- INICIO DE LA VALIDACIÓN ---
    const { name, email, age } = req.body;
    const errors = [];

    if (typeof name === 'undefined') {
        errors.push({ field: 'name', message: 'El campo nombre es requerido.' });
    } else if (typeof name !== 'string' || name.trim() === '') {
        errors.push({ field: 'name', message: 'El campo nombre debe ser texto y no puede estar vacío.' });
    }

    if (typeof email === 'undefined') {
        errors.push({ field: 'email', message: 'El campo email es requerido.' });
    } else if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push({ field: 'email', message: 'El formato del email no es válido.' });
    }

    if (typeof age === 'undefined') {
        errors.push({ field: 'age', message: 'El campo edad es requerido.' });
    } else if (typeof age !== 'number') {
        errors.push({ field: 'age', message: 'El campo edad debe ser un número.' });
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    // --- FIN DE LA VALIDACIÓN ---

    // Si la validación pasa, se ejecuta el código original
    const newUser = User.addUser(req.body);
    res.status(201).json(newUser);
}

// Valida y actualiza los datos de un usuario existente.
function updateUser(req, res) {
    // --- INICIO DE LA VALIDACIÓN ---
    const { name, email, age, active } = req.body;
    const errors = [];

    if (typeof name !== 'undefined' && (typeof name !== 'string' || name.trim() === '')) {
        errors.push({ field: 'name', message: 'El campo nombre debe ser texto y no puede estar vacío.' });
    }

    if (typeof email !== 'undefined' && (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
        errors.push({ field: 'email', message: 'El formato del email no es válido.' });
    }

    if (typeof age !== 'undefined' && typeof age !== 'number') {
        errors.push({ field: 'age', message: 'El campo edad debe ser un número.' });
    }

    if (typeof active !== 'undefined' && typeof active !== 'boolean') {
        errors.push({ field: 'active', message: 'El campo active debe ser un valor booleano (true o false).' });
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    // --- FIN DE LA VALIDACIÓN ---

    // Si la validación pasa, se ejecuta el código original
    const updateUser = User.updateUser(req.params.id, req.body);
    return updateUser ? res.status(200).json(updateUser) : res.status(404).json({ message: 'Usuario no encontrado' });
}

// Exporta todas las funciones del controlador.
module.exports = {
    findAll,
    findById,
    addUser,
    updateUser
}