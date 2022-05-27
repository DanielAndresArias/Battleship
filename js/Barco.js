import Posicion from "./Posicion.js"

export default class Barco{
    tipo = "";
    tamaño = 0;
    disparosRecibidos = 0;
    estado = "";
    posiciones = [];

    constructor(tamaño=0){
        this.tamaño = tamaño + 1;
        this.establecerTipo(tamaño);
        this.estado = "Sano";
    }

    /* En base al tamaño establece el tipo de barco. */

    establecerTipo (){
        switch (this.tamaño) {
            case 1:
                this.tipo = "Acorazado";
                break;
            case 2:
                this.tipo = "Crucero";
                break;
            case 3:
                this.tipo = "Submarino";
                break;
            case 4:
                this.tipo = "Destructor";
                break;
            case 5:
                this.tipo = "Portaaviones";
                break;
        }
    }

    /* Recibe por parámetros la posicion inicial y final que ocupa un barco.
    Guarda en el arreglo posiciones cada uno de los casilleros que ocupa el barco. */

    establecerPosiciones (posIni = new Posicion (0,0), posFin = new Posicion (9,9)){
        if(posIni.x === posFin.x){
            if(posIni.y < posFin.y){
                for(let i=posIni.y; i<=posFin.y; i++){
                    this.posiciones.push(new Posicion (i, posIni.x));
                }
            }
            else{
                for(let i=posFin.y; i<=posIni.y; i++){
                    this.posiciones.push(new Posicion (i, posIni.x));
                }
            }
        }
        else if(posIni.y === posFin.y){
            if(posIni.x < posFin.x){
                for(let i=posIni.x; i<=posFin.x; i++){
                    this.posiciones.push(new Posicion (posIni.y, i));
                }
            }
            else{
                for(let i=posFin.x; i<=posIni.x; i++){
                    this.posiciones.push(new Posicion (posIni.y, i));
                }
            }
        }
    }

    /* Incrementa el numero de disparos recibidos. */

    incrementarDisparos (){
        this.disparosRecibidos++;
        if (this.tamaño != this.disparosRecibidos){
            this.cambiarEstado("Dañado");
        }
        else{
            this.cambiarEstado("Hundido");
        }
    }

    /* Cambia el estado del barco. */

    cambiarEstado = (estado="") => this.estado = estado;

    /* Busca si hay coincidencia en la posicion recibida por parámetros con las
    posiciones almacenadas en el arreglo posiciones.
    Si coincide devuelve true, caso contrario devuelve false. */

    seEncuentra(posicion = new Posicion (0,0)){
        for (const p of this.posiciones){
            if(p.x === posicion.x && p.y === posicion.y){
                return true;
            }
        }
        return false;
    }
}