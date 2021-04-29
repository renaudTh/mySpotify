function msTominSec(duration){

    totalSeconds = Math.floor(duration/1000);
    hours = Math.floor((totalSeconds) / 3600);
    totalSeconds %= 3600;
    minutes = Math.floor(totalSeconds / 60);
    seconds = totalSeconds % 60;
    if(seconds < 10) seconds = "0"+seconds;
    if(hours > 0 && minutes < 10){
        minutes = "0"+minutes;
    }
    return {
        h : hours,
        m : minutes,
        s : seconds
    }
}

window.addEventListener('load', listenHash);
window.addEventListener('hashchange', listenHash);



