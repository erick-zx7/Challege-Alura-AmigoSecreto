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

function sortearAmigo() {
    if (nombres.length === 0) {
        alert('No hay amigos para sortear');
        return;
    }

    const indice = Math.floor(Math.random() * nombres.length);
    const nombreSorteado = nombres[indice];

    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `El amigo sorteado es: ${nombreSorteado}`;
}

//Sortear amigos
botonAgregar.addEventListener('click', agregarAmigos);

const botonSortear = document.getElementById("sortear");
botonSortear.addEventListener("click", function(e) {
    e.preventDefault(); // Evita que el formulario se recargue
    sortearAmigo();
});
