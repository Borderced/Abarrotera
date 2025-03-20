import mysql from 'mysql2/promise';  // Usamos 'mysql2/promise' directamente

// Crear conexión con MariaDB
const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'kike2004',
  database: 'abarrotera',
  port: 3307,
});

// Función para verificar las credenciales del usuario
const checkUserCredentials = async (usuario, contrasena) => {
  try {
    const [rows] = await connection.execute('SELECT * FROM empleados WHERE USUARIO = ? AND CONTRASENA = ?', [usuario, contrasena]);
    return rows.length > 0 ? rows[0] : null;
  } catch (err) {
    console.error('Error al consultar los usuarios:', err);
    throw new Error('Error al consultar los usuarios');
  }
};

export { connection, checkUserCredentials };
