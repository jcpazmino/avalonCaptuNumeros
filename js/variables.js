
var c = document.getElementById("c_avalon");
var ctx = c.getContext("2d");
var canvasW = c.width;
var canvasH = c.height;
var fotogramasPorSegundo = 15;

var backgroundImage = new Image();
var avalon = {
    atras: new Image(),
    derecha: new Image(),
    frente: new Image(),
    izquierda: new Image(),
    posX: 150,  posY: 150,
    ancho: 28, alto: 80,
    parado: { atras: true, derecha: true, frente: true, izquierda: true },
    ind: { atras: 1, derecha: 1, frente: 1, izquierda: 1 },
    path_imgs: {
        atras : "./imgs/atras/",
        derecha : "./imgs/derecha/",
        frente : "./imgs/frente/",
        izquierda : "./imgs/izquierda/"
    }
}
var numeros = {
    arrNumeros:[], 
    cantidad:8,
    numeroMin:1, numeroMax:15
};
var elemento= {numero:0, posX:0, posY:0};
//***** determinan los límites del escenario para el objeto */
var factorX=10, factorY=10;
var xMin=factorX, xMax=canvasW-(factorX+avalon.ancho), yMin=factorY, yMax=canvasH-(factorY+avalon.alto);

var direcionAnterior="";