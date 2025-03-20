import { connection } from "../db.js";

export const ConsultaAlumno = async () => {
  try {
    const [rows] = await connection.execute(
      'SELECT ID_EMPLEADO, NOMBRE, ROL, USUARIO, CONTRASENA FROM empleados'
    );
    return rows;
  } catch (error) {
    console.error('Error al consultar los empleados:', error);
    throw new Error('Error al consultar los empleados');
  }
};

export const registrarAlumno = async (id_empleado, nombre, rol, usuario, contrasena) => {
  const query = `
    INSERT INTO empleados 
    (ID_EMPLEADO, NOMBRE, ROL, USUARIO, CONTRASENA)
    VALUES (?, ?, ?, ?, ?);
  `;

  try {
    const [result] = await connection.execute(query, [id_empleado, nombre, rol, usuario, contrasena]);
    return result.insertId; // Devuelve el ID de la inserción
  } catch (error) {
    console.error('Error al registrar el Empleado:', error);
    throw error; // Lanza el error para que se maneje en el controlador
  }
};

export const eliminarAlumno = async (idalumno) => {
  const query = 'DELETE FROM empleados WHERE ID_EMPLEADO = ?;';

  try {
    const [result] = await connection.execute(query, [idalumno]);
    return result; // Devuelve el resultado de la consulta
  } catch (error) {
    console.error('Error al eliminar el Empleado:', error);
    throw error; // Lanza el error para que se maneje en la ruta
  }
};
export const actualizarAlumno = async (
  id_empleado,
  nombre,
  rol,
  usuario,
  contrasena
) => {
  const query = `
    UPDATE empleados
    SET 
      NOMBRE = ?, 
      ROL = ?, 
      USUARIO = ?, 
      CONTRASENA = ?
    WHERE ID_EMPLEADO = ?
  `;

  try {
    // Ejecutamos la consulta de actualización con los valores proporcionados
    const [result] = await connection.execute(query, [
      nombre,       
      rol,          
      usuario,      
      contrasena,   
      id_empleado   
    ]);

    console.log('Resultado de la actualización:', result); // Agregar log para verificar el resultado

    // Verificamos si se realizó la actualización
    if (result.affectedRows > 0) {
      return { success: true, message: 'Empleado actualizado correctamente' };
    } else {
      return { success: false, message: 'No se encontró el Empleado o no se actualizó ningún registro' };
    }
  } catch (error) {
    console.error('Error al actualizar el Empleado:', error);
    return { success: false, message: 'Error al actualizar el Empleado', error };
  }
};
