import { create_timestamp } from "../timestamp-api-controller.js";

const add_marker = document.getElementById("marker-add-btn");
const marker_timeline = document.getElementById("marker-timeline");
const progress_bar = document.getElementById("progress-bar");

let timeline_scale = 20;
let marker_width = 16;

myAudio.addEventListener("loadeddata", () => {
    progress_bar.style.width = `${myAudio.duration * timeline_scale}px`;
    marker_timeline.style.width = `${(myAudio.duration) * timeline_scale - marker_width}px`;

    const li_all = document.querySelectorAll("li");
    li_all.forEach(li => {
        add_timeline_marker(li.getAttribute("data-second"));
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
}