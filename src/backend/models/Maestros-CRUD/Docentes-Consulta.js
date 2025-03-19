import { connection } from "../db.js";

export const ConsultaDocente = async () => {
  try {
    const [rows] = await connection.execute(
      'SELECT ID_PRODUCTO, NOMBRE_PRODUCTO, PRECIO_VENTA, PRECIO_COMPRA, STOCK, FECHA_REGISTRO FROM productos'
    );
    return rows;
  } catch (error) {
    console.error('Error al consultar los Docentes:', error);
    throw new Error('Error al consultar los Docentes');
  }
};

export const registrarDocente = async (id_producto, nombre_producto, precio_venta, precio_compra, stock, fecha_registro) => {
  const query = `
    INSERT INTO productos 
    (ID_PRODUCTO, NOMBRE_PRODUCTO, PRECIO_VENTA, PRECIO_COMPRA, STOCK, FECHA_REGISTRO)
    VALUES (?, ?, ?, ?, ?, ?);
  `;

  try {
    const [result] = await connection.execute(query, [id_producto, nombre_producto, precio_venta, precio_compra, stock, fecha_registro]);
    return result.insertId; // Devuelve el ID de la inserción
  } catch (error) {
    console.error('Error al registrar el docente:', error);
    throw error; // Lanza el error para que se maneje en el controlador
  }
};
export const eliminarDocente = async (iddocente) => {
  const query = 'DELETE FROM productos WHERE ID_PRODUCTO = ?;';

  try {
    const [result] = await connection.execute(query, [iddocente]);
    return result; // Devuelve el resultado de la consulta
  } catch (error) {
    console.error('Error al eliminar el docente:', error);
    throw error; // Lanza el error para que se maneje en la ruta
  }
};
export const actualizarDocente = async (
  id_profesor, nombre, apellido_p, apellido_m, fecha_nac, rfc,
  telefono, correo, direccion, nss, especialidad, sexo
) => {
  // Validaciones adicionales
  if (!id_profesor || !nombre || !apellido_p || !fecha_nac || !rfc || !telefono || !correo || !direccion || !nss || !especialidad || !sexo) {
    return { success: false, message: 'Todos los campos son obligatorios' };
  }

  const query = `
    UPDATE MAESTROS
    SET 
      Nombre = ?, 
      Apellido_P = ?, 
      Apellido_M = ?, 
      Fecha_Nac = ?, 
      RFC = ?, 
      Telefono = ?, 
      Correo = ?, 
      Direccion = ?, 
      NSS = ?, 
      Especialidad = ?, 
      Sexo = ?
    WHERE id_profesor = ?
  `;

  try {
    const [result] = await connection.execute(query, [
      nombre, apellido_p, apellido_m, fecha_nac, rfc, telefono, correo, direccion, nss, especialidad, sexo, id_profesor
    ]);

    console.log('Resultado de la actualización:', result); // Agregar log para verificar el resultado

    if (result.affectedRows > 0) {
      return { success: true, message: 'Docente actualizado correctamente' };
    } else {
      return { success: false, message: 'No se encontró el docente o no se actualizó ningún registro' };
    }
  } catch (error) {
    console.error('Error al actualizar el Docente:', error);
    return { success: false, message: 'Error al actualizar el Docente', error };
  }
};
