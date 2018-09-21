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

setInterval(checkTurn, 2000)