document.addEventListener('DOMContentLoaded', function() {
    // Crear elementos de la ventana modal
    var modal = document.createElement('div');
    modal.id = 'welcomeModal';
    modal.className = 'modal';

    var modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    var closeButton = document.createElement('span');
    closeButton.className = 'close-btn';
    closeButton.innerHTML = '&times;';

    var welcomeMessage = document.createElement('h3');
    welcomeMessage.textContent = 'Bienvenidos a Pet Shop - Paseadores 24126 - Grupo 5';

    var welcomeText = document.createElement('p');
    welcomeText.textContent = 'Nos alegra que nos visites. Esperamos que disfrutes la pagina y que encuentres lo que buscas';

    // Agregar elementos al contenido de la modal
    modalContent.appendChild(closeButton);
    modalContent.appendChild(welcomeMessage);
    modalContent.appendChild(welcomeText);

    // Agregar contenido al modal
    modal.appendChild(modalContent);

    // Agregar modal al cuerpo del documento
    document.body.appendChild(modal);

    // Mostrar la ventana modal
    modal.style.display = 'block';

    // Cerrar la ventana modal al hacer clic en el botón de cerrar
    closeButton.onclick = function() {
        modal.style.display = 'none';
    }

    // Cerrar la ventana modal al hacer clic fuera del contenido de la modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
});
