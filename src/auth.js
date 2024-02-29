import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { insertUser, getUserByUsername, comparePassword } from './db.js';

// Función para registrar un nuevo usuario
async function registrarUsuario(username, password) {
  try {
    // Verificar si el usuario ya existe en la base de datos
    const usuarioExistente = await getUserByUsername(username);

    if (usuarioExistente) {
      throw new Error('El usuario ya existe');
    }

    // Si el usuario no existe, hashear la contraseña y guardar el nuevo usuario en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10);
    await insertUser(username, hashedPassword);

    return 'Usuario creado exitosamente';
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    throw new Error('Error al registrar usuario');
  }
}

// Función para autenticar un usuario
async function autenticarUsuario(username, password) {
  try {
    // Obtener la información del usuario desde la base de datos
    const usuario = await getUserByUsername(username);

    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    // Comparar la contraseña proporcionada con la contraseña almacenada en la base de datos
    //const hashedPassword = await bcrypt.hash(password, 10);
    const contraseñaValida = await comparePassword(username, password);

    if (contraseñaValida) {
      // Generar un token de autenticación si la contraseña es válida
      const token = jwt.sign({ username }, 'secreto', { expiresIn: '1h' });
      return token;
    } else {
      throw new Error('Contraseña incorrecta');
    }
  } catch (error) {
    console.error('Error de autenticación:', error);
    throw new Error('Error de autenticación');
  }
}

export { registrarUsuario, autenticarUsuario };