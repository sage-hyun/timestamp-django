import { create_timestamp } from "../timestamp-api-controller.js";

const add_marker = document.getElementById("marker-add-btn");

add_marker.onclick = () => {
    create_timestamp("marker");
}