let b = document.querySelector("body");
b.addEventListener("keydown", pressAnykey);


/* Se ejecuta una sola vez cuando la página termina de cargar. Cuando se presiona cualquier tecla se pide el nombre del jugador, pagina que es construida
   desde la misma función. Una vez ingresado el nombre se redirecciona a la pagina menu. */

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

/* Una vez que se ingresa un nombre distinto de vacío y se presiona la tecla Enter, se redirecciona a la página menu. */

function goToMenu(e){
    let inputName = document.body.querySelector(".input__name");
    const audio = new Audio("assets/sounds/pop.mp3");
    audio.play();
    if (e.keyCode === 13 && inputName.querySelector("input").value != ""){
        savePlayer(inputName.querySelector("input").value);
        location.href = "pages/menu.html";
    }
}

/* Guarda el nombre del jugador. En caso de existir setea en LocalStorage el nombre del jugador que acaba de logearse. */

function savePlayer(inputValue){
    if (!searchPlayer(inputValue)){
        const score = {
            name: inputValue.toLocaleUpperCase(),
            victories: 0,
            defeats: 0,
        }
    
        localStorage.setItem(inputValue.toLocaleUpperCase(), JSON.stringify(score));
    }
    localStorage.setItem("actualPlayer", inputValue.toLocaleUpperCase());
}

/* Devuelve true en caso de existir el nombre del jugador en LocalStorage. False en caso contrario. */

function searchPlayer(inputValue){
    if (localStorage.getItem(inputValue) != null)
    return true;
    else 
    return false;
}