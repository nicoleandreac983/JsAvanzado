import { Leon, Lobo, Oso, Serpiente, Aguila } from './animales.js';

// Función para obtener la imagen y el sonido de un animal desde el archivo JSON
const obtenerDatosAnimal = async (nombreAnimal) => {
    try {
        const respuesta = await fetch('animales.json');
        const datos = await respuesta.json();

        const animal = datos.animales.find(animal => animal.name === nombreAnimal);

        if (animal) {
            return {
                imagen: `assets/imgs/${animal.imagen}`,
                sonido: `assets/sounds/${animal.sonido}`
            };
        } else {
            return {
                imagen: 'assets/imgs/default.png',
                sonido: 'assets/sounds/default.mp3'
            };
        }

    } catch (error) {
        console.error('Error al obtener datos del animal:', error);
        return {
            imagen: 'assets/imgs/default.png',
            sonido: 'assets/sounds/default.mp3'
        };
    }
};

const selectAnimal = document.getElementById('animal');
const previewDiv = document.getElementById('preview');

// Función para actualizar la imagen de vista previa
selectAnimal.addEventListener('change', () => {
    const animalSeleccionado = selectAnimal.value;

    let imgSrc;
    switch (animalSeleccionado) {
        case 'Leon':
            imgSrc = 'assets/imgs/Leon.png';
            break;
        case 'Lobo':
            imgSrc = 'assets/imgs/Lobo.jpg';
            break;
        case 'Oso':
            imgSrc = 'assets/imgs/Oso.jpg';
            break;
        case 'Serpiente':
            imgSrc = 'assets/imgs/Serpiente.jpg';
            break;
        case 'Aguila':
            imgSrc = 'assets/imgs/Aguila.png';
            break;
        default:
            imgSrc = '';
            break;
    }

    // Mostrar la imagen en el contenedor de preview
    if (imgSrc) {
        previewDiv.innerHTML = `<img src="${imgSrc}" class="img-fluid rounded" alt="${animalSeleccionado}" />`;
    } else {
        previewDiv.innerHTML = ''; // Limpiar si no hay selección
    }
});

// Función que crea la instancia del animal y lo agrega a la tabla
const registrarAnimal = async () => {
    const nombreAnimal = document.getElementById('animal').value;
    const edad = document.getElementById('edad').value;
    const comentarios = document.getElementById('comentarios').value;

    if (!nombreAnimal || !edad || !comentarios) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    // Obtener imagen y sonido del archivo JSON
    const { imagen, sonido } = await obtenerDatosAnimal(nombreAnimal);

    let nuevoAnimal;
    switch (nombreAnimal) {
        case 'Leon':
            nuevoAnimal = new Leon(nombreAnimal, edad, imagen, comentarios, sonido);
            break;
        case 'Lobo':
            nuevoAnimal = new Lobo(nombreAnimal, edad, imagen, comentarios, sonido);
            break;
        case 'Oso':
            nuevoAnimal = new Oso(nombreAnimal, edad, imagen, comentarios, sonido);
            break;
        case 'Serpiente':
            nuevoAnimal = new Serpiente(nombreAnimal, edad, imagen, comentarios, sonido);
            break;
        case 'Aguila':
            nuevoAnimal = new Aguila(nombreAnimal, edad, imagen, comentarios, sonido);
            break;
    }

    mostrarAnimalEnTabla(nuevoAnimal);
    limpiarFormulario();
};
console.log(comentarios);

const mostrarAnimalEnTabla = (animal) => {
    const tablaAnimales = document.getElementById('Animales');

    const animalCard = `
        <div class="card text-center">
            <img src="${animal.img}" alt="${animal.nombre}" class="card-img-top"
                data-nombre="${animal.nombre}"
                data-edad="${animal.edad}"
                data-comentarios= "${animal.comentarios}"
                data-sonido="${animal.sonido}">
            <div class="card-body">
                <h5 class="card-title">${animal.nombre}</h5>
                <button class="btn btn-primary" onclick="reproducirSonido('${animal.sonido}');">
                    <i class="fas fa-volume-up"></i> Escuchar sonido
                </button>
            </div>
        </div>
    `;

    tablaAnimales.innerHTML += animalCard;
};




document.getElementById('Animales').addEventListener('click', (event) => {
    if (event.target.tagName === 'IMG') {
        // Obtener el modal y su cuerpo
        const modalBody = document.querySelector('.modal-body');
        
        // Capturar los datos de la imagen usando los atributos data-*
        const nombre = event.target.getAttribute('data-nombre');
        const edad = event.target.getAttribute('data-edad');
        const comentarios = event.target.getAttribute('data-comentarios');
        const imagenSrc = event.target.src;

        // Insertar los datos en el modal
        modalBody.innerHTML = `
            <h5>${nombre}</h5>
            <img src="${imagenSrc}" class="img-fluid" alt="${nombre}">
            <p><strong>Edad:</strong> ${edad}</p>
            <p><strong>Comentarios:</strong> ${comentarios}</p>
            <button id="closeModal" class="btn btn-danger">Cerrar</button>
        `;
        
        // Abrir el modal usando Bootstrap
        const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
        modal.show();

        // Agregar un evento al botón para cerrar el modal
        document.getElementById('closeModal').addEventListener('click', () => {
            modal.hide(); // Ocultar el modal al hacer clic en "Cerrar"
        });
    }
});



// Función para reproducir el sonido del animal
window.reproducirSonido = function(sonido) {
    const audio = new Audio(sonido);
    audio.play();
}
// Función para limpiar el formulario después de registrar el animal
const limpiarFormulario = () => {
    document.getElementById('animal').value = "";
    document.getElementById('edad').value = "";
    document.getElementById('comentarios').value = "";
    //limpiar foto de animal
    document.getElementById('preview').innerHTML = '';
};

// Evento para el botón de registro
document.getElementById('btnRegistrar').addEventListener('click', registrarAnimal);

