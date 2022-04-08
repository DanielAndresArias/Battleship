export default class Barco{
    tipo = "";
    tamaño = 0;
    estado = "";

    constructor(tipo){
        this.establecerTipo(tipo);
        this.establecerTamaño();
        this.establecerEstado();
    }

    establecerTipo = (tipo) => this.tipo = tipo;
    establecerTamaño (){
        const tipoDeBarcos = ["Destructor", "Submarino", "Crucero", "Acorazado"];
        this.tamaño = tipoDeBarcos.indexOf(this.tipo) + 1;
    }
    establecerEstado = () => this.estado = "Sano";
    cambiarEstado = (estado="") => this.estado = estado;
}