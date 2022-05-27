import Barco from "./Barco.js";
import Tablero from "./Tablero.js";
import Posicion from "./Posicion.js";

export default class Jugador{
    nombre;
    barcos=[];
    disparosEfectuados;
    direccion;
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
            console.log(b.posiciones);
            b.establecerPosiciones(posIni, posFin);
            this.barcos.push(b);
        }
        else if(posIni.y === posFin.y){
            const b = new Barco(Math.abs(posFin.x-posIni.x));
            console.log(b.posiciones);
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
        if(this.tablero.mapa[posicion.y][posicion.x] === "X"){
            return "A";
        }
        else if(this.tablero.mapa[posicion.y][posicion.x] === "B"){
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

    llenarTablero(){
        while(this.barcos.length < 8){
            let posIni = this.getPosIni();
            let posFin = this.getPosFin(posIni);
            if(posFin !== null) {
                this.ponerBarco(posIni, posFin);
            }
            else{
                continue;
            }
        }
    }

    getTamañoBarco(){
        switch(this.barcos.length){
            case 0:
                return 5;
            case 1:
                return 4;
            case 2:
            case 3:
                return 3;
            case 4:
            case 5:
            case 6:
                return 2;
            case 7:
                return 1;
        }
    }

    getPosIni(){
        let posIni = null;
        let posicionValida = false;
        while(!posicionValida){
            let posIniY = this.getRandomInt(0, this.tablero.mapa.length);
            let posIniX = this.getRandomInt(0, this.tablero.mapa[0].length);
            if(this.tablero.mapa[posIniY][posIniX] === "B"){
                continue;
            }
            else{
                posIni = new Posicion(posIniY, posIniX);
                posicionValida = true;
            }
        }
        return posIni;
    }

    getPosFin(posIni = new Posicion(0,0)){
        this.direccion = this.getRandomInt(0, 2);
        let posFin;

        for(let i=0; i<2; i++){
            posFin = (this.direccion === 0)? this.getPosFinY(posIni) : this.getPosFinX(posIni);
        }
        if(posFin !== null){
            for(let i=posIni.y-1; i<=posFin.y+1; i++){
                for(let j=posIni.x-1; j<=posFin.x+1; j++){
                    if(i>=posIni.y && i<=posFin.y && j>=posIni.x && j<=posFin.x)
                    continue;
                    else{
                        if(i>=0 && i<this.tablero.mapa.length && j>=0 && j<this.tablero.mapa[0].length){
                            if(this.tablero.mapa[i][j] === "B"){
                                return null;
                            }
                        }
                    }
                }
            }
        }
        return posFin;       
    }

    getPosFinY(posIni = new Posicion(0,0)){
        let posFin = null;
        if(this.direccion === 0){
            for(let i=0; i<this.getTamañoBarco(); i++){
                if(posIni.y+i >= 0 && posIni.y+i < this.tablero.mapa.length && this.tablero.mapa[posIni.y+i][posIni.x] !== "B"){
                    if(i === this.getTamañoBarco()-1){
                        posFin = new Posicion(posIni.y+i, posIni.x);
                    }
                }
                else{
                    this.direccion = 1;
                    break;
                }
            }
            
        } 
        return posFin;
    }

    getPosFinX(posIni = new Posicion(0,0)){
        let posFin = null;
        if(this.direccion === 1){
            for(let i=0; i<this.getTamañoBarco(); i++){
                if(posIni.x+i >= 0 && posIni.x+i < this.tablero.mapa[0].length && this.tablero.mapa[posIni.y][posIni.x+1] !== "B"){
                    if(i === this.getTamañoBarco()-1){
                        posFin = new Posicion(posIni.y, posIni.x+i);
                    }
                }
                else{
                    this.direccion = 0;
                    break;
                }
            }
        } 
        return posFin;
    }

    getRandomInt(min=0, max=0) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}