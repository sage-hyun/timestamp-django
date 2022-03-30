import { del_timestamp } from "./timestamp-api-controller.js";

export function formatSecondsAsTime(secs) {
    var hr  = String(Math.floor(secs / 3600)).padStart(2, '0');
    var min = String(Math.floor((secs - (hr * 3600))/60)).padStart(2, '0');
    var sec = String(Math.floor(secs - (hr * 3600) -  (min * 60))).padStart(2, '0');
    
    return hr + ':' + min + ':' + sec;
}

export function liPlayButton() {
    var play_btn = document.createElement("button");
    play_btn.setAttribute("class", "play-btn");
    play_btn.innerHTML = "play";
    play_btn.onclick = () => {
        var sec = play_btn.parentElement.getAttribute("data-second");
        myAudio.currentTime = parseInt(sec);
    };
    return play_btn;
}

export function liDeleteButton(){
    var del_btn = document.createElement("button");
    del_btn.setAttribute("class", "del-btn");
    del_btn.innerHTML = "del";
    del_btn.onclick = () => {
        del_timestamp(del_btn.parentElement.getAttribute("data-id"));
    };
    return del_btn;
}

export function sortTimestampByAttribute(attribute, stamp_type) {
    var li = document.querySelectorAll(`ul.${stamp_type} li`);

    Array.from(li).sort((a, b) => 
        parseInt(a.getAttribute(attribute)) > parseInt(b.getAttribute(attribute)) ? 1 : -1
    )
    .forEach(elem => elem.parentNode.appendChild(elem));
}

const myAudio = document.getElementById("myAudio"); // Audio객체 취득
const currentTime_text = document.getElementById("currentTime");
const progress_bar = document.getElementById("progress-bar");

myAudio.addEventListener('timeupdate', ()=>{
    currentTime_text.innerHTML = formatSecondsAsTime(myAudio.currentTime);
    progress_bar.value = (myAudio.currentTime / myAudio.duration) * 100;
});

progress_bar.addEventListener('change', () => {
    myAudio.currentTime = myAudio.duration * progress_bar.value / 100;
});

const rewind_btn = document.getElementById("rewind-btn");
const forward_btn = document.getElementById("forward-btn");
const speed_btn = document.getElementById("speed-btn");
rewind_btn.onclick = () => {myAudio.currentTime -= 10;}
forward_btn.onclick = () => {myAudio.currentTime += 10;}
speed_btn.onclick = () => {
    myAudio.playbackRate += 0.2;
    if (myAudio.playbackRate > 2.0) {
        myAudio.playbackRate = 0.8;
    }
    speed_btn.innerHTML = `x${myAudio.playbackRate.toFixed(1)}`;
}

// sort <li> by seconds
sortTimestampByAttribute("data-second", "marker");

// format seconds of every <li>
const li_all = document.querySelectorAll("li");
li_all.forEach(li => {
    li.prepend(liDeleteButton());
    li.prepend(liPlayButton());

    var second = parseInt(li.getAttribute("data-second"));
    var timestamp_str = formatSecondsAsTime(second);
    li.prepend(document.createTextNode(timestamp_str));
});