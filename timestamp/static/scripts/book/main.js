import { create_timestamp } from "../timestamp-api-controller.js";

const add_bookmark = document.getElementById("bookmark-add-btn");
const add_favorite = document.getElementById("favorite-add-btn");
const add_memo = document.getElementById("memo-add-btn");
const memo_area = document.getElementById("memo-area");
const add_toc = document.getElementById("toc-add-btn");

add_bookmark.onclick = () => {create_timestamp("bookmark");}
add_favorite.onclick = () => {create_timestamp("favorite");}
add_memo.onclick = () => {
    var content = memo_area.value;
    memo_area.value = "";
    create_timestamp("memo", content);
}
add_toc.onclick = () => {
    myAudio.pause()
    var content = prompt("new table of content", "name")
    create_timestamp("toc", content);
}