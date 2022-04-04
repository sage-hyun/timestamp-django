import { del_timestamp } from "./timestamp-api-controller.js";
import { formatSecondsAsTime } from "./time-formatter.js"

function liPlayButton() {
    var play_btn = document.createElement("button");
    play_btn.setAttribute("class", "play-btn");
    play_btn.innerHTML = "▶";
    play_btn.onclick = () => {
        var sec = play_btn.parentElement.parentElement.getAttribute("data-second");
        myAudio.currentTime = parseFloat(sec);
    };
    return play_btn;
}

function liDeleteButton(){
    var del_btn = document.createElement("button");
    del_btn.setAttribute("class", "del-btn");
    del_btn.innerHTML = "✖";
    del_btn.onclick = () => {
        del_timestamp(del_btn.parentElement.parentElement.getAttribute("data-id"));
    };
    return del_btn;
}

export function createTsContainer(second, stamp_type){
    var ts_container = document.createElement("div");
    ts_container.setAttribute("class", "ts-container");

    ts_container.append(liPlayButton());

    var timestamp_str = document.createElement("span");
    timestamp_str.innerHTML = formatSecondsAsTime(second, stamp_type === "marker");
    ts_container.append(timestamp_str);

    ts_container.append(liDeleteButton());

    return ts_container;
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

// create ts-container for every <li>
const ul_all = document.querySelectorAll("ul");
ul_all.forEach(ul => {
    const li_all = ul.querySelectorAll("li");
    li_all.forEach(li => {
        var second = parseFloat(li.getAttribute("data-second"));
        var stamp_type = ul.parentElement.className;

        var ts_container = createTsContainer(second, stamp_type);
        li.prepend(ts_container);
    });
})