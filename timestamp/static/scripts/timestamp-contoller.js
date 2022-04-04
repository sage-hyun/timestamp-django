import { del_timestamp } from "./timestamp-api-controller.js";
import { formatSecondsAsTime } from "./playback-controller.js";

export function liPlayButton() {
    var play_btn = document.createElement("button");
    play_btn.setAttribute("class", "play-btn");
    play_btn.innerHTML = "▶";
    play_btn.onclick = () => {
        var sec = play_btn.parentElement.parentElement.getAttribute("data-second");
        myAudio.currentTime = parseFloat(sec);
    };
    return play_btn;
}

export function liDeleteButton(){
    var del_btn = document.createElement("button");
    del_btn.setAttribute("class", "del-btn");
    del_btn.innerHTML = "✖";
    del_btn.onclick = () => {
        del_timestamp(del_btn.parentElement.parentElement.getAttribute("data-id"));
    };
    return del_btn;
}

export function sortTimestampByAttribute(attribute, stamp_type) {
    var li = document.querySelectorAll(`section.${stamp_type} li`);

    Array.from(li).sort((a, b) => 
        parseFloat(a.getAttribute(attribute)) > parseFloat(b.getAttribute(attribute)) ? 1 : -1
    )
    .forEach(elem => elem.parentNode.appendChild(elem));
}


// sort <li> by seconds
sortTimestampByAttribute("data-second", "marker");

// format seconds of every <li>
const ul_all = document.querySelectorAll("ul");
ul_all.forEach(ul => {
    const li_all = ul.querySelectorAll("li");
    li_all.forEach(li => {
        li.prepend(liDeleteButton());
        li.prepend(liPlayButton());
    
        var second = parseFloat(li.getAttribute("data-second"));
        var timestamp_str = formatSecondsAsTime(second, ul.className === "marker");
        li.prepend(document.createTextNode(timestamp_str));
    });
})