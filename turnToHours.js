function turnConvert(turns){
    var hours = Math.floor((turns  * 10) / 60)
    var min = turns * 10 % 60
    return (hours + "h " + min + "m ")
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