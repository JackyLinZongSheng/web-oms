function convertTime(number){
    let mydate=new Date(number);
    let y=mydate.getFullYear(),
        m=mydate.getMonth()+1,
        d=mydate.getDate();
    m=m<10?"0"+m:m;
    d=d<10?"0"+d:d;
    return y+"-"+m+"-"+d;
}

function isNull(arg){
    return !arg && arg!==0 && typeof arg!=="boolean"?true:false;
}

function clearAllCookie() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if(keys) {
        for(var i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString();
    }
}

export {convertTime,isNull,clearAllCookie}