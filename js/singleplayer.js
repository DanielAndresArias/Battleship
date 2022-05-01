import Jugador from './Jugador.js';
import Tablero from './Tablero.js';
import Barco from './Barco.js';
import Posicion from './Posicion.js';

let b = document.querySelector(".background__body");
let posicion;
let inputs = [document.querySelector("#PosY"), document.querySelector("#PosX")];
let casilleros = document.querySelectorAll (".map__Enemy div div");
let mapas = [];
const jugador1 = new Jugador (localStorage.getItem("actualPlayer"));
crearMapas();

/* Crea un jugador con un mapa aleatorio. */

const jugador2 = mapas[getRandomInt(0, 5)];

//alert ("Hay cuatro barcos:\n1) Un acorazado de un casillero de largo\n2) Un crucero de dos casilleros de largo\n3) Un submarino de tres casilleros de largo\n4) Un destructor de cuatro casilleros de largo");
Swal.fire({
    title: 'Barcos',
    text: "\n1) Un acorazado de un casillero de largo\n2) Un crucero de dos casilleros de largo\n3) Un submarino de tres casilleros de largo\n4) Un destructor de cuatro casilleros de largo",
    confirmButtonText: 'Ok',
    background: "#000",
    color: "#fff",
});



b.addEventListener("keydown", volverAInicio);
b.addEventListener("keydown", obtenerPosJugador);

/* En caso de presionarse la tecla ESC se vuelve a la página menu. */

function volverAInicio(e){
    if(e.keyCode === 27){
        location.href="menu.html";
    }
}

/* Comprueba que la posición ingresada sea válida y que la tecla pulsada sea el Enter. Llama a la función turno() en caso de ser correcto el ingreso. */

function obtenerPosJugador(e){
    if(e.keyCode === 13 && inputsValidos()){
        posicion = new Posicion(Number(inputs[0].value), Number(inputs[1].value));
        inputs[0].value = "";
        inputs[1].value = "";
        inputs[0].focus();
        turno();
    }
    console.log(posicion);
}

/* Comprueba que se haya ingresado un número que no esté vacío y esté contenido en el rango [0-9]. */

function inputsValidos(){
    if (!isNaN(inputs[0].value) && !isNaN(inputs[1].value) && inputs[0].value != "" && inputs[1].value != ""){
        if(inputs[0].value >= 0 && inputs[1].value >= 0 && inputs[0].value < 10 && inputs[1].value < 10)
        return true;
        else{
        Toastify({
            text: `¡Numero de posición inválido! Por favor ingrese posiciones de 0 a 9 inclusive`,
            duration: 2000,
            style:{
                position: 'absolute',
                margin: '10vh',
                border: 'solid 4px white',
                width: '400px',
                padding: '20px 40px',
                background: '#000',
                color: 'white',
                textaling: 'center',
            }
        }).showToast();
        inputs[0].value = "";
        inputs[1].value = "";
        return false;
        }
    }
    else
    return false;
}

/* Recibe el disparo del jugador al mapa del oponente. Llama a la función pintarCasillero() para pintar el casillero correspondiente.
   En caso de terminarse el juego, guarda las estadísticas del jugador en LocalStorage y redirecciona al menu. */

function turno(){
    const pos = posicion;
    const tipo = jugador2.recibirDisparo(pos);
    jugador1.marcarTableroEnemigo(pos ,tipo);
    pintarCasillero(pos, tipo);

    if(jugador2.barcos.length === 0){
        const actualPlayer = localStorage.getItem("actualPlayer");
        const score = JSON.parse(localStorage.getItem(actualPlayer));
        score["victories"] =Number(score["victories"]) + 1;
        localStorage.setItem(actualPlayer, JSON.stringify(score));
        Toastify({
            text: `Victory!`,
            duration: 2000,
            style:{
                position: 'absolute',
                margin: '10vh',
                border: 'solid 4px white',
                padding: '50px 100px',
                background: '#000',
                color: 'white',
                textaling: 'center'
            }
        }).showToast();
        setTimeout(() => {location.href="../menu.html"}, 2001);
    }
}

/* Pinta el casillero correspondiente al disparo. Amarillo para dañado y celeste para agua. Produce los correspondientes sonidos 
para cada caso. */

function pintarCasillero(p = new Posicion(0, 0), tipo=""){
    let casilleroMarcado = document.createElement("div");
    console.log(casilleros);
    const splashAgua = new Audio ("../assets/sounds/splash-water.mp3");
    const explosion = new Audio ("../assets/sounds/explosion.mp3");

    casilleros[p.y*10+p.x].appendChild(casilleroMarcado);


    switch(tipo){
        case 'A':
            casilleroMarcado.className = "agua";
            splashAgua.play();
            break;
        case 'D':
        case 'H':
            casilleroMarcado.className = "dañado";
            explosion.play();
            break;
    }
}

/* Crea cinco jugadores con sus respectivos mapas. */

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

/* Devuelve un número entero comprendido entre un min y un max. */

function getRandomInt(min=0, max=0) {
    return Math.floor(Math.random() * (max - min)) + min;
}