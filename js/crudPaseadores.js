/* DOMContentLoaded */
/* evento DOMContentLoaded para asegurar que el script se ejecute después de que el DOM se haya cargado completamente. */

import { SERVER_URL } from "./config.js"

document.addEventListener("DOMContentLoaded", () => {

  const bodyTablaPaseadores = document.querySelector("#body-tabla-paseadores")
  const formCrearPaseadores = document.querySelector("#form-crear-paseadores")

  /* FUNCION PARA OBTENER LOS DATOS DE NUESTRA API USANDO AXIOS */
  const fetchPaseadores = async () => {
    try {
      const respuesta = await axios.get(`${SERVER_URL}/paseadores`)
      console.log();
     
      const paseadores = respuesta.data
      console.log(paseadores);
      //limpiar la tabla antes de agregar nuevos datos
      bodyTablaPaseadores.innerHTML = "";

      /*    iterar sobre los datos y agregar los nuevos */
      paseadores.forEach(paseador => {
        //crear una nueva fila
        const fila = document.createElement("tr")
        //crear las celdas para el titulo , contenido y acciones.
        const celdaNombre = document.createElement("td")
        const celdaDiaspaseo = document.createElement("td")
        const celdaHorario = document.createElement("td")
        const celdaRecorrido = document.createElement("td")
        const celdaAcciones = document.createElement("td")

        // asignar el contenido a las celdas
        celdaNombre.textContent = paseador.nombre
        celdaDiaspaseo.textContent = paseador.dias_paseo
        celdaHorario.textContent = paseador.horario
        celdaRecorrido.textContent = paseador.recorrido

        // crear boton de eliminar
        const botonEliminar = document.createElement("button")
        botonEliminar.textContent = "Eliminar"
        botonEliminar.addEventListener("click", () => { borrarPaseador(paseador.id) })

        // crear el boton de editar
        const botonEditar = document.createElement("button")
        botonEditar.textContent = "Editar"
        botonEditar.addEventListener("click", () => {
          /*   redirigir a la pagina de edicion con el id del post en la URL */
          window.location.href = `edit.html?id=${paseador.id}`
        })
        // agregar los botones a la celda de acciones
        celdaAcciones.appendChild(botonEliminar)
        celdaAcciones.appendChild(botonEditar)

        // agregar las celdas a la fila
        fila.appendChild(celdaNombre)
        fila.appendChild(celdaDiaspaseo)
        fila.appendChild(celdaHorario)
        fila.appendChild(celdaRecorrido)
        fila.appendChild(celdaAcciones)

        //agregar la fila al cuerpo de la tabla
        bodyTablaPaseadores.appendChild(fila)

      })
    } catch (error) {
      console.error("Error al obtener los paseadores", error)
    }
  }


  // la funcion para eliminar un paseador
  const borrarPaseador = async (id) => {
    try {
      const response = await axios.delete(`${SERVER_URL}/paseadores/${id}`) 
      if (response) {
        alert('Paseador eliminado')
      }
    } catch (error) {
     
    }
    
    //recargamos la lista de paseadores despues de eliminar
    fetchPaseadores()
  }

  //funcion para crear un nuevo paseador
  formCrearPaseadores.addEventListener("submit", async (event) => {
    event.preventDefault();
    const nuevoPaseador = {
      nombre: document.querySelector("#nuevo-nombre").value,
      dias_paseo: document.querySelector("#nuevo-dias_paseo").value,
      horario: document.querySelector("#nuevo-horario").value,
      recorrido: document.querySelector("#nuevo-recorrido").value,
    };
    try {
      const response = await axios.post(`${SERVER_URL}/paseadores/`, nuevoPaseador)
      if (response)
      alert('Paseador creado correctamente')
      //limpiar el formulario
      formCrearPaseadores.reset()
      //recargamos la lista de paseadores despues de crear uno nuevo
      fetchPaseadores()
    } catch (error) {
      console.error("Error al enviar un paseador", error)
    }
  })

  //llamar a la funcion para obtener y mostrar los paseadores al cargar la pagina
  fetchPaseadores()

  
  

})
