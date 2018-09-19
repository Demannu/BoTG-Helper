var params={};
window.location.search
  .replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str,key,value) {
    params[key] = value;
  }
);

function turnConvert(turns){
    var hours = Math.floor((turns  * 10) / 60)
    var min = turns * 10 % 60
    return (hours + "h " + min + "m ")
}

function checkTurn(){
    var time = document.getElementById("GameTurnCountdown").innerHTML;
    if(time == "00:30"){
        var warning = document.createElement("div")
        warning.style = "position: fixed; z-index: 99;top: 15px; left: 15px; background-color: #C4C4C4; width: 250px; height: 25px; color: red;"
        warning.innerHTML = "<b> This turn is ending in 30 seconds </b>"
        document.body.appendChild(warning)
    } else if(time == "00:00"){
        setTimeout(function(){location.reload()}, (Math.floor((Math.random() * (200-150)) + 150)*100))
    }
}

function scrapeViewscreen(activeTab){
    var turn = document.getElementById("ctl00_lblCurrTurn").innerHTML;
    var city = document.getElementById("ctl00_ContentPlaceHolder1_lblLeftNavHeading").innerHTML;
    var planet = document.getElementById("ctl00_ContentPlaceHolder1_lblLeftNavHeading2").innerHTML;
    var scrapeTable = document.getElementById("ctl00_ContentPlaceHolder1_gvGrid" + activeTab + "Categories");
    for(var row in scrapeTable.rows){
        row = scrapeTable.rows[row]
        if(row.cells && row.cells[2].innerHTML.length > 10){
            var name = row.cells[0].innerHTML.split(">")[1].split("<")[0];
            if(activeTab == "Demand"){
                if(name !== "(return to top)"){
                    var avg = row.cells[2].innerHTML.split(">")[1].split("<")[0];
                    var val = row.cells[3].innerHTML;
                    var vol = row.cells[4].innerHTML;
                    $.post("http://api.zvarpensg.xyz/demand", {
                        planet: planet,
                        city: city,
                        resource: name,
                        avg: avg,
                        val: val,
                        vol: vol,
                        turn: Number(turn)
                    })
                }
            } else if(activeTab == "Industry"){
                if(name !== "(return to top)"){
                    var out = row.cells[2].innerHTML;
                    var cnt = row.cells[3].innerHTML;
                    if(cnt == "---"){
                        cnt = 0;
                    }
                    if(!Number(out)){
                        out = 0;
                    } else {
                        out = out.replace("↵", " ").replace(" ","").trim()
                    }
                    $.post("http://api.zvarpensg.xyz/industry", {
                        planet: planet,
                        city: city,
                        resource: name,
                        output: Number(out),
                        count: Number(cnt),
                        turn: Number(turn)
                    })
                }
            }
        }
    }
}

function scrapeOrders(){
    var scrapeTable = document.getElementById("ctl00_ContentPlaceHolder1_gvOrders")
    var orders = []
    var locs = []
    var toggle = false;
    for(var i=1; i<scrapeTable.rows.length;i++){
        var row = scrapeTable.rows[i]
        orders.push({
            num: row.cells[2].innerHTML,
            type: row.cells[3].innerHTML,
            detail: row.cells[4].innerHTML
        })
    }
    orders.sort();
    for(var i=0; i<orders.length;i++){
        var order = orders[i]
        if(order.type == "Move To Location" && !toggle){
            toggle = !toggle;
            i++;
            var suborders = [];
            console.log(order)
            console.log(orders)
            console.log(i)
            while(orders[i] && orders[i].type !== "Move To Location" && orders[i].type !== "Loop Order"){
                suborders.push(orders[i]);
                console.log("Suborder :" + orders[i])
                i++
            }
            locs.push({[order.detail]:suborders});
            toggle = !toggle
            i--
        }
    }
    console.log(locs)
}
var activeURL = window.location.href;
var activePage = window.location.href.split("?")[0].split(".com/")[1]
if(activePage == "assets.aspx" && params.tid == "20"){
    // This is a military unit, transport or otherwise
    $("#ctl00_ContentPlaceHolder1_tabAssetMilitaryOrders").click(function(){
        setTimeout(scrapeOrders,2500);
    })
}

