<script setup>
import { ref } from 'vue'; // Variables reactivas
import axios from 'axios'; // Solicitudes HTTP
import { useToast } from 'vue-toast-notification'; // Notificaciones
import 'vue-toast-notification/dist/theme-sugar.css'; // Estilo de notificaciones

// Variables reactivas para los campos del formulario
const id_producto= ref('');
const nombre_producto = ref('');
const precio_venta = ref('');
const precio_compra = ref('');
const stock = ref('');
const fecha_registro = ref('');

// Inicializa el toast para notificaciones
const toast = useToast();

const registrarDocente = async () => {
  // Validaciones


  try {
    const response = await axios.post('http://localhost:5000/api/auth/registrardocente', {
      id_producto: id_producto.value,
      nombre_producto: nombre_producto.value,
      precio_venta: precio_venta.value,
      precio_compra: precio_compra.value,
      stock: stock.value,
      fecha_registro: fecha_registro.value
    });

    if (response.status === 201) {
      toast.success('Producto registrado exitosamente', {
        position: 'top-right',
        duration: 2000,
        dismissible: true,
      });
      limpiarFormulario();
      // Redirigir después de un pequeño retraso
      setTimeout(() => {
        window.location.href = `/Inventario`; // Redirigir a la página del panel
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
  id_producto.value = '';
  nombre_producto.value = '';
  precio_venta.value = '';
  precio_compra.value = '';
  stock.value = '';
  fecha_registro.value = '';
};
</script>

<template>
  <div class="alta-producto-container">
    <h1>Registrar Nuevo Producto</h1>
    <form @submit.prevent="registrarDocente">
      <div class="form-group">
        <label for="id_producto">ID Producto:</label>
        <input type="text" id="id_producto" v-model="id_producto" placeholder="ID Producto" />
      </div>

      <div class="form-group">
        <label for="nombre_producto">Nombre Producto:</label>
        <input type="text" id="nombre_producto" v-model="nombre_producto" placeholder="Nombre Producto" />
      </div>

      <div class="form-group">
        <label for="precio_venta">Precio de Venta:</label>
        <input type="number" id="precio_venta" v-model="precio_venta" placeholder="Precio de Venta" />
      </div>

      <div class="form-group">
        <label for="precio_compra">Precio de Compra:</label>
        <input type="number" id="precio_compra" v-model="precio_compra" placeholder="Precio de Compra" />
      </div>

      <div class="form-group">
        <label for="stock">Stock:</label>
        <input type="number" id="stock" v-model="stock" placeholder="Stock" />
      </div>

      <div class="form-group">
        <label for="fecha_registro">Fecha de Registro:</label>
        <input type="date" id="fecha_registro" v-model="fecha_registro" />
      </div>

      <button type="submit" class="btn-submit">Registrar Producto</button>
    </form>
  </div>
</template>

<style scoped>
.alta-docente-container {
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