var ws = null;

function init(){
    if ("WebSocket" in window) {
        ws = new WebSocket("ws://127.0.0.1:8888/ws/");
        ws.onopen = function(){
            console.log("Connection is opened");
        }
        ws.onclose = function() {
            console.log("Connection is closed");
        }
        ws.onmessage = function(msg) {
            document.getElementById("display").innerHTML = msg.data;
        }
    } else {
        console.log("Your browser doesn't support WebSocket!")
    }
}

function send(){
    ws.send(document.getElementById("txt").value);
}
