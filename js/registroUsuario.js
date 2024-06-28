import { SERVER_URL } from './config.js';
const mensajeAlerta = "Por favor, completar todos los campos obligatorios"
const confirmaMsg = "Se borraran todos los campos"


/*-----------------VALIDACIONES DE CAMPOS INPUT EN FORMULARIO REGISTRO ------------- */

const validarUsuarioEmail = () => {
    let elemento = document.querySelector("#usuarioEmail").value.trim();
    let validarEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if( validarEmail.test(elemento) ){
      return true;
    } else{
      alert("Email invalido, corregir");
      return false;
    } 
  }
  
  const validarNombreRegistro = () => {
    let elemento = document.querySelector("#nombreRegistro").value.trim();
    //console.log(elemento);
    if (elemento.length ==0) {
      alert("el campo Nombre no puede estar vacío");
      return false;
    }return true;
  }
  
  
  const validarApellidoRegistro = () => {
    let elemento = document.querySelector("#apellidoRegistro").value.trim();
    if (elemento.length ==0) {
      alert("el campo Apellido no puede estar vacío");
      return false;
    }return true;
  }
  
  
  const validarTelefonoRegistro = () => {
    let elemento = document.querySelector("#telefonoRegistro").value.trim();
    if (isNaN(elemento)) {
      alert("ingrese solo numeros")
      return false;
    }return true;
  }
  
  const validarPasswordRegistro = () => {
    let password = document.querySelector("#passwordRegistro").value.trim();
    let confirmPassword = document.querySelector("#confirmPpasswordRegistro").value.trim();
    if (password.length ==0 || confirmPassword ==0) {
      alert("el campo no puede estar vacío");
      return false;
     } else if (password !== confirmPassword) {
      alert("los password deben ser iguales");
      return false;
     } else {
      return true;
     }
    }
  
    const validarFormRegistro = () => {
      return (
        validarUsuarioEmail() &&
        validarNombreRegistro() &&
        validarApellidoRegistro() &&
        validarTelefonoRegistro() &&
        validarPasswordRegistro()
      );
    };
    
  
  /*-----------------------ENVIO FORMULARIO REGISTRO -------------------------------*/

  
document.addEventListener("DOMContentLoaded", () => {
  const formRegistro = document.querySelector("#registro-form")
  
  formRegistro.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!validarFormRegistro()) {
      return; // No enviar si no es válido
    }

    const usuario = formRegistro.querySelector('#usuarioEmail').value;
    const nombre = formRegistro.querySelector('#nombreRegistro').value;
    const apellido = formRegistro.querySelector('#apellidoRegistro').value;
    const telefono = formRegistro.querySelector('#telefonoRegistro').value;
    const password = formRegistro.querySelector('#passwordRegistro').value;

    const datos = {
      usuario: usuario,
      nombre: nombre,
      apellido: apellido,
      telefono: telefono,
      password: password
    };
    try {
      const respuesta = await fetch(`${SERVER_URL}/registro-form`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
      });

      if (respuesta.ok) {
        const data = await respuesta.json();
        console.log('Formulario enviado correctamente:', data);
        alert(data.message)
        formRegistro.reset();
        
      } else {
        console.error('Error al enviar el formulario');
        alert('Error al enviar el formulario', data.message);
        
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error:', error);
    }

  });
});


  


