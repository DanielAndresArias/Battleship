let b = document.querySelector("body");
b.addEventListener("keydown", pressAnykey);
let pos = [0, 1, 2];

/* Se ejecuta una sola vez cuando la página termina de cargar. Cuando se presiona cualquier tecla se pasa a la pantalla menu, la cual es construida
   desde la misma función. Una vez desplegado el menu, cada vez que se presione las teclas arrows de up y down se llamará a la función
   cambiarEleccion.*/

function pressAnykey(e){
    e.target.removeEventListener (e.type, pressAnykey);
    let start = document.body.querySelector(".start");
    start.removeChild(start.querySelector(".start span"));
    start.className = "input__name";
    const labelName = document.createElement("label");
    labelName.setAttribute("for", "name");
    labelName.innerText = "Name";
    const inputName = document.createElement("input");
    inputName.setAttribute("type", "text");
    inputName.setAttribute("id", "name");
    start.appendChild(labelName);
    start.appendChild(inputName);
    inputName.focus();
    b.addEventListener("keydown", goToMenu);
}

function goToMenu(e){
    e.target.removeEventListener (e.type, goToMenu);
    let inputName = document.body.querySelector(".input__name");
    if (e.keyCode === 13 && inputName.querySelector("input").value != ""){
        savePlayer(inputName.querySelector("input").value);
        inputName.removeChild(inputName.querySelector("label"));
        inputName.removeChild(inputName.querySelector("input"));
        inputName.className = "menu";
        let ol = document.createElement("ol");
        ol.id = "menu";
        inputName.appendChild(ol);

        let options = ["Single Player", "Multiplayer", "Score"];

        for (const option of options){
            let li = document.createElement("li");
            li.innerHTML = option;
            ol.appendChild(li);
        }

        ol.firstChild.className = "select";

        b.addEventListener("keydown", cambiarEleccion);
    }
}

/* Se ejecuta cada vez que se presiona cualquier tecla pero solo se produce el desplazamiento si la tecla presionada es una tecla arrow (up o down).
   También se produce un sonido en cada desplazamiento.*/

function cambiarEleccion(e){
    const lis = document.body.getElementsByTagName("li");
    const audio = new Audio("assets/sounds/pop.mp3");

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
        }
    }
}

function savePlayer(inputValue){
    if (!searchPlayer(inputValue)){
        const score = {
            name: inputValue.toLocaleUpperCase(),
            victories: 0,
            defeats: 0,
        }
    
        localStorage.setItem(inputValue.toLocaleUpperCase(), JSON.stringify(score));
    }

}

function searchPlayer(inputValue){
    if (localStorage.getItem(inputValue) != null)
    return true;
    else 
    return false;
}