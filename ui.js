var params={};
window.location.search
  .replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str,key,value) {
    params[key] = value;
  }
);

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

