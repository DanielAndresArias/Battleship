let b = document.querySelector("body");
b.addEventListener("keydown", pressAnykey);
let pos = [0, 1, 2, 3];

/* Se ejecuta una sola vez cuando la página termina de cargar. Cuando se presiona cualquier tecla se pasa a la pantalla menu, la cual es construida
   desde la misma función. Una vez desplegado el menu, cada vez que se presione las teclas arrows de up y down se llamará a la función
   cambiarEleccion.*/

function pressAnykey(e){
    e.target.removeEventListener (e.type, pressAnykey);
    let start = document.body.querySelector(".start");
    start.removeChild(start.querySelector(".start span"));
    let ol = document.createElement("ol");
    ol.id = "menu";
    start.appendChild(ol);

    let options = ["Single Player", "Multiplayer", "Score", "Name"];

    for (const option of options){
        let li = document.createElement("li");
        li.innerHTML = option;
        ol.appendChild(li);
    }

    start.className = "menu";
    ol.firstChild.className = "select";

    b.addEventListener("keydown", cambiarEleccion);
}

/* Se ejecuta cada vez que se presiona cualquier tecla pero solo se produce el desplazamiento si la tecla presionada es una tecla arrow (up o down).
   También se produce un sonido en cada desplazamiento.*/

function cambiarEleccion(e){
    const lis = document.body.getElementsByTagName("li");
    let audio = new Audio("assets/sounds/pop.mp3");

    if (e.keyCode === 40){
        lis[pos[0]].className = "";
        pos.push(pos.shift());
        lis[pos[0]].className = "select";
        audio.play();
    }
    if (e.keyCode === 38){
        lis[pos[0]].className = "";
        pos.unshift(pos.pop());
        lis[pos[0]].className = "select";
        audio.play();
    }
    document.querySelector("body").addEventListener("keydown", irAPagina);
}

function irAPagina(e) {
    if(e.keyCode === 13){
        console.log("Enter");
        switch(pos[0]){
            case 0:
                location.href = "pages/singlePlayer.html";
                break;
            case 1:
                location.href = "pages/multiplayer.html";
                break;
            case 2:
                location.href = "pages/score.html";
                break;
            case 3:
                location.href = "pages/options.html";
        }
    }
}