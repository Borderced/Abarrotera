<script setup>
import { ref } from 'vue'; // Variables reactivas
import { useToast } from 'vue-toast-notification'; // Notificaciones
import 'vue-toast-notification/dist/theme-sugar.css'; // Estilo de notificaciones
import { actualizarDocente } from '@/backend/services/api';
// Props: Recibe el alumno que se está editando
const props = defineProps({
  docente: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(['guardar', 'cancelar']);

const id_producto = ref (props.docente.id_producto || '');
const nombre_producto = ref (props.docente.nombre_producto || '');
const precio_venta = ref (props.docente.precio_venta || '');
const precio_compra = ref (props.docente.precio_compra || '');
const stock = ref (props.docente.stock || '');
const fecha_registro = ref (props.docente.fecha_registro || '');

// Inicializa el toast para notificaciones
const toast = useToast();

// Función para modificar el alumno
const modificarDocente = async () => {
  // Validaciones

  try {
    // Llamada a la API para modificar el alumno
    const response = await actualizarDocente(
        id_producto.value,
        nombre_producto.value,
        precio_venta.value,
        precio_compra.value,
        stock.value,
        fecha_registro.value,
    );

    // Verificar si la respuesta es exitosa
    if (response.success) {
      toast.success('Datos del Docente actualizados correctamente.', {
        position: 'top-right',
        duration: 5000,
        dismissible: true,
      });
      setTimeout(() => {
        window.location.href = `/Inventario`; // Redirigir a la página del panel
      }, 750);
      emit('guardar', response.data); // Emitir el evento 'guardar' al componente padre
    } else {
      toast.error(response.message || 'Hubo un error al actualizar los datos del docente.', {
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
    console.error('Error al modificar el Docente:', error);
  }
};

</script>

<template>
  <div class="alta-producto-container">
    <h1>Modificar Producto</h1>
    <form @submit.prevent="modificarDocente">
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

      <button type="submit" class="btn-submit">Modificar Producto</button>
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