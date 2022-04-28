let b = document.querySelector("body");
let inputName = document.querySelector(".menu");
let ol = document.createElement("ol");
ol.id = "menu";
inputName.appendChild(ol);
let pos = [0, 1, 2];
let options = ["Single Player", "Multiplayer", "Score"];

for (const option of options){
    let li = document.createElement("li");
    li.innerHTML = option;
    ol.appendChild(li);
}

ol.firstChild.className = "select";

b.addEventListener("keydown", cambiarEleccion);

function cambiarEleccion(e){
    const lis = document.body.getElementsByTagName("li");
    const audio = new Audio("../assets/sounds/pop.mp3");

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
                location.href = "singlePlayer.html";
                break;
            case 1:
                location.href = "multiplayer.html";
                break;
            case 2:
                location.href = "score.html";
                break;
        }
    }
}