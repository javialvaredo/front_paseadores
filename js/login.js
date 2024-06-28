import { SERVER_URL } from './config.js';

const mensajeAlerta = "Por favor, completar todos los campos obligatorios";

/*-----------------VALIDACIONES DE CAMPOS INPUT EN FORMULARIO LOGIN ------------- */

const validarUsuarioLogin = () => {
  let elemento = document.querySelector("#loginUsuario").value.trim();
  let validarEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  if (validarEmail.test(elemento)) {
    return true;
  } else {
    alert("Usuario inválido, corregir");
    return false;
  }
};

const validarPasswordLogin = () => {
  let password = document.querySelector("#loginPassword").value.trim();

  if (password.length === 0) {
    alert("El campo no puede estar vacío");
    return false;
  } else {
    return true;
  }
};

const validarFormLogin = () => {
  return validarUsuarioLogin() && validarPasswordLogin();
};


/*-----------------------ENVÍO FORMULARIO LOGIN -------------------------------*/


document.addEventListener("DOMContentLoaded", () => {
  const formLogin = document.querySelector("#login-form");

  formLogin.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!validarFormLogin()) {
      return; // No enviar si no es válido
    }

    const usuario = formLogin.querySelector('#loginUsuario').value;
    const password = formLogin.querySelector('#loginPassword').value;

    const datos = {
      usuario: usuario,
      password: password
    };

    try {
      const respuesta = await fetch(`${SERVER_URL}/login-form`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
      });

      const data = await respuesta.json();
      if (respuesta.ok) {
        //const data = await respuesta.json();
        
        console.log(`Datos recibidos del servidor: Status = ${respuesta.status} ${data.message}, ${data.redirectUrl} ${data.message}`);
        alert(data.message)
        window.location.href = 'http://localhost:5500/crud.html'
              
        ;
      } else {
        console.error(`Error al enviar el formulario, Status:  ${respuesta.status} ${data.message}`);
        alert(`Error: ${data.message}`)
        
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error:', data.message)
      
    }
  });
});