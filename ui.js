function turnConvert(turns){
    var hours = Math.floor((turns  * 10) / 60)
    var min = turns * 10 % 60
    return (hours + "h " + min + "m ")
}

function checkTurn(){
    var time = document.getElementById("GameTurnCountdown").innerHTML;
    if(time == "00:00"){
        setTimeout(function(){location.reload()}, 15000)
    }
}

var spans = document.getElementsByTagName('span');
for(var span in spans){
    var span = spans[span]
    if(span.innerHTML){
        if(span.innerHTML.search("Build:") > -1){
            var split = span.innerHTML.split("-")
            var strip = split[1].split("<")
            var frac = strip[0].split("/")
            var left = frac[1]-frac[0]
            var hour = Math.floor((left  * 10) / 60)
            var min = left * 10 % 60
            span.innerHTML = split[0] + " " + hour + "h " + min + "m left<br>"
        } else if(span.innerHTML.search(/(turn)\(s\)/) > -1){
            var split = span.innerHTML.split(" ");
            var turnOther = split.indexOf("turn(s)")
            var turnAsset = split.indexOf("turn(s)<br>")
            var turnIndex = turnOther == -1 ? turnAsset : turnOther;
            split[turnIndex-1] = turnConvert(split[turnIndex-1]);
            split[turnIndex] = "";
            span.innerHTML = split.join(" ")
        }
    }
}

setInterval(checkTurn, 5000)
var tableTimer = setInterval(function(){
    if(document.getElementById("ctl00_ContentPlaceHolder1_gvCorpHQStructureQueue")){
        var table = document.getElementById("ctl00_ContentPlaceHolder1_gvCorpHQStructureQueue");
        var newRow = table.insertRow(-1);
        var cell1 = newRow.insertCell(0);
        for(var i=1; i<4;i++){
            newRow.insertCell(i);
        }
        cell1.innerHTML = "<img src='images/icons/assets/asset_icon_10_22.gif' style='border-width:0px;border-width:0px; margin:0px 0px 0px 0px; padding:0px 0px 0px 0px;'>";
        var cellCost = newRow.insertCell(4);
        var cellTime = newRow.insertCell(5);
        var rows = table.getElementsByTagName('td');
        var totalCost = 0;
        var totalTime = 0;
        for(row in rows){
            row = rows[row];
            if(row.innerHTML){
                if(row.innerHTML.indexOf("$") > -1 && row.innerHTML.indexOf("<") == -1){
                    console.log(row.innerHTML);
                    totalCost += Number(row.innerHTML.replace("$","").replace(",",""));
                } else if(Number(row.innerHTML)){
                    totalTime += Number(row.innerHTML);
                }
            }
        }
        totalTime = Math.floor((totalTime * 10) / 60) + "h " + ((totalTime * 10) % 60) + "m";
        cellCost.style.textAlign = "right";
        cellCost.innerHTML = "$" + totalCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        cellTime.style.textAlign = "center";
        cellTime.innerHTML = totalTime;
        clearInterval(tableTimer)
    }
}, 2500)

