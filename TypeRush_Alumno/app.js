// TYPERUSH — VERSION ALUMNO
// Completa los retos en orden. Prueba el navegador después de cada uno.
const PALABRAS = ["ARRAY", "EVENTO", "OBJETO", "FUNCION", "VARIABLE", "BUCLE", "DOM", "SCRIPT"];
const TIEMPO_INICIAL = 60;
const PENALIZACION = 5;

const palabrasDiv = document.querySelector("#palabras");
const entrada = document.querySelector("#entrada");
const formulario = document.querySelector("#formulario");
const tiempoTexto = document.querySelector("#tiempo");
const contador = document.querySelector("#contador");
const mensaje = document.querySelector("#mensaje");
const barra = document.querySelector("#progreso-tiempo");
const botonComenzar = document.querySelector("#comenzar");
const botonComprobar = document.querySelector("#comprobar");
const botonReiniciar = document.querySelector("#reiniciar");

let pendientes = [...PALABRAS];
let segundos = TIEMPO_INICIAL;
let intervalo = null;
let jugando = false;

function dibujar() {
  palabrasDiv.innerHTML = "";

  pendientes.forEach(valor => {
    let span = document.createElement("span");
    span.classList.add("palabra");
    span.textContent = valor;
    palabrasDiv.appendChild(span);
  });

  // RETO 1: Mostrar las palabras.
  // Recorre "pendientes" con forEach(). Por cada palabra:
  // 1) Crea un span con document.createElement("span").
  // 2) Añade la clase "palabra" usando classList.add().
  // 3) Asigna su textContent.
  // 4) Añádelo a palabrasDiv con appendChild().

  // Estos marcadores ya están resueltos para que puedas concentrarte en el juego.
  tiempoTexto.textContent = `${segundos} s`;
  contador.textContent = `${PALABRAS.length - pendientes.length} / ${PALABRAS.length}`;
  barra.style.width = `${segundos / TIEMPO_INICIAL * 100}%`;
  barra.style.backgroundColor = segundos <= 15 ? "#ef6b65" : "#38bda1";
}

function terminar(victoria) {
  // RETO 4: Finalizar la partida.
  // Cambia jugando a false; detén el intervalo con clearInterval(intervalo).
  // Desactiva entrada y botonComprobar.
  // Muestra un mensaje distinto según victoria sea true o false.
  barra.style.width = `100%`;
  if (victoria){
    barra.style.backgroundColor = "#38bda1";
  } else {
    tiempoTexto.textContent = 0 + " s";
    barra.style.backgroundColor = "#ef6b65";
  }
    jugando = false;
    clearInterval(intervalo);
    entrada.disabled = true;
    botonComprobar.disabled = true;
  if (victoria){
    mensaje.textContent = "Felicidades has ganado !!!";
  } else {
    mensaje.textContent = "Has perdido la proxima vez sera.";
  }

}

function comprobarPalabra(evento) {
  evento.preventDefault(); // Evita recargar la página al pulsar Intro.
  if (!jugando) return;
  const palabra = entrada.value.trim().toUpperCase();
  if (palabra === "") return;

  // RETO 2: Comprobar la palabra.
  // Si pendientes.includes(palabra) es true:
  //   elimina la palabra usando filter() y muestra "¡Correcto!".
  // En caso contrario:
  //   resta PENALIZACION a segundos (sin bajar de cero)
  //   y muestra "Palabra incorrecta".
  if (pendientes.includes(palabra) === true){
    pendientes =  pendientes.filter(texto => texto !== palabra);
    mensaje.textContent = "¡Correcto!";
  } else {
    segundos -= PENALIZACION;
    mensaje.textContent = "Palabra incorrecta";  
  }

  entrada.value = "";
  dibujar();

  // RETO 4: Detectar victoria o derrota.
  // Si pendientes.length === 0, llama a terminar(true).
  // Si segundos === 0, llama a terminar(false).
  // Si no ha terminado, devuelve el foco a entrada con entrada.focus().
  if (pendientes.length === 0)
  {
    terminar(true);
  } else if (segundos === 0)  {
    terminar(false)
    } else {
    entrada.focus();
  }
}

function comenzar() {
  if (jugando || segundos === 0 || pendientes.length === 0) return;
  jugando = true;
  botonComenzar.disabled = true;
  entrada.disabled = false;
  botonComprobar.disabled = false;
  entrada.focus();
  mensaje.textContent = "¡Adelante!";

  intervalo = setInterval(() => {
    segundos--;
    dibujar();
    if (segundos === 0 || segundos < 0){
      terminar(false);
    }
  }, 1000);

  // RETO 3: Temporizador.
  // Usa setInterval(..., 1000) y guarda el resultado en "intervalo".
  // Cada segundo: resta 1 a segundos, llama a dibujar().
  // Si segundos llega a cero, llama a terminar(false).
}

// Esta función ya está resuelta. Úsala para probar los retos repetidamente.
function reiniciar() {
  clearInterval(intervalo);
  intervalo = null;
  pendientes = [...PALABRAS];
  segundos = TIEMPO_INICIAL;
  jugando = false;
  entrada.value = "";
  entrada.disabled = true;
  botonComprobar.disabled = true;
  botonComenzar.disabled = false;
  mensaje.textContent = "Pulsa Comenzar para jugar.";
  dibujar();
}

formulario.addEventListener("submit", comprobarPalabra);
botonComenzar.addEventListener("click", comenzar);
botonReiniciar.addEventListener("click", reiniciar);
reiniciar();
