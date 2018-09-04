function give(entry){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"type": entry});
    });
    console.log(entry)
}

function click(e){
    console.log("e.target.id: " + e.target.id)
    console.log("e" + e)
    give(e.target.id)
}

document.addEventListener('DOMContentLoaded', function () {
    var divs = document.querySelectorAll('button');
    console.log(divs)
    for (var i = 0; i < divs.length; i++) {
      divs[i].addEventListener('click', click);
    }
  });
