import Posicion from "./Posicion.js"

export default class Tablero{
    mapa = new Array(10);

    constructor (){
        this.crearMapa();
        this.inicializarMapa ();
    }

    /* Crea un arreglo de 10x10 casilleros */

    crearMapa (){
        for (let i=0; i<this.mapa.length; i++){
            this.mapa [i] = new Array (10);
        }
    }

    /* Inicializa el arreglo mapa con X por defecto en todas sus posiciones. */

    inicializarMapa(){
        for (let i=0; i<this.mapa.length; i++){
            for (let j=0; j<this.mapa[i].length; j++){
                this.mapa [i][j] = "X";
            }
        }
    }

    /* Cambia el estado de un casillero ubicando una B para representar la posicion de un barco */

    marcarBarco(posicion=new Posicion (0,0)){
        this.mapa [posicion.y][posicion.x] = "B";
    }

    /* Cambia el estado de un casillero ubicando una A para representar agua */

    marcarAgua (posicion=new Posicion (0,0)){
        this.mapa [posicion.y][posicion.x] = "A";
        alert("¡Agua!");
    }

     /* Cambia el estado de un casillero ubicando una D para representar la posicion de un barco dañado */

    marcarDañado (posicion=new Posicion (0,0)){
        this.mapa [posicion.y][posicion.x] = "D";
    }

    /* Muestra por consola el tablero completo */

    mostrarMapa (){
        for (let i=0; i<10; i++){
            let cadena = "";
            for (let j=0; j<10; j++){
                cadena += ` ${this.mapa[i][j]}`;
            }
            console.log(cadena);
        }
    }

    esAguaOEsDañado(posicion=new Posicion(0, 0)){
        if(this.mapa[posicion.y][posicion.x] === 'A' || this.mapa[posicion.y][posicion.x] === 'D'){
            return true;
        }
    }
}