const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Crear aplicación Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Permite conexión desde React
app.use(express.json()); // Permite leer JSON en las peticiones

// Conexión a MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/miapp';
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Verificar conexión
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a DB:'));
db.once('open', () => {
    console.log('Conectado a DB');
});

// Definir modelo (esquema)
const Usuario = mongoose.model('Usuario', {
    nombre: String,
    email: String,
});

// Ruta para obtener todos los usuarios
app.get('/api/usuarios', async (req, res) => {
    const usuarios = await Usuario.find();
    res.json(usuarios);
});

// Ruta para crear un nuevo usuario
app.post('/api/usuarios', async (req, res) => {
    const nuevoUsuario = new Usuario(req.body);
    await nuevoUsuario.save();
    res.json(nuevoUsuario);
});

// Ruta de prueba
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hola desde el backend con MongoDB!' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor backend escuchando en http://localhost:${PORT}`);
});
