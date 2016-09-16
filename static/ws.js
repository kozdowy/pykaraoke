var ws = null;
function init(){
    if ("WebSocket" in window) {
        ws = new WebSocket("ws://127.0.0.1:8888/ws");
        ws.onopen = function(){
            ws.send("opened")
            console.log("Connection is opened");
        }
        ws.onclose = function() {
            ws.send("closed")
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
    console.log("sending")
    ws.send(document.getElementById("txt").value);
}
