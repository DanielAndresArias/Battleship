import Jugador from './Jugador.js';
import Thread from './Thread.js';
import Posicion from './Posicion.js';

let b = document.querySelector(".background__body");
let posicion;
let inputs = [document.querySelector("#PosY"), document.querySelector("#PosX")];
let casillerosEnemigos = document.querySelectorAll (".map__Enemy div div");
let casillerosPropios = document.querySelectorAll (".map div div");

/* Crea un jugador con un mapa aleatorio. Pinta el mapa con los barcos */

const jugador1 = new Jugador(localStorage.getItem("actualPlayer"));
jugador1.llenarTablero();
pintarMapaPropio();

/* Crea un enemigo con un mapa aleatorio. */

const thread = new Thread("");
asignarNombre();
thread.llenarTablero();

/* Si se presiona ESC se termina la partida y se vuelve al menú */

b.addEventListener("keydown", volverAInicio);

/* Ingresa sucesivamente los disparos del jugador */

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
        jugar(e);
    }
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

/* Se encarga de llevar a cabo el turno de cada jugador. Llama a dos funciones: turno() y turnoEnemigo () */

function jugar(e){
    turno(e);
    turnoEnemigo(e);
}

/* Realiza el procedimiento para el turno del jugador. En caso de haber hundido todos los mapas retorna al menú. */

function turno(){
    let pos = posicion;
    let tipo = thread.recibirDisparo(pos);
    jugador1.marcarTableroEnemigo(pos ,tipo);
    pintarCasilleroEnemigo(pos, tipo);

    if(thread.barcos.length === 0){
        e.target.removeEventListener(e.type, obtenerPosJugador);
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
        setTimeout(() => {location.href="./menu.html"}, 3001);
    }
}

/* Realiza el procedimiento para el turno del enemigo. En caso de haber hundido todos los mapas retorna al menú. */

function turnoEnemigo(){
    setTimeout(() => {
        let pos = thread.disparar();
        let tipo = jugador1.recibirDisparo(pos);
        thread.recibirRespuestaEnemigo(tipo);
        thread.marcarTableroEnemigo(pos, tipo);
        pintarCasilleroPropio(pos, tipo);

        if(jugador1.barcos.length === 0){
            e.target.removeEventListener(e.type, obtenerPosJugador);
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
            setTimeout(() => {location.href="./menu.html"}, 3001);
        }
    }, 1500);
}

/* Pinta el/los casillero/s del enemigo correspondiente/s al disparo. Amarillo para dañado, celeste para agua y rojo para hundido. 
Produce los correspondientes sonidos para cada caso. */

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
            casilleroMarcado.className = "dañado disparo--animacion";
            explosion.play();
            break;
        case 'H':
            const posiciones = thread.barcoHundido.posiciones;
            explosion.play();
            for(let i=0; i<posiciones.length; i++){
                const posY = posiciones[i].y;
                const posX = posiciones[i].x;
                casilleroMarcado = casillerosEnemigos[posY*10+posX];
                casilleroMarcado.firstChild.className = "destruido disparo--animacion";
            }
            break;
    }
}

/* Pinta el/los casillero/s del jugador correspondiente/s al disparo. Amarillo para dañado, celeste para agua y rojo para hundido. 
Produce los correspondientes sonidos para cada caso. */

function pintarCasilleroPropio(p = new Posicion(0, 0), tipo=""){
    let casilleroMarcado = document.createElement("div");
    const splashAgua = new Audio ("../assets/sounds/splash-water.mp3");
    const explosion = new Audio ("../assets/sounds/explosion.mp3");
    casillerosPropios[p.y*10+p.x].appendChild(casilleroMarcado);


    switch(tipo){
        case 'A':
            casilleroMarcado.className = "agua disparo--animacion";
            splashAgua.play();
            break;
        case 'D':
            casilleroMarcado.className = "dañado disparo--animacion";
            explosion.play();
            break;
        case 'H':
            const posiciones = jugador1.barcoHundido.posiciones;
            explosion.play();
            for(let i=0; i<posiciones.length; i++){
                const posY = posiciones[i].y;
                const posX = posiciones[i].x;
                casilleroMarcado = casillerosPropios[posY*10+posX];
                casilleroMarcado.firstChild.className = "destruido disparo--animacion";
            }
    }
}

/* Pinta el mapa del jugador con todos los barcos correspondientes. */

function pintarMapaPropio(){

    for(let i=0; i<jugador1.tablero.mapa.length; i++){
        for(let j=0; j<jugador1.tablero.mapa[i].length; j++){
    
            if(jugador1.tablero.mapa[i][j] === 'B'){
                casillerosPropios[i*10+j].className = "barco";
            }
        }
    }
}

/* Asigna de manera aleatoria un nombre al enemigo llamando a una API. Si falla se le asigna por defecto Thread como nombre. */

function asignarNombre(){
    fetch('https://randomuser.me/api/')
    .then((resp) => resp.json())
    .then(nombre => {
        console.log(nombre.results[0].name.first);
        thread.nombre = nombre.results[0].name.first;
        const h2 = document.querySelector(".map__Enemy h2");
        h2.innerHTML = `${nombre.results[0].name.first}\´s map`
    })
    .catch(() => {
        thread.nombre = "Thread";
    });
}