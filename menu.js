chrome.storage.sync.get(["plugins"], function(config){
    if(JSON.stringify(config).length < 5){
        chrome.storage.sync.set({
            "plugins": {
                "autoRefresh": {
                    "name": "Auto Refresh",
                    "enabled": true
                },
                "turnToHours": {
                    "name": "Turn to Hours",
                    "enabled": true
                },
                "queueTotals": {
                    "name": "Queue Tabulation",
                    "enabled": true
                },
                "scrapeCities": {
                    "name": "Scrape Cities",
                    "enabled": true
                }
            }
        })
    }
})

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

function toggleConfig(e){
    console.log($("#" + e.target.id).prop('checked'))
    chrome.storage.sync.get(["plugins"], function(plugins){
        plugins = plugins.plugins
        console.log(plugins[e.target.id])
        plugins[e.target.id].enabled = $("#" + e.target.id).prop('checked')
        chrome.storage.sync.set({"plugins":plugins})
    })
}

document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.sync.get(["plugins"], function(config){
        for(var plugin in config.plugins){
            if(config.plugins[plugin].enabled){
                $("#configSliders").append("<tr><td style='text-align:center;vertical-align:middle;'>" + config.plugins[plugin].name + "</td><td><center><input type='checkbox' checked data-toggle='toggle' id='" + plugin + "'></center></td></tr>")
            } else {
                $("#configSliders").append("<tr><td style='text-align:center;vertical-align:middle;'>" + config.plugins[plugin].name + "</td><td><center><input type='checkbox' data-toggle='toggle' id='" + plugin + "'></center></td></tr>")
            }
            $("#" + plugin).change(toggleConfig)

        }
    })
});
