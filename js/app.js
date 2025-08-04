// Variables globales
const nombres = [];
const input = document.querySelector('.input-amigo');
const botonAgregar = document.querySelector('.agregar');
const listaAmigos = document.getElementById('lista-contenido');
const botonSortear = document.getElementById('sortear');
const botonReiniciar = document.getElementById('reiniciar');
const resultado = document.getElementById('resultado');
const mensajeError = document.getElementById('mensaje-error');
const mensajeExito = document.getElementById('mensaje-exito');

// Función para mostrar mensajes de exito y error
function mostrarMensaje(tipo, texto) {
    // Ocultar todos los mensajes al inicio
    mensajeError.style.display = 'none';
    mensajeExito.style.display = 'none';
    
    if (tipo === 'error') {
        mensajeError.textContent = texto;
        mensajeError.style.display = 'block';
    } else if (tipo === 'exito') {
        mensajeExito.textContent = texto;
        mensajeExito.style.display = 'block';
    }
    
    // Limpiar mensajes después de 3 segundos
    setTimeout(() => {
        mensajeError.style.display = 'none';
        mensajeExito.style.display = 'none';
    }, 3000);
}

// Función para actualizar la lista
function actualizarLista() {
    listaAmigos.innerHTML = '';
    
    if (nombres.length === 0) {
        listaAmigos.innerHTML = '<li class="lista__vacia">No hay amigos agregados todavía</li>'; //Mensaje inicial
        resultado.textContent = 'Esperando sorteo...'; //Mensaje antes del sorteo
        resultado.classList.add('vacio');
        return;
    }

    //Agrega los nuevos elementos a la lista html
    nombres.forEach((nombre, index) => {
        const nuevoAmigo = document.createElement('li'); 
        nuevoAmigo.classList.add('lista__amigo');
        nuevoAmigo.innerHTML = `
            <span>${nombre}</span>
            <button class="eliminar-amigo" data-index="${index}" aria-label="Eliminar amigo">×</button>
        `;
        listaAmigos.appendChild(nuevoAmigo);
    });
    
    // Boton de eliminar amigo
    document.querySelectorAll('.eliminar-amigo').forEach(boton => {
        boton.addEventListener('click', eliminarAmigo);
    });
}

// Función para agregar un amigo
function agregarAmigo() {
    const texto = input.value.trim();
    
    // Validar que el campo no este vacio
    if (texto === '') {
        mostrarMensaje('error', 'Por favor ingresa un nombre válido'); //Sustituye el alert
        return;
    }
    
    // Validar que algun nombre se repita
    if (nombres.includes(texto)) {
        mostrarMensaje('error', 'Este nombre ya está en la lista');
        return;
    }
    
    // Agregar los nombres al array y actualizar lista
    nombres.push(texto);
    actualizarLista();
    input.value = '';
    input.focus();
    
    // Mostrar el mensaje de agregado con exito
    mostrarMensaje('exito', `"${texto}" ha sido agregado a la lista`);
}

// Función para eliminar un amigo
function eliminarAmigo(e) {
    const index = parseInt(e.target.dataset.index);
    const nombreEliminado = nombres[index];
    
    nombres.splice(index, 1);
    actualizarLista();
    
    // Mostrar mensaje de nombre eliminado
    mostrarMensaje('exito', `"${nombreEliminado}" ha sido eliminado de la lista`);
}

// Función para sortear un amigo
function sortearAmigo() {
    if (nombres.length === 0) {
        mostrarMensaje('error', 'No hay amigos para sortear'); //Validar que haya al menos 1 elemento a sortear
        return;
    }
    
    // Resetear estilos de la lista
    const items = document.querySelectorAll('.lista__amigo');
    items.forEach(item => {
        item.style.backgroundColor = '';
        item.style.color = '';
        item.style.opacity = '';
    });
    
    // Animación de sorteo
    resultado.classList.remove('vacio');
    resultado.classList.add('animar');
    resultado.textContent = 'Sorteando...';
    
    // Sortear la lista de amigos
    setTimeout(() => {
        const indice = Math.floor(Math.random() * nombres.length);
        const nombreSorteado = nombres[indice];
        
        resultado.textContent = nombreSorteado;
        resultado.classList.remove('animar');
        
        // Destacar elemento en la lista que ganó el sorteo
        items.forEach((item, i) => {
            if (i === indice) {
                item.style.backgroundColor = 'var(--primario-oscuro)';
                item.style.color = 'var(--blanco)';
            } else {
                item.style.opacity = '0.6';
            }
        });
    }, 1500);
}

// Función para reiniciar el juego
function reiniciarTodo() {
    nombres.length = 0;
    input.value = '';
    resultado.textContent = 'Esperando sorteo...';
    resultado.classList.add('vacio');
    actualizarLista();
    mostrarMensaje('exito', 'Todo ha sido reiniciado');
}

// Boton agregar amigo
botonAgregar.addEventListener('click', agregarAmigo);

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        agregarAmigo();
    }
});

botonSortear.addEventListener('click', sortearAmigo); //Boton de sortear
botonReiniciar.addEventListener('click', reiniciarTodo); //Boton de reiniciar

// Inicializar la lista
actualizarLista();