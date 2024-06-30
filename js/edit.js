
import { SERVER_FRONT, SERVER_URL } from './config.js';

document.addEventListener('DOMContentLoaded', () => {
    
    const parametrosURL = new URLSearchParams(window.location.search)

    const botonEnviar = document.querySelector("#edit-enviar");
    botonEnviar.addEventListener("click", () => enviarDatosActualizados());
    
    const idPosteo = parametrosURL.get('id')
    
    const fetchPosteo = async (id) => {
        try {
            const respuesta = await axios.get(`${SERVER_URL}/paseadores/${id}`)
            const posteo = respuesta.data
            document.querySelector('#edit-nuevo-nombre').value = posteo.nombre
            document.querySelector('#edit-nuevo-dias_paseo').value = posteo.dias_paseo
            document.querySelector('#edit-nuevo-horario').value = posteo.horario
            document.querySelector('#edit-nuevo-recorrido').value = posteo.recorrido
        } catch (error) {
            console.error('Error al obtener el post', error);
        }
    }
    if (idPosteo) {
        fetchPosteo(idPosteo)
    }

}); 

//funcion para actualizar paseador

const enviarDatosActualizados = () => {
    const formEditarPaseadores = document.querySelector('#form-editar-paseadores')
    formEditarPaseadores.addEventListener("submit", async (event) => {
    event.preventDefault();

    const actualURL = new URLSearchParams(window.location.search)
    const id = actualURL.get('id')

    const editPaseador = {
      nombre: document.querySelector("#edit-nuevo-nombre").value,
      dias_paseo: document.querySelector("#edit-nuevo-dias_paseo").value,
      horario: document.querySelector("#edit-nuevo-horario").value,
      recorrido: document.querySelector("#edit-nuevo-recorrido").value,
    };
    console.log(editPaseador);
    try {
      const response = await axios.put(`${SERVER_URL}/paseadores/${id}`, editPaseador)
      if(response) {
        alert('Modificacion enviada correctamente')
        window.location.href = `${SERVER_FRONT}/paseadores_log.html`
        //window.location.href = 'http://localhost:5500/paseadores_log.html'
      }

      //limpiar el formulario
      formEditarPaseadores.reset()
            
    } catch (error) {
      console.error("Error al modificar un paseador", error)
    }
  })
}

