<script setup>
import { ref, defineEmits } from 'vue'; // Variables reactivas y eventos
import { useToast } from 'vue-toast-notification'; // Notificaciones
import 'vue-toast-notification/dist/theme-sugar.css'; // Estilo de notificaciones
import { actualizarAlumno } from '../../../backend/services/api.js'; // Importar la función de actualizar alumno

// Variables reactivas para los campos del formulario
const id_empleado = ref('');
const nombre = ref('');
const rol = ref('');
const usuario = ref('');
const contrasena = ref('');

// Inicializa el toast para notificaciones
const toast = useToast();
const emit = defineEmits(['guardar', 'cancelar']); // Definir eventos

// Función para modificar el alumno
const modificarAlumno = async () => {
  if (!id_empleado.value) {
    toast.error("Debes ingresar un ID válido.");
    return;
  }

  try {
    // Llamada a la API para modificar el alumno
    const response = await actualizarAlumno(id_empleado.value, {
      nombre: nombre.value,
      rol: rol.value,
      usuario: usuario.value,
      contrasena: contrasena.value
    });

    // Verificar si la respuesta es exitosa
    if (response.success) {
      toast.success('Datos del alumno actualizados correctamente.', {
        position: 'top-right',
        duration: 5000,
        dismissible: true,
      });
      setTimeout(() => {
        window.location.href = `/Alumnos`; // Redirigir a la página del panel
      }, 750);
      emit('guardar', response.data);
    } else {
      toast.error(response.message || 'Hubo un error al actualizar los datos del alumno.', {
        position: 'top-right',
        duration: 5000,
        dismissible: true,
      });
    }
  } catch (error) {
    toast.error('Ocurrió un error al procesar la solicitud.', {
      position: 'top-right',
      duration: 5000,
      dismissible: true,
    });
    console.error('Error al modificar el alumno:', error);
  }
};  

// Función para cancelar la edición
const cancelar = () => {
  emit('cancelar');
};
</script>


<template>
  <div class="alta-alumno-container">
    <h1>Actualizar Empleado</h1>
    <form @submit.prevent="modificarAlumno">
      <div class="form-group">
        <label for="id_empleado">Id del empleado:</label>
        <input type="text" id="no_control" v-model="id_empleado" placeholder="Id de empleado" />
      </div>

      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" v-model="nombre" placeholder="Nombre" />
      </div>

      <div class="form-group">
        <label for="rol">Rol:</label>
        <input type="text" id="rol" v-model="rol" placeholder="Rol" />
      </div>

      <div class="form-group">
        <label for="usuario">Usuario:</label>
        <input type="text" id="usuario" v-model="usuario" placeholder="Usuario" />
      </div>

      <div class="form-group">
        <label for="contraseña">Contraseña:</label>
        <input type="password" id="contrasena" v-model="contrasena" placeholder="Contraseña" />
      </div>

      <button type="submit">Registrar</button>
    </form>
  </div>
</template>
<style scoped>
.alta-alumno-container {
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input, select {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

button {
  width: 100%;
  padding: 0.8rem;
  font-size: 1.2rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
