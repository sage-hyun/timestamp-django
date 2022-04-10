import { createTsContainer, sortTimestampByAttribute } from "./timestamp-controller.js"
import { formatDatetime } from "./time-formatter.js"

export function create_timestamp(stamp_type, content=null) {
    const myAudio = document.getElementById("myAudio");

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
        var ul = document.querySelector(`section.${stamp_type} ul`);

        var li = document.createElement("li");
        li.setAttribute("data-id", data.timestamp_id);
        li.setAttribute("data-second", data.second);

        // ts-container
        var ts_container = createTsContainer(data.second, stamp_type);
        li.appendChild(ts_container);
        
        // content
        if (content) {
            var content_div = document.createElement("div");
            content_div.setAttribute("class", "content");
            content_div.innerHTML = content;
            li.appendChild(content_div);   
        }

        // created-at
        if (stamp_type != "toc" && stamp_type != "marker") {
            var created_at = document.createElement("div");
            created_at.setAttribute("class", "created-at");
            created_at.innerHTML = "created at: " + formatDatetime(data.created_at);
            li.appendChild(created_at);
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