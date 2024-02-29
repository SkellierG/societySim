import sqlite3 from 'sqlite3';
import bcrypt from 'bcrypt';

// Crear una nueva instancia de la base de datos en el archivo mydatabase.db
const db = new sqlite3.Database('./users.db');

// Ejecuta una consulta para crear la tabla "users" si aún no existe
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    )
  `, (err) => {
    if (err) {
      console.error('Error al crear la tabla "users":', err);
    } else {
      console.log('La tabla "users" se ha creado correctamente');
    }
  });
});

// Función para insertar un nuevo usuario en la base de datos
function insertUser(username, password) {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID });
      }
    });
  });
}

// Función para obtener un usuario por nombre de usuario
function getUserByUsername(username) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

async function comparePassword(username, password) {
  try {
    const user = await getUserByUsername(username);
    //console.log(user);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    //console.log(user.password);
    //console.log(password);
    const passwordMatch = await bcrypt.compare(password, user.password);
    //console.log('Las contraseñas coinciden:', passwordMatch);
    return passwordMatch;
  } catch (error) {
    throw new Error('Error al comparar contraseñas');
  }
}

// Otros métodos que puedas necesitar, como actualizar usuarios, eliminar usuarios, etc.

export { insertUser, getUserByUsername, comparePassword };