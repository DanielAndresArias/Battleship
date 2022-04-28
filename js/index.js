let b = document.querySelector("body");
b.addEventListener("keydown", pressAnykey);


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
    let inputName = document.body.querySelector(".input__name");
    if (e.keyCode === 13 && inputName.querySelector("input").value != ""){
        savePlayer(inputName.querySelector("input").value);
        location.href = "pages/menu.html";
    }
}

/* Se ejecuta cada vez que se presiona cualquier tecla pero solo se produce el desplazamiento si la tecla presionada es una tecla arrow (up o down).
   También se produce un sonido en cada desplazamiento.*/



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

function searchPlayer(inputValue){
    if (localStorage.getItem(inputValue) != null)
    return true;
    else 
    return false;
}