import express from "express";
import { insertUser, getUserByUsername, comparePassword } from './db.js';
import { registrarUsuario, autenticarUsuario } from './auth.js';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import path from 'path';
import config from './config.js'

const PORT = config.PORT;

const app = express();

app.use(bodyParser.json());

const directorioPublico = path.join(process.cwd(), 'public');

app.use(express.static(directorioPublico));

//chekUser
app.post('/check', async (req, res) => {
  const { username, password } = req.body;

  try {
    const checkUser = await getUserByUsername(username);
    if (checkUser) {
      res.status(401).json({ message: 'Usuario ya existente en la DB' })
    } else {
      res.status(201).json({ message: 'Usuario no existente en la DB' })
    }
  } catch (error) {
    console.error('Error en la DB ', error);
    res.status(500).json({ message: 'Error al intentar buscar nombre en la DB' });
  }
});

// Ruta para el registro de usuarios
app.post('/registro', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Registra al usuario en la base de datos
    await registrarUsuario(username, password);
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body; // Obtén el nombre de usuario y la contraseña del cuerpo de la solicitud

  try {
    // Verifica las credenciales del usuario utilizando el método autenticarUsuario
    const token = await autenticarUsuario(username, password);

    if (token) {
      // Si las credenciales son válidas, devuelve un token JWT al cliente
      res.json({ token });
    } else {
      // Si las credenciales no son válidas, devuelve un mensaje de error al cliente
      res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  } catch (error) {
    // Maneja cualquier error que ocurra durante el proceso de autenticación
    console.error('Error de autenticación:', error);
    res.status(500).json({ message: 'Error de servidor' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});