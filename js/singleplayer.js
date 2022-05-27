import Jugador from './Jugador.js';
import Thread from './Thread.js';
import Tablero from './Tablero.js';
import Barco from './Barco.js';
import Posicion from './Posicion.js';

let b = document.querySelector(".background__body");
let posicion;
let inputs = [document.querySelector("#PosY"), document.querySelector("#PosX")];
let casillerosEnemigos = document.querySelectorAll (".map__Enemy div div");
let casillerosPropios = document.querySelectorAll (".map div div");
let mapasJugador = [];
let mapasThread = [];
//crearMapasJugador();
crearMapasThread();

/* Crea un jugador con un mapa aleatorio. */

const jugador1 = new Jugador(localStorage.getItem("actualPlayer"));
jugador1.llenarTablero();
const thread = mapasThread[getRandomInt(0, 5)];
asignarNombre();


/* Swal.fire({
    title: 'Barcos',
    text: "\n1) Un acorazado de un casillero de largo\n2) Un crucero de dos casilleros de largo\n3) Un submarino de tres casilleros de largo\n4) Un destructor de cuatro casilleros de largo",
    confirmButtonText: 'Ok',
    background: "#000",
    color: "#fff",
}); */

pintarMapaPropio();

b.addEventListener("keydown", volverAInicio);
//b.addEventListener("keydown", obtenerPosJugador);
b.addEventListener("keydown", turnoPruebaThread);

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
    //console.log(posicion);
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
    let pos = posicion;
    let tipo = thread.recibirDisparo(pos);
    jugador1.marcarTableroEnemigo(pos ,tipo);
    pintarCasilleroEnemigo(pos, tipo);

    if(thread.barcos.length === 0){
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
        setTimeout(() => {location.href="./menu.html"}, 2001);
    }

    pos = thread.disparar();
    tipo = jugador1.recibirDisparo(pos);
    thread.recibirRespuestaEnemigo(tipo);
    thread.marcarTableroEnemigo(pos, tipo);
    pintarCasilleroPropio(pos, tipo);

    if(jugador1.barcos.length === 0){
        const actualPlayer = localStorage.getItem("actualPlayer");
        const score = JSON.parse(localStorage.getItem(actualPlayer));
        score["defeats"] =Number(score["defeats"]) + 1;
        localStorage.setItem(actualPlayer, JSON.stringify(score));
        Toastify({
            text: `Defeat!`,
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
        setTimeout(() => {location.href="./menu.html"}, 2001);
    }
}

/* Pinta el casillero correspondiente al disparo. Amarillo para dañado y celeste para agua. Produce los correspondientes sonidos 
para cada caso. */

function pintarCasilleroEnemigo(p = new Posicion(0, 0), tipo=""){
    let casilleroMarcado = document.createElement("div");
    const splashAgua = new Audio ("../assets/sounds/splash-water.mp3");
    const explosion = new Audio ("../assets/sounds/explosion.mp3");

    casillerosEnemigos[p.y*10+p.x].appendChild(casilleroMarcado);


    switch(tipo){
        case 'A':
            casilleroMarcado.className = "agua disparo--animacion";
            splashAgua.play();
            break;
        case 'D':
        case 'H':
            casilleroMarcado.className = "agua disparo--animacion";
            explosion.play();
            break;
    }
}

function pintarCasilleroPropio(p = new Posicion(0, 0), tipo=""){
    const casilleroMarcado = document.createElement("div");
    const splashAgua = new Audio ("../assets/sounds/splash-water.mp3");
    const explosion = new Audio ("../assets/sounds/explosion.mp3");
    console.log(casillerosPropios[p.y*10+p.x]);
    casillerosPropios[p.y*10+p.x].appendChild(casilleroMarcado);


    switch(tipo){
        case 'A':
            casilleroMarcado.className = "agua disparo--animacion";
            splashAgua.play();
            break;
        case 'D':
        case 'H':
            casilleroMarcado.className = "dañado disparo--animacion";
            explosion.play();
            break;
    }
}

function pintarMapaPropio(){

    for(let i=0; i<jugador1.tablero.mapa.length; i++){
        for(let j=0; j<jugador1.tablero.mapa[i].length; j++){
    
            if(jugador1.tablero.mapa[i][j] === 'B'){
                casillerosPropios[i*10+j].className = "barco";
            }
        }
    }
}

/* Crea cinco jugadores con sus respectivos mapas. */

function crearMapasJugador(){
    const jugador1 = new Jugador (localStorage.getItem("actualPlayer"));
    mapasJugador.push(jugador1);
    jugador1.ponerBarco(new Posicion(1,1), new Posicion(1,1));
    jugador1.ponerBarco(new Posicion(3,4), new Posicion(4,4));
    jugador1.ponerBarco(new Posicion(6,2), new Posicion(6,5));
    jugador1.ponerBarco(new Posicion(7,8), new Posicion(9,8));

    const jugador2 = new Jugador (localStorage.getItem("actualPlayer"));
    mapasJugador.push(jugador2);
    jugador2.ponerBarco(new Posicion(1,4), new Posicion(1,4));
    jugador2.ponerBarco(new Posicion(4,5), new Posicion(4,6));
    jugador2.ponerBarco(new Posicion(5,2), new Posicion(8,2));
    jugador2.ponerBarco(new Posicion(6,4), new Posicion(6,6));
    
    const jugador3 = new Jugador (localStorage.getItem("actualPlayer"));
    mapasJugador.push(jugador3);
    jugador3.ponerBarco(new Posicion(0,9), new Posicion(1,9));
    jugador3.ponerBarco(new Posicion(1,1), new Posicion(4,1));
    jugador3.ponerBarco(new Posicion(4,4), new Posicion(4,4));
    jugador3.ponerBarco(new Posicion(7,3), new Posicion(7,5));

    const jugador4 = new Jugador (localStorage.getItem("actualPlayer"));
    mapasJugador.push(jugador4);
    jugador4.ponerBarco(new Posicion(1,1), new Posicion(1,3));
    jugador4.ponerBarco(new Posicion(5,6), new Posicion(8,6));
    jugador4.ponerBarco(new Posicion(6,1), new Posicion(6,2));
    jugador4.ponerBarco(new Posicion(9,9), new Posicion(9,9));

    const jugador5 = new Jugador (localStorage.getItem("actualPlayer"));
    mapasJugador.push(jugador5);
    jugador5.ponerBarco(new Posicion(2,4), new Posicion(5,4));
    jugador5.ponerBarco(new Posicion(2,6), new Posicion(2,8));
    jugador5.ponerBarco(new Posicion(6,6), new Posicion(7,6));
    jugador5.ponerBarco(new Posicion(7,2), new Posicion(7,2));
}

function crearMapasThread(){
    const jugador1 = new Thread ("");
    mapasThread.push(jugador1);
    jugador1.ponerBarco(new Posicion(1,1), new Posicion(1,1));
    jugador1.ponerBarco(new Posicion(3,4), new Posicion(4,4));
    jugador1.ponerBarco(new Posicion(6,2), new Posicion(6,5));
    jugador1.ponerBarco(new Posicion(7,8), new Posicion(9,8));

    const jugador2 = new Thread ("");
    mapasThread.push(jugador2);
    jugador2.ponerBarco(new Posicion(1,4), new Posicion(1,4));
    jugador2.ponerBarco(new Posicion(4,5), new Posicion(4,6));
    jugador2.ponerBarco(new Posicion(5,2), new Posicion(8,2));
    jugador2.ponerBarco(new Posicion(6,4), new Posicion(6,6));
    
    const jugador3 = new Thread ("");
    mapasThread.push(jugador3);
    jugador3.ponerBarco(new Posicion(0,9), new Posicion(1,9));
    jugador3.ponerBarco(new Posicion(1,1), new Posicion(4,1));
    jugador3.ponerBarco(new Posicion(4,4), new Posicion(4,4));
    jugador3.ponerBarco(new Posicion(7,3), new Posicion(7,5));

    const jugador4 = new Thread ("");
    mapasThread.push(jugador4);
    jugador4.ponerBarco(new Posicion(1,1), new Posicion(1,3));
    jugador4.ponerBarco(new Posicion(5,6), new Posicion(8,6));
    jugador4.ponerBarco(new Posicion(6,1), new Posicion(6,2));
    jugador4.ponerBarco(new Posicion(9,9), new Posicion(9,9));

    const jugador5 = new Thread ("");
    mapasThread.push(jugador5);
    jugador5.ponerBarco(new Posicion(2,4), new Posicion(5,4));
    jugador5.ponerBarco(new Posicion(2,6), new Posicion(2,8));
    jugador5.ponerBarco(new Posicion(6,6), new Posicion(7,6));
    jugador5.ponerBarco(new Posicion(7,2), new Posicion(7,2));
}

/* Devuelve un número entero comprendido entre un min y un max. */

function getRandomInt(min=0, max=0) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function asignarNombre(){
    fetch('https://randomuser.me/api/')
    .then((resp) => resp.json())
    .then(nombre => {
        console.log(nombre.results[0].name.first);
        thread.nombre = nombre.results[0].name.first;
        const h2 = document.querySelector(".map__Enemy h2");
        h2.innerHTML = `${nombre.results[0].name.first}\´s map`
    });
}

function turnoPruebaThread(){
    let pos = thread.disparar();
    let tipo = jugador1.recibirDisparo(pos);
    console.log(thread.posicionInicial);
    console.log(thread.posicionAnterior);
        thread.recibirRespuestaEnemigo(tipo);
        thread.marcarTableroEnemigo(pos, tipo);
        pintarCasilleroPropio(pos, tipo);

        if(jugador1.barcos.length === 0){
            const actualPlayer = localStorage.getItem("actualPlayer");
            const score = JSON.parse(localStorage.getItem(actualPlayer));
            /* score["defeats"] =Number(score["defeats"]) + 1;
            localStorage.setItem(actualPlayer, JSON.stringify(score));
            Toastify({
                text: `Defeat!`,
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
            setTimeout(() => {location.href="./menu.html"}, 2001); */
        }
}