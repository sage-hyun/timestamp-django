import { formatSecondsAsTime } from "./time-formatter.js"

const myAudio = document.getElementById("myAudio"); // Audio객체 취득
const currentTime_text = document.getElementById("currentTime");
const duration_text = document.getElementById("duration");
const progress_bar = document.getElementById("progress-bar");

myAudio.addEventListener('loadeddata', ()=> {
    duration_text.innerHTML = formatSecondsAsTime(myAudio.duration);
})
myAudio.addEventListener('timeupdate', ()=>{
    currentTime_text.innerHTML = formatSecondsAsTime(myAudio.currentTime);
    progress_bar.value = (myAudio.currentTime / myAudio.duration) * 100;
});

progress_bar.addEventListener('change', () => {
    myAudio.currentTime = myAudio.duration * progress_bar.value / 100;
});

const play_toggle_btn = document.getElementById("play-toggle-btn");
const rewind_btn = document.getElementById("rewind-btn");
const forward_btn = document.getElementById("forward-btn");
const speed_btn = document.getElementById("speed-btn");

play_toggle_btn.onclick = () => {
    if (myAudio.paused) {
        myAudio.play();
        play_toggle_btn.classList.remove("play-icon");
        play_toggle_btn.classList.add("pause-icon");
    } else {
        myAudio.pause();
        play_toggle_btn.classList.remove("pause-icon");
        play_toggle_btn.classList.add("play-icon");
    }
}
rewind_btn.onclick = () => {
    var offset = document.getElementById("offset");
    myAudio.currentTime -= parseInt(offset.value);
}
forward_btn.onclick = () => {
    var offset = document.getElementById("offset");
    myAudio.currentTime += parseInt(offset.value);
}
speed_btn.onclick = () => {
    myAudio.playbackRate += 0.2;
    if (myAudio.playbackRate > 2.0) {
        myAudio.playbackRate = 0.8;
    }
    speed_btn.innerHTML = `x${myAudio.playbackRate.toFixed(1)}`;
}