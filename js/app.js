const nombres = [];

const input = document.querySelector('.input-amigo');
const botonAgregar = document.querySelector('.agregar');
const listaAmigos = document.querySelector('.lista__contenido');

function actualizarLista() {
    listaAmigos.innerHTML = '';

    //Agregar a la lista del html
    for (let i = 0; i < nombres.length; i++) {
        const nuevoAmigo = document.createElement('li');
        nuevoAmigo.textContent = nombres[i];
        nuevoAmigo.classList.add('lista__amigo')
        listaAmigos.appendChild(nuevoAmigo);
    }
}

function agregarAmigos() {
    const texto = input.value.trim(); //Eliminar los espacios en blanco antes y despues

    //Evitar que se intente ingresar el campo en blanco
    if (texto === '') {
        alert('El campo no puede estar en blanco, agrega un nombre por favor')
        return;
    }

    //Agregar elementos al array
    nombres.push(texto);

    //Actualizar Lista
    actualizarLista();
    input.value = '';
}

//Sortear amigos


botonAgregar.addEventListener('click', agregarAmigos);
