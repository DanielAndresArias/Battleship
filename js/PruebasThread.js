import Thread from './Thread.js';
import Jugador from './Jugador.js';
import Tablero from './Tablero.js';
import Barco from './Barco.js';
import Posicion from './Posicion.js';

const thread = new Thread ("Thread");
thread.ponerBarco(new Posicion(1,1), new Posicion(1,1));
thread.ponerBarco(new Posicion(3,4), new Posicion(4,4));
thread.ponerBarco(new Posicion(6,2), new Posicion(6,5));
thread.ponerBarco(new Posicion(7,8), new Posicion(9,8));

//console.log(thread.disparoAlAzar());

/* console.log(thread.disparar());

console.log(thread.posicionInicial);

console.log(thread.disparosDisponibles);

thread.recibirRespuestaEnemigo("A");

console.log(...thread.posicionesADisparar);

console.log(thread.disparar());

console.log(thread.posicionInicial);

console.log(thread.disparosDisponibles);

thread.recibirRespuestaEnemigo("D");

thread.proximasPosicionesADisparar();

console.log(...thread.posicionesADisparar);

console.log(thread.disparar());

console.log(thread.disparosDisponibles);

thread.recibirRespuestaEnemigo("D");

thread.proximasPosicionesADisparar();

console.log(...thread.posicionesADisparar);

console.log(thread.disparar());

console.log(thread.disparosDisponibles); */

/* for (let i=0; i<99; i++)
thread.disparoAlAzar(); */

pruebaTurno("A");
pruebaTurno("D");
pruebaTurno("A");
pruebaTurno("A");
pruebaTurno("D");
pruebaTurno("D");
pruebaTurno("A");

function pruebaTurno(tipo=""){

    console.log("disparar");

    console.log(thread.disparar());

    console.log("posicion inicial");

    console.log(thread.posicionInicial);

    console.log("disparos disponibles");

    console.log(thread.disparosDisponibles);

    thread.recibirRespuestaEnemigo(tipo);

    console.log("posiciones a disparar");

    console.log(...thread.posicionesADisparar);
}