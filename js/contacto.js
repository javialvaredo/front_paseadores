const mensajeAlerta = "Por favor, completar todos los campos obligatorios"
const confirmaMsg = "Se borraran todos los campos"
const apiUrl = "http://localhost:3000"

document.addEventListener("DOMContentLoaded", () => {
  const formContacto = document.querySelector("#contact-form")
  formContacto.addEventListener("submit", validarFormContacto);
  formContacto.addEventListener("submit", enviarFormularioContacto);
  formContacto.addEventListener("reset", confirmar)
});



/* --------boton borrar----*/
const confirmar = (evento) => {
  const confirma = confirm(confirmaMsg);
  if (!confirma) {
    evento.preventDefault();
    return;
  } 
}


/*-----------------VALIDACIONES DE CAMPOS INPUT EN FORMULARIO CONTACTO----------------------- */

const validarNombre = () => {
  let elemento = document.getElementById("nombre").value.trim();
  
  if (elemento.length ==0) {
    alert("el campo Nombre no puede estar vacío")
    return false;
  }return true;
}

const validarApellido = () => {
  let elemento = document.getElementById("apellido").value.trim();
  if (elemento.length ==0) {
    alert("el campo Apellido no puede estar vacío");
    return false;
  }return true;
}

const validarEmail = () => {
  let elemento = document.getElementById("email").value.trim();
  let validarEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  if( validarEmail.test(elemento) ){
    return true;
  } else{
    alert("Email invalido, corregir");
    return false;
  } 
}

const validarTelefono = () => {
  let elemento = document.getElementById("telefono").value.trim();
  if (isNaN(elemento)) {
    alert("ingrese solo numeros")
    return false;
  }return true;
}

const validarMensaje = () => {
  let elemento = document.getElementById("message").value.trim();
  if (elemento.length ==0) {
    alert("el campo no puede estar vacío");
    return false;
  }return true;
}

const validarFormContacto = (evento) => {
  if (validarNombre() && validarApellido() && validarEmail()
      && validarTelefono() && validarMensaje() && confirm("Pusa aceptar para enviar el formulario")) {
        return true;
    } else {
      evento.preventDefault();
      return false;
    }
}

/*-----------------------ENVIO FORMULARIO CONTACTO -------------------------------*/

const enviarFormularioContacto = () => {
  const datos = new FormData(formContacto);
  fetch(`${apiUrl}/contacto-form`, {
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