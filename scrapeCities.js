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