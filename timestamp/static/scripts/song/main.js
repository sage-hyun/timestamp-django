import { get_lyrics } from "../lyric-api-controller.js";
import { create_timestamp } from "../timestamp-api-controller.js";

const add_marker = document.getElementById("marker-add-btn");
const marker_timeline = document.getElementById("marker-timeline");
const progress_bar = document.getElementById("progress-bar");

let timeline_scale = 5;
let marker_width = 16;

myAudio.addEventListener("loadeddata", () => {
    progress_bar.style.width = `${myAudio.duration * timeline_scale}px`;
    marker_timeline.style.width = `${(myAudio.duration) * timeline_scale - marker_width}px`;

    const li_all = document.querySelectorAll("li");
    li_all.forEach(li => {
        add_timeline_marker(li.getAttribute("data-second"));
        seconds_flat.push(parseInt(li.getAttribute("data-second")));
        seconds_flat.sort((a,b)=>(a-b));
    });
})

function add_timeline_marker(sec) {
    var div_marker = document.createElement("div");
    div_marker.innerHTML = "△";
    div_marker.style.position = "absolute";
    div_marker.style.left = `${(sec / myAudio.duration) * 100}%`;
    marker_timeline.appendChild(div_marker);
}

add_marker.onclick = () => {
    create_timestamp("marker");
    add_timeline_marker(myAudio.currentTime);
    seconds_flat.push(parseInt(myAudio.currentTime));
    seconds_flat.sort((a,b)=>(a-b));
}

get_lyrics();

const shown_lyric_eng = document.getElementById("shown-lyric-eng");
const shown_lyric_kor = document.getElementById("shown-lyric-kor");
var delay = 0;

myAudio.addEventListener('timeupdate', ()=>{
    
    for(var i = seconds_flat.length - 1; i >= 0; i--){
        if(myAudio.currentTime >= seconds_flat[i] + delay){
            shown_lyric_eng.innerHTML = lyrics_eng[i];
            shown_lyric_kor.innerHTML = lyrics_kor[i];
            break;
        }
    }
    for(var i = seconds_flat.length - 1; i >= 0; i--){
        if(myAudio.currentTime >= seconds_flat[i] + delay - 0.2 && myAudio.currentTime < seconds_flat[i] + delay){
            shown_lyric_eng.style.opacity = 0;
            shown_lyric_kor.style.opacity = 0;
            break;
        }
        if(i === seconds_flat.length - 1 && myAudio.currentTime >= seconds_flat[i] + delay){
            shown_lyric_eng.style.opacity = 1;
            shown_lyric_kor.style.opacity = 1;
            break;
        }

        if(myAudio.currentTime >= seconds_flat[i] + delay && myAudio.currentTime < seconds_flat[i+1] + delay){
            shown_lyric_eng.style.opacity = 1;
            shown_lyric_kor.style.opacity = 1;
            break;
        }
    }

    // for(var i = seconds_flat.length - 1; i >= 0; i--){
    //     if(myAudio.currentTime >= seconds_flat[i] + delay - 1 && myAudio.currentTime <= seconds_flat[i] + delay + 1){
    //         // shown_lyric_eng.style.opacity = `${Math.pow(myAudio.currentTime - (seconds_flat[i] + delay), 2) * 2500}%`
    //         shown_lyric_eng.style.opacity = `${(myAudio.currentTime - (seconds_flat[i] + delay)) * (myAudio.currentTime - (seconds_flat[i] + delay)) * 100}%`
    //         break;
    //     }
    // }
});
