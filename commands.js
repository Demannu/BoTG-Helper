var turnConvert = `
var spans = document.getElementsByTagName('span');
for(var span in spans){
    var span = spans[span]
    if(span.innerHTML){
        if(span.innerHTML.search("Upgrade:") > -1 && span.innerHTML.search("turn") > -1){
            var split = span.innerHTML.split(" ")
            var value = split[1]
            var hours = Math.floor((value  * 10) / 60)
            var min = value * 10 % 60
            span.innerHTML = split[0] + " " + hours + "h " + min + "m"
        } else if(span.innerHTML.search("Build:") > -1){
            var split = span.innerHTML.split(" ")
            var strip = split[4].split("<")
            var frac = strip[0].split("/")
            var left = frac[1]-frac[0]
            var hour = Math.floor((left  * 10) / 60)
            var min = left * 10 % 60
            span.innerHTML = split[0] + " " + split[1] + " " + split[2] + " " + split[3] + " " + hour + "h " + min + "m left"
        }

    }
}
`;

var refreshTimer = `
var checkTurn = function(){
    var time = document.getElementById("GameTurnCountdown").innerHTML;
    if(time == "00:00"){
        setTimeout(function(){location.reload()}, 12500)
    }
}
setInterval(checkTurn, 5000)

`;
function runOnce(){
    var timerScript = document.createElement("script");
    timerScript.textContent = refreshTimer;
    (document.head || document.documentElement).appendChild(timerScript);

    var turnScript = document.createElement("script");
    turnScript.textContent = turnConvert;
    (document.head || document.documentElement).appendChild(turnScript);
}
window.onload = function(){
    runOnce()
}
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        console.log(request.type)
        switch(request.type){
            case "debugCapture":
                var script = document.createElement("script");
                script.textContent = debugCapture;
                (document.head || document.documentElement).appendChild(script);
                script.remove();
                break;

        }
    }
)
