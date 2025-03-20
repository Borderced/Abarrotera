<script setup>
import { ref } from 'vue'; // Variables reactivas
import axios from 'axios'; // Solicitudes HTTP
import { useToast } from 'vue-toast-notification'; // Notificaciones
import 'vue-toast-notification/dist/theme-sugar.css'; // Estilo de notificaciones

// Variables reactivas para los campos del formulario
const id_empleado = ref('');
const nombre = ref('');
const rol = ref('');
const usuario = ref('');
const contrasena = ref('');

// Inicializa el toast para notificaciones
const toast = useToast();

const registrarAlumno = async () => {
  // Validaciones


  try {
    const response = await axios.post('http://localhost:5000/api/auth/registraralumno', {
      id_empleado: id_empleado.value,
      nombre: nombre.value,
      rol: rol.value,
      usuario: usuario.value,
      contrasena: contrasena.value,
    });

    if (response.status === 201) {
      toast.success('Empleado registrado exitosamente', {
        position: 'top-right',
        duration: 2000,
        dismissible: true,
      });
      limpiarFormulario();  
       // Redirigir después de un pequeño retraso
       setTimeout(() => {
        window.location.href = `/Empleados`; // Redirigir a la página del panel
      }, 750);

    }
  } catch (error) {
    console.error('Error al registrar:', error);
    if (error.response?.status === 400) {
      toast.error(error.response.data.message || 'Error en los datos enviados', {
        position: 'top-right',
        duration: 5000,
        dismissible: true,
      });
    } else {
      toast.error('Hubo un problema con el servidor. Intenta nuevamente.', {
        position: 'top-right',
        duration: 5000,
        dismissible: true,
      });
    }
  }
};

// Función para limpiar el formulario después de registrar
const limpiarFormulario = () => {
  id_empleado.value = '';
  nombre.value = '';
  rol.value = '';
  usuario.value = '';
  contrasena.value = '';
};
</script>
<template>
  <div class="alta-alumno-container">
    <h1>Registrar Nuevo Empleado</h1>
    <form @submit.prevent="registrarAlumno">
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
