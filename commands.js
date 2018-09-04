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
            span.innerHTML = split[0] + " " + split[1] + " " + split[2] + " " + split[3] + " " + hour + "h " + min + "m left<br>"
        }
    }
}
`;

var tableTotaller = `
var conButton = document.getElementById("ctl00_ContentPlaceHolder1_tabAssetStructurePBCConstruction")
conButton.onclick = function(){tableGen();}
function tableGen(){
    var table = document.getElementById("ctl00_ContentPlaceHolder1_gvCorpHQStructureQueue");
    var newRow = table.insertRow(-1);
    var cell1 = newRow.insertCell(0);
    for(var i=1; i<4;i++){
        newRow.insertCell(i);
    }
    cell1.innerHTML = "<img src='images/icons/assets/asset_icon_10_22.gif' style='border-width:0px;border-width:0px; margin:0px 0px 0px 0px; padding:0px 0px 0px 0px;'>"
    var cellCost = newRow.insertCell(4);
    var cellTime = newRow.insertCell(5);
    var rows = table.getElementsByTagName('td')
    var totalCost = 0;
    var totalTime = 0;
    for(row in rows){
        row = rows[row]
        if(row.innerHTML){
            
            if(row.innerHTML.indexOf("$") > -1 && row.innerHTML.indexOf("<") == -1){
                console.log(row.innerHTML)
                totalCost += Number(row.innerHTML.replace("$","").replace(",",""))
            } else if(Number(row.innerHTML)){
                totalTime += Number(row.innerHTML)
            }
        }

    }
    totalTime = Math.floor((totalTime * 10) / 60) + "h " + ((totalTime * 10) % 60) + "m"
    cellCost.style.textAlign = "right"
    cellCost.innerHTML = "$" + totalCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    cellTime.style.textAlign = "center"
    cellTime.innerHTML = totalTime;
}

`;

var refreshTimer = `
var checkTurn = function(){
    var time = document.getElementById("GameTurnCountdown").innerHTML;
    if(time == "00:00"){
        setTimeout(function(){location.reload()}, 13000)
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

    var tableScript = document.createElement("script");
    turnScript.textContent = tableTotaller;
    (document.head || document.documentElement).appendChild(tableScript);
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
