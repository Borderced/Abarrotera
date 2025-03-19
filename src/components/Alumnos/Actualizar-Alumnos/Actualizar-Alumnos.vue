<script setup>
import { ref, watch } from 'vue'; // Agregar `watch` para detectar cambios en `props`
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { actualizarAlumno } from '@/backend/services/api';

const props = defineProps({
  alumno: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['guardar', 'cancelar']);
const toast = useToast();

// Variables reactivas
const id_empleado = ref(props.alumno.ID_EMPLEADO || '');
const nombre = ref(props.alumno.NOMBRE || '');
const rol = ref(props.alumno.ROL || '');
const usuario = ref(props.alumno.USUARIO || '');
const contrasena = ref(props.alumno.CONTRASENA || '');

// Cargar datos cuando `props.alumno` cambiado

const modificarAlumno = async () => {
  if (!id_empleado.value || !nombre.value || !rol.value || !usuario.value || !contrasena.value) {
    toast.error('Todos los campos son obligatorios.', { position: 'top-right', duration: 5000 });
    return;
  }

  try {
    const response = await actualizarAlumno(
      id_empleado.value,
      nombre.value,
      rol.value,
      usuario.value,
      contrasena.value
    );

    if (response.success) {
      toast.success('Datos del empleado actualizados correctamente.', {
        position: 'top-right',
        duration: 5000,
      });
      emit('guardar', response.data);
      //setTimeout(() => (window.location.href = '/Empleados'), 750);
    } else {
      toast.error(response.message || 'Error al actualizar los datos.', { position: 'top-right' });
    }
  } catch (error) {
    toast.error('Error al procesar la solicitud.', { position: 'top-right' });
    console.error('Error al modificar el empleado:', error.response?.data || error);
  }
};

const cancelar = () => {
  emit('cancelar');
};
</script>

<template>
  <div class="alta-alumno-container">
    <h1>Modificar Empleado</h1>
    <form @submit.prevent="modificarAlumno">
      <div class="form-group">
        <label for="id_empleado">Id del empleado:</label>
        <input type="text" id="id_empleado" v-model="id_empleado" placeholder="Id de empleado" />
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
        <label for="contrasena">Contraseña:</label>
        <input type="password" id="contrasena" v-model="contrasena" placeholder="Contraseña" />
      </div>

      <button type="submit">Modificar</button>
      <button type="button" @click="cancelar">Cancelar</button>
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