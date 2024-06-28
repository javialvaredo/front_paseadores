const mensajeAlerta = "Por favor, completar todos los campos obligatorios"
const confirmaMsg = "Se borraran todos los campos"  
const apiUrl = "http://localhost:3000"

document.addEventListener("DOMContentLoaded", () => {
    const formPaseadores = document.querySelector("#solicitar-paseo-form")
    formPaseadores.addEventListener("submit", validarFormPaseadores);
    formPaseadores.addEventListener("submit", enviarFormularioPaseadores);
    formPaseadores.addEventListener("reset", confirmar)
  });
  

/* --------boton borrar----*/
const confirmar = (evento) => {
    const confirma = confirm(confirmaMsg);
    if (!confirma) {
      evento.preventDefault();
      return;
    } 
  }


/*-----------------VALIDACIONES DE CAMPOS INPUT EN FORMULARIO PASEADORES----------------------- */

const validarClave = () => {
    let elemento = document.getElementById("clave").value.trim();
    
    if (elemento.length ==0) {
      alert("el campo Clave no puede estar vacío")
      return false;
    }return true;
  }
  
  const validarNombreCliente = () => {
    let elemento = document.getElementById("nombre_cliente").value.trim();
    if (elemento.length ==0) {
      alert("el campo Nombre del Cliente no puede estar vacío");
      return false;
    }return true;
  }
  
  const validarNombreMascota = () => {
    let elemento = document.getElementById("nombre_mascota").value.trim();
    if (elemento.length ==0) {
      alert("el campo Nombre de la Mascota no puede estar vacío");
      return false;
    }return true;
     
  }
  
  const validarFormPaseadores = (evento) =>{
    if (validarClave() && validarNombreCliente() && validarNombreMascota()) {
          return true;
      } else {
        evento.preventDefault();
        return false;
      }
  }

/*-----------------------ENVIO FORMULARIO PASEADORES -------------------------------*/
  
const enviarFormularioPaseadores = () => {
    const datos = new FormData(formPaseadores);
    fetch(`${apiUrl}/procesar_solicitud`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: datos
    })
    .then(respuesta => respuesta.json())
    .then(respuesta => {
    }).catch(error => console.log("error", error));
  };
  