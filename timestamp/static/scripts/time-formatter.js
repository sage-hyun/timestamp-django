export function formatSecondsAsTime(secs, showDecimalPoint=false) {
    var hr  = String(Math.floor(secs / 3600)).padStart(2, '0');
    var min = String(Math.floor((secs - (hr * 3600))/60)).padStart(2, '0');
    var sec = String(Math.floor(secs - (hr * 3600) -  (min * 60))).padStart(2, '0');
    
    if (showDecimalPoint) {
        var secAfterDecimalPoint = (secs - Math.floor(secs)).toFixed(3).substring(1);
        return hr + ':' + min + ':' + sec + secAfterDecimalPoint;
    } else {
        return hr + ':' + min + ':' + sec;
    }
}


export function formatDatetime(str) {
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