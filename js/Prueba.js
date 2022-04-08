import Barco from "./Barco.js";
import Tablero from "./Tablero.js";
import Posicion from "./Posicion.js";
import Jugador from "./Jugador.js";

/* Pruebas sobre la clase Barco */

const barco1 = new Barco ("Acorazado");

console.log (barco1);

barco1.cambiarEstado("Dañado");

console.log (barco1);

/* Prubas sobre la clase Tablero */

const tablero1 = new Tablero ();

console.log(tablero1.mapa[0]);
console.log(tablero1.mapa[9]);

tablero1.marcarAgua(new Posicion (0,0));
tablero1.marcarDañado(new Posicion (0,9));

console.log(tablero1.mapa[0]);

/* Pruebas Jugador */

const jugador1 = new Jugador ("Daniel");
console.log(jugador1.nombre);
jugador1.ponerBarco(new Posicion (4, 3), new Posicion(4, 5));
jugador1.ponerBarco(new Posicion (9, 3), new Posicion(7, 3));
jugador1.tablero.mapa.forEach(x => {
    console.log(x);
});