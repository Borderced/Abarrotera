<script setup>
import { obteneralumnos, eliminarAlumno } from '@/backend/services/api'; // Importamos la función de obtener y eliminar
import { ref, onMounted } from 'vue';
import AltaAlumnos from './Alta-Alumnos/Alta-Alumnos.vue';
import ActualizarAlumnos from './Actualizar-Alumnos/Actualizar-Alumnos.vue'; // Importar el componente de actualización
import { useToast } from 'vue-toast-notification'; // Importa useToast
import 'vue-toast-notification/dist/theme-sugar.css'; // Importa el tema de notificaciones
import { actualizarAlumno } from '@/backend/services/api'; // Importa la función de actualización

const Alumnos = ref([]);  // Almacenará los alumnos obtenidos de la API
const error = ref('');  // Para manejar posibles errores
const toast = useToast(); // Inicializa el toast
const alumnoEditando = ref(null);  // Almacenará el alumno que se está editando
const mostrarFormulario = ref(false); // Estado reactivo para mostrar el formulario de agregar
const mostrarFormularioActualizar = ref(false); // Estado reactivo para mostrar el formulario de actualización

// Obtener los alumnos cuando el componente se monta
onMounted(async () => {
  try {
    Alumnos.value = await obteneralumnos();
    console.log('Empleados obtenidos:', Alumnos.value);  // Para verificar los datos en la consola
  } catch (err) {
    error.value = 'No se pudieron cargar los Alumnos. Intenta más tarde.';
    console.error('Error al obtener los Alumnos:', err);
  }
});

// Función para mostrar el formulario de agregar
const agregarAlumno = () => {
  alumnoEditando.value = null; // Limpia el alumno seleccionado
  mostrarFormulario.value = true; // Muestra el formulario de agregar
  mostrarFormularioActualizar.value = false; // Oculta el formulario de actualización
};

// Función para cancelar el formulario
const cancelarFormulario = () => {
  mostrarFormulario.value = false;
  mostrarFormularioActualizar.value = false;
  alumnoEditando.value = null;
};

// Función para eliminar un alumno
const eliminarAlumnoPorId = async (noControl) => {
  if (!confirm('¿Estás seguro de que quieres eliminar este alumno?')) {
    return; // Si el usuario cancela, no hace nada
  }

  try {
    await eliminarAlumno(noControl);  // Llamada a la función de eliminar
    Alumnos.value = Alumnos.value.filter(alumno => alumno.ID_EMPLEADO !== noControl); // Actualiza la lista

    // Mostrar notificación de éxito
    toast.success('Empleado eliminado correctamente.', {
      position: 'top-right', // Posición de la notificación
      duration: 5000, // Duración en milisegundos
    });
  } catch (err) {
    console.error('Error al eliminar el Empleado:', err);

    // Mostrar notificación de error
    toast.error('No se pudo eliminar el Empleado. Intenta más tarde.', {
      position: 'top-right',
      duration: 5000,
    });
  }
};

// Función para modificar un alumno
const modificarAlumno = (idEmpleado) => {
  console.log('ID recibido para modificar:', idEmpleado);
  
  const alumno = Alumnos.value.find(alumno => alumno.ID_EMPLEADO === idEmpleado);

  if (alumno) {
    console.log('Alumno encontrado:', alumno);
    alumnoEditando.value = alumno;
    mostrarFormularioActualizar.value = true;
    mostrarFormulario.value = false;
  } else {
    console.error('No se encontró el alumno con ID:', idEmpleado);
  }
};
// Función para guardar los cambios después de actualizar
const guardarCambiosActualizados = async (alumnoActualizado) => {
  if (!alumnoActualizado) {
    console.error('No se pudo obtener el Empleado a actualizar');
    return;
  }
  try {
     const response = await actualizarAlumno(
      alumnoActualizado.id_empleado,
      alumnoActualizado.nombre,
      alumnoActualizado.rol,
      alumnoActualizado.usuario,
      alumnoActualizado.contrasena
    );

    
  } catch (err) {
    console.error('Error al actualizar el Empleado:', err);
    toast.error('No se pudo actualizar el Empleado. Intenta más tarde.', {
      position: 'top-right',
      duration: 5000,
    });
  }
};

