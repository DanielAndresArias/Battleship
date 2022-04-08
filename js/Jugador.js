import Barco from "./Barco.js";
import Tablero from "./Tablero.js";
import Posicion from "./Posicion.js"

export default class Jugador{
    nombre;
    barcos;
    tablero;
    tableroEnemigo;

    constructor(nombre=""){
        this.nombre = nombre;
        this.crearBarcos();
        this.tablero = new Tablero();
        this.tableroEnemigo = new Tablero();
    }

    crearBarcos(){
        this.barcos = [new Barco("Destructor"), new Barco("Submarino"), new Barco("Crucero"), new Barco("Acorazado"), new Barco("Acorazado")];
    }

    ponerBarco (posIni = new Posicion (0,0), posFin = new Posicion (9,9)){
        if(posIni.x === posFin.x){
            if(posIni.y < posFin.y){
                for(let i=posIni.y; i<=posFin.y; i++){
                    this.tablero.marcarBarco(new Posicion (posIni.x, i));
                }
            }
            else{
                for(let i=posFin.y; i<=posIni.y; i++){
                    this.tablero.marcarBarco(new Posicion (posIni.x, i));
                }
            }
        }
        else if(posIni.y === posFin.y){
            if(posIni.x < posFin.x){
                for(let i=posIni.x; i<=posFin.x; i++){
                    this.tablero.marcarBarco(new Posicion (i, posIni.y));
                }
            }
            else{
                for(let i=posFin.x; i<=posIni.x; i++){
                    this.tablero.marcarBarco(new Posicion (i, posIni.y));
                }
            }
        }
    }
}