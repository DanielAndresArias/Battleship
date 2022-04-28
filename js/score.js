let b = document.querySelector(".background__body");

b.addEventListener("keyup", volverAInicio);
generarEstadísticas();

/* En caso de presionarse la tecla ESC se vuelve a la página menu. */

function volverAInicio(e){
    if(e.keyCode === 27){
        location.href="menu.html";
    }
}

/* Genera las estadísticas del actual jugador. */

function generarEstadísticas(){
    const score = JSON.parse(localStorage.getItem(localStorage.getItem("actualPlayer")));
    let table = document.querySelector(".score");
    for(s in score){
        let p = document.createElement("p");
        p.innerText = `${s.toLocaleUpperCase()}: ${score[s]}`;
        table.appendChild(p);
    }
}