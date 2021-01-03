function control_AudioCaminando(sonar){ 
    if(sonar){    
        Audio_caminando.play();
    }else{
        Audio_caminando.pause();     
    }
}
function fncAudio_perdiste() { 
    Audio_perdiste.play();
}
function fncAudio_ganaste() { 
    Audio_ganaste.play();
}

//****** sonidos */ 
var Audio_caminando = document.createElement('audio');
Audio_caminando.src = './sonidos/caminando.mp3';
Audio_caminando.type = 'audio/mpeg';
Audio_caminando.loop = true;

var Audio_ganaste = document.createElement('audio');
Audio_ganaste.src = './sonidos/ganaste.mp3';
Audio_ganaste.type = 'audio/mpeg';

var Audio_perdiste = document.createElement('audio');
Audio_perdiste.src = './sonidos/perdiste.mp3';
Audio_perdiste.type = 'audio/mpeg';