</script>

<template>
  <div class="syste-panel">
    <div class="panel">
      <!-- Contenedor de encabezado y botón en Flexbox -->
      <div class="header-container">
        <h1>Lista de Empleados</h1>
        <!-- Botón que cambia la visibilidad del formulario -->
        <button @click="agregarAlumno" class="btn btn-add" v-if="!mostrarFormulario && !mostrarFormularioActualizar">
          Agregar Empleado
        </button>
      </div>

      <!-- Mostrar el formulario de alta solo si 'mostrarFormulario' es verdadero -->
      <AltaAlumnos
        v-if="mostrarFormulario"
        @alumnoRegistrado="alumno => Alumnos.push(alumno)"
        @cancelar="cancelarFormulario"
      />

      <!-- Mostrar el formulario de actualización si 'mostrarFormularioActualizar' es verdadero -->
      <ActualizarAlumnos
        v-if="mostrarFormularioActualizar"
        :alumno="alumnoEditando"
        @guardar="guardarCambiosActualizados"
        @cancelar="cancelarFormulario"
      />

      <!-- Tabla de alumnos -->
      <table class="alumnos-table" v-if="!mostrarFormulario && !mostrarFormularioActualizar">
        <thead>
          <tr>
            <th>Id_Empleado</th>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Usuario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <!-- Iteramos sobre los alumnos y mostramos cada uno en una fila -->
          <tr v-for="alumno in Alumnos" :key="alumno.ID_EMPLEADO">
            <td>{{ alumno.ID_EMPLEADO }}</td>
            <td>{{ alumno.NOMBRE }}</td>
            <td>{{ alumno.ROL }}</td>
            <td>{{ alumno.USUARIO }}</td>
            <td class="actions">
              <button @click="modificarAlumno(alumno.ID_EMPLEADO)" class="btn btn-modify">Modificar</button>
              <button @click="eliminarAlumnoPorId(alumno.ID_EMPLEADO)" class="btn btn-delete">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
/* Contenedor principal del panel, para que ocupe toda la pantalla */
.syste-panel {
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100% - 250px);
  height: 100vh;
  overflow-y: auto; /* Permite el desplazamiento solo vertical */
  margin-left: 250px; 
  padding: 1rem;
}

/* Panel de contenido */
.panel {
  display: flex;
  color: #000000;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  max-height: 100%;
}

.alumnos-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.alumnos-table th, .alumnos-table td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: left;
}

.alumnos-table th {
  background-color: #0b8a29;
  color: #ffff;
}

/* Media query para pantallas pequeñas */
@media (max-width: 1200px) {
  .statistics {
    grid-template-columns: repeat(3, 1fr); /* 3 columnas */
  }
}

@media (max-width: 768px) {
  .statistics {
    grid-template-columns: repeat(2, 1fr); /* 2 columnas */
  }
}

@media (max-width: 480px) {
  .statistics {
    grid-template-columns: 1fr; /* 1 columna */
  }
}

/* Columna de acciones: botones alineados */
.actions {
  display: flex;
  gap: 5px;
  justify-content: center;
}

/* Estilo de botones */
.btn {
  padding: 8px 14px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s ease;
  width: 100px; /* Tamaño uniforme para todos */
  text-align: center;
}

.btn-add {
  background-color: #4caf50;
  color: white;
  width: 200px;
}

.btn-add:hover {
  background-color: #45a049;
}

.btn-modify {
  background-color: #2196f3;
  color: white;
}

.btn-modify:hover {
  background-color: #1976d2;
}

.btn-delete {
  background-color: #f44336;
  color: white;
}

.btn-delete:hover {
  background-color: #d32f2f;
}

/* Contenedor de encabezado y botón */
.header-container {
  display: flex;
  justify-content: space-between;  /* Alinea el contenido a los extremos */
  align-items: center;  /* Alinea verticalmente */
}
</style>