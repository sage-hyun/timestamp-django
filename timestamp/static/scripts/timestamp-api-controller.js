import { formatSecondsAsTime } from "./playback-controller.js";
import { liPlayButton, liDeleteButton, sortTimestampByAttribute } from "./timestamp-contoller.js"

export function create_timestamp(stamp_type, content=null) {
    fetch("/timestamp/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrf_token,
        },
        body: JSON.stringify({
            audio_id: parseInt(audio_id),
            second: myAudio.currentTime.toFixed(3),
            stamp_type: stamp_type.toUpperCase(),
            content: content,
        }),
    })
    .then((response) => {
        if (!response.ok) {
            return response.json().then(data => { throw new Error(data.error) })
        }
        return response.json();
    })
    .then((data) => {
        var ul = document.querySelector("ul." + stamp_type);

        var li = document.createElement("li");
        li.setAttribute("data-id", data.timestamp_id);
        li.setAttribute("data-second", data.second);

        function format_datetime(str) {
            const date = new Date(str);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            
            var hours = date.getHours();
            var ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 ? hours % 12 : 12; // the hour '0' should be '12'
            var minutes = String(date.getMinutes()).padStart(2, '0');
            
            return `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
        }

        var created_at = document.createElement("div");
        created_at.setAttribute("style", "font-size: small");
        created_at.innerHTML = "created at: " + format_datetime(data.created_at);

        li.appendChild(document.createTextNode(formatSecondsAsTime(data.second, stamp_type === "marker")));
        li.appendChild(liPlayButton());
        li.appendChild(liDeleteButton());

        if (stamp_type != "toc" && stamp_type != "marker"){
            li.appendChild(created_at);
        }

        if (content) {
            var content_div = document.createElement("div");
            content_div.setAttribute("class", "content");
            content_div.innerHTML = content;
            li.appendChild(content_div);   
        }

        ul.appendChild(li);
        sortTimestampByAttribute("data-second", "marker");
    })
    .catch(e=>{
        alert(e);
    });
}

export function del_timestamp(id){
    var confirmValue = confirm("Are you sure you want to delete?");
    if (confirmValue === true && id) {
        fetch("/timestamp/"+id, {
            method: "DELETE",
            headers: {
                "X-CSRFToken": csrf_token,
            },
        })
        .then((response) => response.json())
        .then((data) => {
            var elem = document.querySelector(`li[data-id="${id}"]`);
            elem.remove();
        })
    }
}