import Jugador from "./Jugador.js";
import Posicion from "./Posicion.js";

export default class Thread extends Jugador{
    disparosDisponibles=[];
    posicionesADisparar=[];
    posicionInicial=null;
    posicionAnterior=null;
    respuestaEnemigo="";

    /* Constructor de la clase Thread. Llama a la superclase y le pasa el nombre por parámetro.
       Carga el arreglo de disparos disponibles. */

    constructor(nombre=""){
        super(nombre);
        this.cargarDisparosDisponibles();
    }

    /* Algoritmo para disparar al mapa de jugador. Devuelve una posición válida a disparar. */

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

    /* Recibe por parámetro la respuesta de jugador al disparo. Ejecuta ciertas funciones en base a la respuesta recibida. */

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

    /* Carga entre dos y cuatro posiciones en el arreglo posicionesADisparar. */

    proximasPosicionesADisparar (){
        const posX = this.posicionInicial.x;
        const posY = this.posicionInicial.y;

        (posX > 0) && (this.disparosDisponibles.includes(posY*10 + posX-1) && this.posicionesADisparar.push(new Posicion(posY, posX-1)));
        
        (posY > 0) && (this.disparosDisponibles.includes((posY-1)*10 + posX) && this.posicionesADisparar.push(new Posicion(posY-1, posX)));
        
        (posX < 9) && (this.disparosDisponibles.includes(posY*10 + posX+1) && this.posicionesADisparar.push(new Posicion(posY, posX+1)));
        
        (posY < 9) && (this.disparosDisponibles.includes((posY+1)*10 + posX) && this.posicionesADisparar.push(new Posicion(posY+1, posX)));
        
    }

    /* Carga la próxima posición a disparar. */

    proximaPosicionADisparar(){
        if(this.fueDañado()){
            if(this.fueraDelLimite()){
                this.mantenerDireccion();
                (this.tableroEnemigo.mapa[this.posicionesADisparar[0].y][this.posicionesADisparar[0].x] === "A") && this.cambiarDireccion();
            }
            else{
                this.cambiarDireccion();
            }
        }
        else if(this.fueAgua()){
            this.cambiarDireccion();
        }
    }

    /* Las tres funciones siguientes comprueban la respuesta del enemigo. Devuelven true si se cumple la condición.
       False caso contrario. */

    fueDañado = () => (this.respuestaEnemigo === "D");

    fueAgua = () => (this.respuestaEnemigo === "A");

    fueHundido = () => (this.respuestaEnemigo === "H");

    /* Comprueba que el último disparo no haya sido en el límite del mapa. True si no está en el límite.
       False caso contrario. */

    fueraDelLimite(){
        return (this.posicionInicial.x === this.posicionAnterior.x)? this.posicionAnterior.y !== 9 : this.posicionAnterior.x !== 9;
    }

    /* Carga el próximo disparo a realizar manteniendo la dirección actual de disparos. */

    mantenerDireccion(){
        if(this.posicionInicial.x === this.posicionAnterior.x){
            ((this.posicionInicial.y - this.posicionAnterior.y) < 0)? this.avanzarPosYAnt() : this.retrocederPosYAnt();
        }
        else{
            ((this.posicionInicial.x - this.posicionAnterior.x) < 0)? this.avanzarPosXAnt() : this.retrocederPosXAnt();
        }
    }

    avanzarPosXAnt = () => this.posicionesADisparar.push(new Posicion(this.posicionAnterior.y, this.posicionAnterior.x+1));

    retrocederPosXAnt = () => this.posicionesADisparar.push(new Posicion(this.posicionAnterior.y, this.posicionAnterior.x-1));

    avanzarPosYAnt = () => this.posicionesADisparar.push(new Posicion(this.posicionAnterior.y+1, this.posicionAnterior.x));

    retrocederPosYAnt = () => this.posicionesADisparar.push(new Posicion(this.posicionAnterior.y-1, this.posicionAnterior.x));

    /* Carga el próximo disparo a realizar cambiando la dirección actual y tomando como referencia al disparo inicial realizado. */

    cambiarDireccion(){
        if(this.posicionInicial.x === this.posicionAnterior.x){
            ((this.posicionInicial.y - this.posicionAnterior.y) < 0)? this.retrocederPosYIni() : this.avanzarPosYIni();
        }
        else{
            ((this.posicionInicial.x - this.posicionAnterior.x) < 0)? this.retrocederPosXIni() : this.avanzarPosXIni();
        }
    }

    avanzarPosXIni = () => this.posicionesADisparar.push(new Posicion(this.posicionInicial.y, this.posicionInicial.x+1));

    retrocederPosXIni = () => this.posicionesADisparar.push(new Posicion(this.posicionInicial.y, this.posicionInicial.x-1));

    avanzarPosYIni = () => this.posicionesADisparar.push(new Posicion(this.posicionInicial.y+1, this.posicionInicial.x));

    retrocederPosYIni = () => this.posicionesADisparar.push(new Posicion(this.posicionInicial.y-1, this.posicionInicial.x));

    descartarPosicionesADisparar = () => this.posicionesADisparar.splice(0, this.posicionesADisparar.length);

    cargarDisparosDisponibles(){
        for(let i=0; i<100; i++){
            this.disparosDisponibles[i] = i;
        }
    }
}