// Viewscreen (Parent): ctl00_tabViewscreen
// Overview: ctl00_ContentPlaceHolder1_tabVSOverview
//  Population: ctl00_ContentPlaceHolder1_lblOverviewPopulation
//  Local Resources: ctl00_ContentPlaceHolder1_lblResCount
//  Planet Resources: ctl00_ContentPlaceHolder1_lblResTotal
//  Local Industry: ctl00_ContentPlaceHolder1_lblIndCount
//  Planet Resources: ctl00_ContentPlaceHolder1_lblIndTotal
//  Demand Average: ctl00_ContentPlaceHolder1_lblDemAVG
//  Volume: ctl00_ContentPlaceHolder1_lblDemVOL
//  Military Units: ctl00_ContentPlaceHolder1_lblMilCount
//  Military Power: ctl00_ContentPlaceHolder1_lblMilPower
// Resources: ctl00_ContentPlaceHolder1_tabVSResources
// Industry: ctl00_ContentPlaceHolder1_tabVSIndustry
// Demand: ctl00_ContentPlaceHolder1_tabVSDemand
// Military: ctl00_ContentPlaceHolder1_tabVSMilitary


if(document.getElementById("ctl00_ContentPlaceHolder1_upViewscreen")){
    var planet = document.getElementById("ctl00_ContentPlaceHolder1_lblLeftNavHeading2").innerHTML;
    var city = document.getElementById("ctl00_ContentPlaceHolder1_lblLeftNavHeading").innerHTML;
    var activePanel = document.getElementsByClassName("hoverLeftNavTabON")[0].id.split("VS")[1]
    switch(activePanel){
        case "Overview":
            break;
        case "Resources":
            /* Not Needed 
            var resourceArray = [];
            var resourceObject = {};
            var parent = document.getElementById("ctl00_ContentPlaceHolder1_btnResByHex").parentElement.parentElement.parentElement.parentElement;
            parent.id="resourceTable";
            $("table#resourceTable tr").each(function() {
                var arrayOfThisRow = [];
                var tableData = $(this).find('td');
                if (tableData.length > 0) {
                    tableData.each(function() { arrayOfThisRow.push($(this).text()); });
                    resourceArray.push(arrayOfThisRow);
                }
            });
            for(var i=2; i<resourceArray.length; i++){
                resourceObject[resourceArray[i][0].replace(":","")] = resourceArray[i][1];
            }
            $.post({
                url: "http://api.zvarpensg.xyz/static/"
            })*/
            break;
        case "Industry":
            if(document.getElementById("ctl00_ContentPlaceHolder1_rbIndustryByProduct").checked){
                scrapeViewscreen(activePanel)
            } else {
                var parent = document.getElementById("ctl00_ContentPlaceHolder1_cbGridIndustry").parentElement;
                var infoSpan = document.createElement("span");
                infoSpan.style = "color: orange;";
                infoSpan.innerHTML = "<br>Change display to By Products"
                var infoPanel = parent.appendChild(infoSpan)
            }
            break;
        case "Demand":
            if(document.getElementById("ctl00_ContentPlaceHolder1_rbDemandByProduct").checked){
                scrapeViewscreen(activePanel)
            } else {
                var parent = document.getElementById("ctl00_ContentPlaceHolder1_cbGridDemand").parentElement 
                var infoSpan = document.createElement("span");
                infoSpan.style = "color: orange;";
                infoSpan.innerHTML = "<br>Change display to By Products"
                var infoPanel = parent.appendChild(infoSpan)
            }
            break;
        case "Military":
            break;
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
            if(frac[1]>frac[0]){
                var left = frac[1]-frac[0]
                var hour = Math.floor((left  * 10) / 60)
                var min = left * 10 % 60
                span.innerHTML = split[0] + " " + hour + "h " + min + "m left<br>"
            } else {
                span.innerHTML = split[0] + " | Queued<br>";
            }
            
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

setInterval(checkTurn, 2000)
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

