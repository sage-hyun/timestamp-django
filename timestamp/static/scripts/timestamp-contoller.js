import { del_timestamp } from "./timestamp-api-controller.js";
import { formatSecondsAsTime } from "./playback-controller.js";

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