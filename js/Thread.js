/* ---------------------------- CLASE EN DESARROLLO ------------------------------ */


import Barco from "./Barco.js";
import Tablero from "./Tablero.js";
import Posicion from "./Posicion.js";

export default class Thread{
    nombre;
    barcos=[];
    disparosDisponibles=[];
    posicionesADisparar=[];
    posicionInicial=null;
    posicionAnterior=null;
    respuestaEnemigo="";
    tablero = new Tablero();
    tableroEnemigo = new Tablero();

    constructor(nombre=""){
        this.nombre = nombre;
        this.cargarDisparosDisponibles();
    }

    cargarDisparosDisponibles(){
        for(let i=0; i<100; i++){
            this.disparosDisponibles[i] = i;
        }
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

    /* Retorna A si se ha disparado a Agua o D si se daño un barco del tablero. */

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
                        return "H";
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

    disparar(){
        if(this.posicionesADisparar.length === 0){
            this.posicionInicial = this.disparoAlAzar();
            return this.posicionInicial;
        }
        else if(this.posicionesADisparar.length > 0){
            this.posicionAnterior = this.posicionesADisparar.pop();
            const indice = this.disparosDisponibles.indexOf(this.posicionAnterior.y*10+this.posicionAnterior.x);
            this.disparosDisponibles.splice(indice, 1);
            return this.posicionAnterior;
        }
    }

    recibirRespuestaEnemigo(tipo=""){
        this.respuestaEnemigo = tipo;
        
        if(this.respuestaEnemigo === "A"){
            if(this.posicionAnterior != null && this.posicionesADisparar.length === 0){
                this.descartarPosicionesADisparar();
                this.proximaPosicionADisparar();
            }
        }
        else if(this.respuestaEnemigo === "D"){
            if(this.posicionAnterior === null){
                this.proximasPosicionesADisparar();
            }
            else{
                this.descartarPosicionesADisparar();
                this.proximaPosicionADisparar();
            }
        }
        else if(this.respuestaEnemigo === "H"){
            this.posicionesADisparar.splice(0, this.posicionesADisparar.length);
            this.posicionAnterior = null;
            this.posicionInicial = null;
        }
    }

    /* Determina una posicion a disparar de manera aleatoria y verifica que no haya sido descartada antes para luego guardarla
       en disparosARealizar. */

    disparoAlAzar (){
        const posRandom = this.disparosDisponibles[this.getRandomInt(0, this.disparosDisponibles.length)];
        this.disparosDisponibles.splice(this.disparosDisponibles.indexOf(posRandom), 1);
        return new Posicion (Math.trunc(posRandom/10), posRandom%10);
    }

    proximasPosicionesADisparar (){
        const posX = this.posicionInicial.x;
        const posY = this.posicionInicial.y;

        if(posX > 0){
            this.posicionesADisparar.push(new Posicion(posY, posX-1));
        }
        if(posY > 0){
            this.posicionesADisparar.push(new Posicion(posY-1, posX));
        }
        if(posX < 9){
            this.posicionesADisparar.push(new Posicion(posY, posX+1));
        }
        if(posY < 9){
            this.posicionesADisparar.push(new Posicion(posY+1, posX));
        }
    }

    proximaPosicionADisparar(){
        if(this.respuestaEnemigo === "D"){
            if(this.posicionInicial.x === this.posicionAnterior.x){
                if((this.posicionInicial.y - this.posicionAnterior.y) < 0){
                    this.posicionesADisparar.push(new Posicion(this.posicionAnterior.y+1, this.posicionAnterior.x));
                
                }
                else{
                    this.posicionesADisparar.push(new Posicion(this.posicionAnterior.y-1, this.posicionAnterior.x));
                
                }
            }
            else{
                if((this.posicionInicial.x - this.posicionAnterior.x) < 0){
                    this.posicionesADisparar.push(new Posicion(this.posicionAnterior.y, this.posicionAnterior.x+1));
                
                }
                else{
                    this.posicionesADisparar.push(new Posicion(this.posicionAnterior.y, this.posicionAnterior.x-1));
                
                }
            }
        }
        else if(this.respuestaEnemigo === "A"){
            if(this.posicionInicial.x === this.posicionAnterior.x){
                if((this.posicionInicial.y - this.posicionAnterior.y) < 0){
                    this.posicionesADisparar.push(new Posicion(this.posicionInicial.y-1, this.posicionInicial.x));
                
                }
                else{
                    this.posicionesADisparar.push(new Posicion(this.posicionInicial.y+1, this.posicionInicial.x))
                
                }
            }
            else{
                if((this.posicionInicial.x - this.posicionAnterior.x) < 0){
                    this.posicionesADisparar.push(new Posicion(this.posicionInicial.y, this.posicionInicial.x-1))
                }
                else{
                    this.posicionesADisparar.push(new Posicion(this.posicionInicial.y, this.posicionInicial.x+1))
                
                }
            }
        }
    }

    descartarPosicionesADisparar(){
        this.posicionesADisparar.splice(0, this.posicionesADisparar.length);
    }

    getRandomInt(min=0, max=0) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}