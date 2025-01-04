const screenMax = document.querySelector('.screen-max');
const screenMin = document.querySelector('.screen-min');

document.getElementById("screen-toggle").addEventListener("click", () =>  {
    if(!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        if(document.documentElement.requestFullscreen){
            document.documentElement.requestFullscreen();
        }else if(document.documentElement.webkitRequestFullscreen){
            document.documentElement.webkitRequestFullscreen();
        }else if(document.documentElement.mozRequestFullScreen){
            document.documentElement.mozRequestFullScreen();
        }else if(document.documentElement.msRequestFullscreen){
            document.documentElement.msRequestFullscreen();
        }

        screenMax.style.display = 'none';
        screenMin.style.display = 'inline';
    }else{
        if(document.exitFullscreen){
            document.exitFullscreen();
        }else if(document.webkitExitFullscreen){
            document.webkitExitFullscreen();
        }else if(document.mozCancelFullScreen){
            document.mozCancelFullScreen();
        }else if(document.msExitFullscreen){
            document.msExitFullscreen();
        };

        screenMax.style.display = 'inline';
        screenMin.style.display = 'none';
    }
});