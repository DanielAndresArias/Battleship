import Barco from "./Barco.js";
import Tablero from "./Tablero.js";
import Posicion from "./Posicion.js";

export default class Jugador{
    nombre;
    barcos=[];
    tablero = new Tablero();
    tableroEnemigo = new Tablero();

    constructor(nombre=""){
        this.nombre = nombre;
    }

    /* Recibe por parámetros las posiciones en donde se va a ubicar el barco. 
    Las guarda en cada objeto barco y las agrega al arreglo barcos. */

    crearBarco(posIni = new Posicion (0,0), posFin = new Posicion (9,9)){
        if(posIni.x === posFin.x){
            const b = new Barco(Math.abs(posFin.y-posIni.y));
            b.establecerPosiciones(posIni, posFin);
            this.barcos.push(b);
        }
        else if(posIni.y === posFin.y){
            const b = new Barco(Math.abs(posFin.x-posIni.x));
            b.establecerPosiciones(posIni, posFin);
            this.barcos.push(b);
        }
    }

    /* Recibe por parámetros las posiciones en donde se va a ubicar el barco.
    Ubica el barco en el tablero y llama al método crearBarco. */

    ponerBarco (posIni = new Posicion (0,0), posFin = new Posicion (9,9)){
        this.crearBarco(posIni, posFin);
        const p = this.barcos[this.barcos.length-1].posiciones;
        for(let i=0; i<p.length; i++){
            this.tablero.marcarBarco(p[i]);
        }
    }

    /* Pide por consola al jugador la posición x e y para luego devolver un objeto Posicion con ambos valores. */

    posicionADisparar (){
        prompt(`Turno de ${this.nombre}, ingrese cualquier letra para continuar...`);
        let x = Number (prompt("Ingrese coordenada x a disparar:"));
        let y = Number (prompt("Ingrese coordenada y a disparar:"));

        return new Posicion(x,y);
    }

    /* Retorna A si se a disparado a Agua o D si se daño un barco del tablero. */

    recibirDisparo (posicion = new Posicion(0,0)){
        if(this.tablero.mapa[posicion.x][posicion.y] === "X"){
            return "A";
        }
        else if(this.tablero.mapa[posicion.x][posicion.y] === "B"){
            for (let i=0; i<this.barcos.length; i++){
                if (this.barcos[i].seEncuentra(posicion)){
                    this.barcos[i].incrementarDisparos();
                    if (this.barcos[i].estado === "Hundido"){
                        this.barcos.splice(i,1);
                        break;
                    }
                }
            }
            return "D";
        }
    }

    /* Recibe por parámetros la posición y respuesta del enemigo al disparo efectuado.
    Marca en el tableroEnemigo la respuesta recibida. */

    marcarTableroEnemigo (posicion = new Posicion(0,0), tipo = ""){
        if (tipo == "A"){
            this.tableroEnemigo.marcarAgua(posicion);
        }
        else if (tipo == "D"){
            this.tableroEnemigo.marcarDañado(posicion);
        }
    }
}