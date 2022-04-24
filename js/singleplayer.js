import Jugador from './Jugador.js';
import Tablero from './Tablero.js';
import Barco from './Barco.js';
import Posicion from './Posicion.js';

let b = document.querySelector(".background__body");
let posicion;
let inputs = [document.querySelector("#PosY"), document.querySelector("#PosX")];
let mapas = [];
const jugador1 = new Jugador ("Daniel");
const jugador2 = mapas[getRandomInt(0, 5)];
alert ("Hay cuatro barcos:\n1) Un acorazado de un casillero de largo\n2) Un crucero de dos casilleros de largo\n3) Un submarino de tres casilleros de largo\n4) Un destructor de cuatro casilleros de largo");
crearMapas();

b.addEventListener("keydown", volverAInicio);
b.addEventListener("keydown", obtenerPosJugador);

function volverAInicio(e){
    if(e.keyCode === 27){
        location.href="../index.html";
    }
}

function obtenerPosJugador(e){
    console.log(e.keyCode);
    if(e.keyCode === 13 && inputsValidos()){
        posicion = new Posicion(Number(inputs[0].value), Number(inputs[1].value));
        inputs[0].value = "";
        inputs[1].value = "";
        turno();
    }
    console.log(posicion);
}

function inputsValidos(){
    if (!isNaN(inputs[0].value) && !isNaN(inputs[1].value) && inputs[0].value != "" && inputs[1].value != ""){
        if(inputs[0].value >= 0 && inputs[1].value >= 0 && inputs[0].value < 10 && inputs[1].value < 10)
        return true;
        else{
        alert("¡Numero de posición inválido! Por favor ingrese posiciones de 0 a 9 inclusive");
        inputs[0].value = "";
        inputs[1].value = "";
        return false;
        }
    }
    else
    return false;
}

// Hasta que no se hunde el último barco del enemigo el while no termina.

function turno(){
    const pos = posicion;
    const tipo = jugador2.recibirDisparo(pos);
    jugador1.marcarTableroEnemigo(pos ,tipo);
    pintarCasilleroEnemigo(pos, tipo);

    if(jugador2.barcos.length === 0){
        alert("Juego terminado");
        location.href="../index.html";
    }
}

function pintarCasilleroEnemigo(p = new Posicion(0, 0), tipo=""){
    let casilleros = document.querySelectorAll (".map__Enemy div div");
    console.log(casilleros);

    switch(tipo){
        case 'A':
            casilleros[p.y*10+p.x].className = "agua";
            break;
        case 'D':
        case 'H':
            casilleros[p.y*10+p.x].className = "dañado";
            break;
    }
}

function crearMapas(){
    const jugador1 = new Jugador ("Thread");
    mapas.push(jugador1);
    jugador1.ponerBarco(new Posicion(1,1), new Posicion(1,1));
    jugador1.ponerBarco(new Posicion(3,4), new Posicion(4,4));
    jugador1.ponerBarco(new Posicion(6,2), new Posicion(6,5));
    jugador1.ponerBarco(new Posicion(7,8), new Posicion(9,8));

    const jugador2 = new Jugador ("Thread");
    mapas.push(jugador2);
    jugador2.ponerBarco(new Posicion(1,4), new Posicion(1,4));
    jugador2.ponerBarco(new Posicion(4,5), new Posicion(4,6));
    jugador2.ponerBarco(new Posicion(5,2), new Posicion(8,2));
    jugador2.ponerBarco(new Posicion(6,4), new Posicion(6,6));
    
    const jugador3 = new Jugador ("Thread");
    mapas.push(jugador3);
    jugador3.ponerBarco(new Posicion(0,9), new Posicion(1,9));
    jugador3.ponerBarco(new Posicion(1,1), new Posicion(4,1));
    jugador3.ponerBarco(new Posicion(4,4), new Posicion(4,4));
    jugador3.ponerBarco(new Posicion(7,3), new Posicion(7,5));

    const jugador4 = new Jugador ("Thread");
    mapas.push(jugador4);
    jugador4.ponerBarco(new Posicion(1,1), new Posicion(1,3));
    jugador4.ponerBarco(new Posicion(5,6), new Posicion(8,6));
    jugador4.ponerBarco(new Posicion(6,1), new Posicion(6,2));
    jugador4.ponerBarco(new Posicion(9,9), new Posicion(9,9));

    const jugador5 = new Jugador ("Thread");
    mapas.push(jugador5);
    jugador5.ponerBarco(new Posicion(2,4), new Posicion(5,4));
    jugador5.ponerBarco(new Posicion(2,6), new Posicion(2,8));
    jugador5.ponerBarco(new Posicion(6,6), new Posicion(7,6));
    jugador5.ponerBarco(new Posicion(7,2), new Posicion(7,2));
}

function getRandomInt(min=0, max=0) {
    return Math.floor(Math.random() * (max - min)) + min;
}