import { SERVER_URL } from './config.js';
const formCrud = document.querySelector("#user-form");

document.addEventListener("DOMContentLoaded", () => {
  
  const buscarBtn = document.querySelector("#buscar");
  const actualizarBtn = document.querySelector("#actualizar");
  const eliminarBtn = document.querySelector("#eliminar");

  buscarBtn.addEventListener("click", () => handleFormSubmit('buscar'));
  actualizarBtn.addEventListener("click", () => handleFormSubmit('actualizar'));
  eliminarBtn.addEventListener("click", () => handleFormSubmit('eliminar'));
});

const handleFormSubmit = async (action) => {
  const userId = document.querySelector("#userId").value;

  switch (action) {
    case 'buscar':
      await buscarUsuario(userId);
      break;
    case 'actualizar':
      await actualizarUsuario(userId);
      break;
    case 'eliminar':
      await eliminarUsuario(userId);
      break;
  }
};

const buscarUsuario = async (id) => {
  try {
    const response = await fetch(`${SERVER_URL}/registro-form/${id}`, {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const datosUsuario = await response.json();
    console.log("Datos del usuario:", datosUsuario, datosUsuario.nombre, datosUsuario.apellido, datosUsuario.usuario);
    llenarFormulario(datosUsuario)
    // Procesar los datos del usuario 
  } catch (error) {
    console.error("Error al buscar el usuario:", error);
  
  }
};

const llenarFormulario = (datosUsuario) => {
  document.querySelector("#userEmail").value = datosUsuario.usuario;
  document.querySelector("#userName").value = datosUsuario.nombre;
  document.querySelector("#userSurname").value = datosUsuario.apellido;
  document.querySelector("#userPhone").value = datosUsuario.telefono;
}


const actualizarUsuario = async (id) => {
  // Obtener los datos del formulario
  const nombre = document.querySelector("#userName").value;
  const email = document.querySelector("#userEmail").value;
  const apellido = document.querySelector("#userSurname").value;
  const telefono = document.querySelector("#userPhone").value;

  // Crear el objeto de datos de actualización
  const datosActualizacion = {
      nombre: nombre,
      email: email,
      apellido: apellido,
      telefono: telefono
  };

  try {
      const response = await fetch(`${SERVER_URL}/registro-form/${id}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(datosActualizacion)
      });

      if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      const datosActualizados = await response.json();
      console.log("Usuario actualizado:", datosActualizados);
      alert("Usuario actualizado correctamente.");
      formCrud.reset(); 
      

      // Opcional: Actualizar el formulario con los nuevos datos
      // llenarFormulario(datosActualizados);

  } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      alert("Error al actualizar el usuario. Consulta la consola para más detalles.");
  }
};

const eliminarUsuario = async (id) => {
  try {
      const response = await fetch(`${SERVER_URL}/registro-form/${id}`, {
          method: "DELETE"
      });

      if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      console.log("Usuario eliminado correctamente.");
      alert("Usuario eliminado correctamente.");
      formCrud.reset();

      // Opcional: Puedes realizar acciones adicionales después de eliminar el usuario

  } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      alert("Error al eliminar el usuario. Consulta la consola para más detalles.");
  }
};
