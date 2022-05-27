/* ---------------------------- CLASE EN DESARROLLO ------------------------------ */

import Jugador from "./Jugador.js";
import Barco from "./Barco.js";
import Tablero from "./Tablero.js";
import Posicion from "./Posicion.js";

export default class Thread extends Jugador{
    disparosDisponibles=[];
    posicionesADisparar=[];
    posicionInicial=null;
    posicionAnterior=null;
    respuestaEnemigo="";

    constructor(nombre=""){
        super(nombre);
        this.cargarDisparosDisponibles();
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
        
        if(this.fueAgua()){
            if(this.posicionAnterior != null && this.posicionesADisparar.length === 0){
                this.descartarPosicionesADisparar();
                this.proximaPosicionADisparar();
            }
        }
        else if(this.fueDañado()){
            if(this.posicionAnterior === null){
                this.proximasPosicionesADisparar();
            }
            else{
                this.descartarPosicionesADisparar();
                this.proximaPosicionADisparar();
            }
        }
        else if(this.fueHundido()){
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

        (posX > 0) && (this.disparosDisponibles.includes(posY*10 + posX-1) && this.posicionesADisparar.push(new Posicion(posY, posX-1)));
        
        (posY > 0) && (this.disparosDisponibles.includes((posY-1)*10 + posX) && this.posicionesADisparar.push(new Posicion(posY-1, posX)));
        
        (posX < 9) && (this.disparosDisponibles.includes(posY*10 + posX+1) && this.posicionesADisparar.push(new Posicion(posY, posX+1)));
        
        (posY < 9) && (this.disparosDisponibles.includes((posY+1)*10 + posX) && this.posicionesADisparar.push(new Posicion(posY+1, posX)));
        
    }

    proximaPosicionADisparar(){
        if(this.fueDañado()){
            if(this.fueraDelLimite()){
                this.mantenerDireccion();
            }
            else{
                this.cambiarDireccion();
            }
        }
        else if(this.fueAgua()){
            this.cambiarDireccion();
        }

        /* if(this.tableroEnemigo.mapa[this.posicionesADisparar[0].y][this.posicionesADisparar[0].x] === "A"){
            this.cambiarDireccion();
        } */
    }

    fueDañado(){
        return (this.respuestaEnemigo === "D");
    }

    fueAgua(){
        return (this.respuestaEnemigo === "A");
    }

    fueHundido(){
        return (this.respuestaEnemigo === "H");
    }

    fueraDelLimite(){
        if(this.posicionInicial.x === this.posicionAnterior.x){
            if(this.posicionAnterior.y !== 9){
                return true;
            }
            else{
                return false;
            }
        }
        else{
            if(this.posicionAnterior.x !== 9){
                return true;
            }
            else{
                return false;
            }
        }
    }

    mantenerDireccion(){
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
        if(this.tableroEnemigo.mapa[this.posicionesADisparar[0].y][this.posicionesADisparar[0].x] === "A"){
            this.cambiarDireccion();
        }
    }

    cambiarDireccion(){
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

    descartarPosicionesADisparar(){
        this.posicionesADisparar.splice(0, this.posicionesADisparar.length);
    }

    cargarDisparosDisponibles(){
        for(let i=0; i<100; i++){
            this.disparosDisponibles[i] = i;
        }
    }
}