import Posicion from "./Posicion.js"

export default class Tablero{
    mapa;

    constructor (){
        this.crearMapa();
        this.inicializarMapa ();
    }

    crearMapa (){
        this.mapa = new Array(10);
        for (let i=0; i<this.mapa.length; i++){
            this.mapa [i] = new Array (10);
        }
    }

    inicializarMapa(){
        for (let i=0; i<this.mapa.length; i++){
            for (let j=0; j<this.mapa[i].length; j++){
                this.mapa [i][j] = "X";
            }
        }
    }

    marcarBarco(posicion=new Posicion (0,0)){
        this.mapa [posicion.x][posicion.y] = "B";
    }

    marcarAgua (posicion=new Posicion (0,0)){
        this.mapa [posicion.x][posicion.y] = "A";
    }

    marcarDañado (posicion=new Posicion (0,0)){
        this.mapa [posicion.x][posicion.y] = "D";
    }
}