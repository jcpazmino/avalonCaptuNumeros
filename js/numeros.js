
// genera numeros.cantidad de numeros aleatorios
function generaNumeros(){
    for(i=0; i<numeros.cantidad; i++){
        elemento.numero = getRandomInt(numeros.numeroMin, numeros.numeroMax);
        elemento.posX = getRandomInt(xMin, xMax);
        elemento.posY = getRandomInt(yMin, yMax);
        numeros.arrNumeros[i] = elemento;
        elemento= {numero:0, posX:0, posY:0}
    }
}
function dispNumero(){
    for(i=0; i<numeros.arrNumeros.length; i++){
        ctx.font = "30px Georgia";
        ctx.fillText(numeros.arrNumeros[i].numero, numeros.arrNumeros[i].posX, numeros.arrNumeros[i].posY);
    }
}

//genera un aleatorio entre [min, max]
function getRandomInt(min, max) {
    return Math.ceil(Math.random() * (max - min)) + min;
}