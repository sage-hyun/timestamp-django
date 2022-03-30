export function get_lyrics() {
    fetch(`/lyric/${audio_id}`, {
        method: "GET",
    })
    .then((response) => {
        if (!response.ok) {
            return response.json().then(data => { throw new Error(data.error) })
        }
        return response.json();
    })
    .then((data) => {
        lyrics_eng = data.lyrics_eng;
        lyrics_kor = data.lyrics_kor;
    })
    .catch(e=>{
        alert(e);
    });
}