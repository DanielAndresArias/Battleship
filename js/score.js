let b = document.querySelector(".background__body");

b.addEventListener("keyup", volverAInicio);

function volverAInicio(e){
    if(e.keyCode === 27){
        location.href="../index.html";
    }
}