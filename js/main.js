/* import Jugador from './Jugador.js';
import Tablero from './Tablero.js';
import Barco from './Barco.js';
import Posicion from './Posicion.js';

const jugador1 = new Jugador (prompt("Ingrese su nombre:"));
const jugador2 = new Jugador ("Thread");
jugador2.ponerBarco(new Posicion(1,1), new Posicion(1,1));
jugador2.ponerBarco(new Posicion(2,3), new Posicion(3,3));
jugador2.ponerBarco(new Posicion(6,2), new Posicion(6,5));

alert ("Hay tres barcos:\n1) Un acorazado de 1 casillero de largo\n2)Un crucero de dos casilleros de largo\n3)Un destructor de cuatro casilleros de largo");

// Se muestra por consola los barcos del enemigo.
console.log(`Mapa de ${jugador2.nombre}:`);
jugador2.tablero.mostrarMapa();

let finalizado = false;

// Hasta que no se hunde el último barco del enemigo el while no termina.

while(!finalizado){
    const p = jugador1.posicionADisparar();

    jugador1.marcarTableroEnemigo(p ,jugador2.recibirDisparo(p));

    if(jugador2.barcos.length === 0){
        alert("Juego terminado");
        finalizado = true;
    }

    console.log(jugador2.barcos);

    // Se muestra por consola el mapa con los tiros efectuados.
    console.log(`Mapa del enemigo de ${jugador1.nombre}:`);
    jugador1.tableroEnemigo.mostrarMapa();
} */

let b = document.querySelector("body");
b.addEventListener("keydown", pressAnykey);
let pos = [0, 1, 2];

function pressAnykey(e){
    e.target.removeEventListener (e.type, pressAnykey);
    let start = document.body.querySelector(".start");
    start.removeChild(start.querySelector(".start span"));
    let ol = document.createElement("ol");
    ol.id = "menu";
    start.appendChild(ol);

    let options = ["Single Player", "Multiplayer", "Options"];

    for (const option of options){
        let li = document.createElement("li");
        li.innerHTML = option;
        ol.appendChild(li);
    }

    start.className = "menu";
    ol.firstChild.className = "select";

    b.addEventListener("keydown", cambiarEleccion);
}

function cambiarEleccion(e){
    const lis = document.body.getElementsByTagName("li");
    let audio = new Audio("assets/sounds/pop.mp3");

    if (e.keyCode === 40){
        lis[pos[0]].className = "";
        pos.push(pos.shift());
        lis[pos[0]].className = "select";
        audio.play();
    }
    if (e.keyCode === 38){
        lis[pos[0]].className = "";
        pos.unshift(pos.pop());
        lis[pos[0]].className = "select";
        audio.play();
    }
}