/* ---------------------------- CLASE EN DESARROLLO ------------------------------ */


import Barco from "./Barco.js";
import Tablero from "./Tablero.js";
import Posicion from "./Posicion.js";

export default class Thread{
    nombre;
    barcos=[];
    disparosARealizar=[];
    tablero = new Tablero();
    tableroEnemigo = new Tablero();
    posicionAnterior;

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

    /* Determina una posicion a disparar de manera aleatoria y verifica que no haya sido descartada antes para luego guardarla
       en disparosARealizar. */

    posicionADisparar (){
        while(true){
            let x = this.getRandomInt(0, 10);
            let y = this.getRandomInt(0, 10);

            if (this.tableroEnemigo.esAguaOEsDañado(new Posicion(x, y))){
            }
            else{
                this.disparosARealizar.push(new Posicion(x, y));
                break;
            }
        }
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

    getRandomInt(min=0, max=0) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    proximasPosicionesADisparar (){
        const posX = this.posicionAnterior.x;
        const posY = this.posicionAnterior.y;
        
        if(this.disparosARealizar.length === 0){
            if(posX != 0){
                this.disparosARealizar.push(new Posicion(posX-1, posY));
            }
            if(posY != 0){
                this.disparosARealizar.push(new Posicion(posX, posY-1));
            }
            if(posX != 9){
                this.disparosARealizar.push(new Posicion(posX+1, posY));
            }
            if(posY != 9){
                this.disparosARealizar.push(new Posicion(posX, posY+1));
            }
        }

        
    }

    disparar(){
        this.posicionAnterior = this.disparosARealizar.pop();
    }
}