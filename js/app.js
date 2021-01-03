(function () {//* garantiza que las aimaciones funcionen en los diferentes navegadores */
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

function cargarImagenes (){
    avalon.atras.src = avalon.path_imgs.atras + "atras1.png";
    avalon.derecha.src = avalon.path_imgs.derecha + "derecha1.png";
    avalon.frente.src = avalon.path_imgs.frente + "frente1.png";
    avalon.izquierda.src = avalon.path_imgs.izquierda + "izquierda1.png";
    backgroundImage.src = "./imgs/fondo.jpg";
}
cargarImagenes ();
backgroundImage.addEventListener('load', iniciar, false);

//****** falta realizar una precarga de imágenes para que funcione adecuadamente al principio */
function iniciar() {
    ctx.drawImage(backgroundImage, 0, 0);   
    ctx.drawImage(avalon.frente, avalon.posX, avalon.posY);
    generaNumeros();
    animacion();
}
function animacion(){
    time_avalon=setTimeout(function() {  
        if((avalon.posX>=xMin && avalon.posX<=xMax) && (avalon.posY>=yMin && avalon.posY<=yMax)){
            if(!avalon.parado.frente) mueveFrente();
            if(!avalon.parado.atras) mueveAtras();  
            if(!avalon.parado.derecha) mueveDerecha();    
            if(!avalon.parado.izquierda) mueveIzquierda();      
            dispNumero();    
            controlColicion_numeros();   
        }else{           
            controlLimites_escenario();
        }
        id_Animation = window.requestAnimationFrame(animacion); 
    }, 1000 / fotogramasPorSegundo);

    //***** se ejecuta cuando el objeto llego a uno de los extermos del escenario */
    this.controlLimites_escenario = function(){
        avalon.parado.frente=true;avalon.parado.atras=true;avalon.parado.derecha=true;avalon.parado.izquierda=true;
        control_AudioCaminando(false);
        //verifica si el objeto esta parado en un extremo y lo devuelve
        if(avalon.posX<=xMin) avalon.posX = xMin+factorX;
        if(avalon.posX>=xMax) avalon.posX = xMax-factorX; 
        if(avalon.posY<=yMin) avalon.posY = yMin+factorY;
        if(avalon.posY>=yMax) avalon.posY = yMax-factorY;      
    }
    this.controlColicion_numeros = function(){
        o_ancho= avalon.ancho; o_alto= avalon.alto;
        area_ancho=avalon.posX+o_ancho;area_alto=avalon.posY+o_alto;
        for(i=0; i<numeros.arrNumeros.length; i++){         
            x_numero=numeros.arrNumeros[i].posX; y_numero=numeros.arrNumeros[i].posY; numero= numeros.arrNumeros[i].numero;        
            if((x_numero>=avalon.posX && x_numero<=area_ancho) && (y_numero>=avalon.posY && y_numero<=area_alto)){
                if(numero % 2 == 0) fncAudio_ganaste();
                else fncAudio_perdiste();
                removed = numeros.arrNumeros.splice(i, 1);
            }
        }
    }
    this.mueveFrente = function () {
        if (avalon.ind.frente >= 7) avalon.ind.frente = 1;  else avalon.ind.frente++;
        avalon.posY+=2;
        avalon.frente.src = avalon.path_imgs.frente + "frente" + avalon.ind.frente + ".png";
        ctx.drawImage(backgroundImage, 0, 0);
        ctx.drawImage(avalon.frente, avalon.posX, avalon.posY);    
    }
    this.mueveAtras = function () {
        if (avalon.ind.atras >= 7) avalon.ind.atras = 1;  else avalon.ind.atras++;
        avalon.posY-=2;
        avalon.atras.src = avalon.path_imgs.atras + "atras" + avalon.ind.atras + ".png";
        ctx.drawImage(backgroundImage, 0, 0);
        ctx.drawImage(avalon.atras, avalon.posX, avalon.posY);
    }
    this.mueveDerecha = function () {
        if (avalon.ind.derecha >= 7) avalon.ind.derecha = 1;  else avalon.ind.derecha++;
        avalon.posX+=2;
        avalon.derecha.src = avalon.path_imgs.derecha + "derecha" + avalon.ind.derecha + ".png";
        ctx.drawImage(backgroundImage, 0, 0);
        ctx.drawImage(avalon.derecha, avalon.posX, avalon.posY);
    }
    this.mueveIzquierda = function () {
        if (avalon.ind.izquierda >= 7) avalon.ind.izquierda = 1;  else avalon.ind.izquierda++;
        avalon.posX-=2;
        avalon.izquierda.src = avalon.path_imgs.izquierda + "izquierda" + avalon.ind.izquierda + ".png";
        ctx.drawImage(backgroundImage, 0, 0);
        ctx.drawImage(avalon.izquierda, avalon.posX, avalon.posY);   
    }
}

function control_direccion(direccion){
    avalon.parado.frente=true;avalon.parado.atras=true;avalon.parado.derecha=true;avalon.parado.izquierda=true;
    if(direcionAnterior!=direccion){
        switch (direccion) {
            case "ArrowRight": avalon.parado.derecha = false; break;
            case "ArrowLeft": avalon.parado.izquierda = false; break;
            case "ArrowUp": avalon.parado.atras = false; break;  
            case "ArrowDown": avalon.parado.frente = false;  break;             
        } 
        control_AudioCaminando(true);
        direcionAnterior=direccion;       
    }else{
        direcionAnterior="";
        control_AudioCaminando(false);    
    }
}
document.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return; // Do nothing if event already handled
    }
    control_direccion(event.code);
})
