function bootstrap(script){
    var s = document.createElement('script');
    s.src = chrome.extension.getURL(script)
    s.onload = function() {
        this.remove();
    };
    (document.head || document.documentElement).appendChild(s);
}

chrome.storage.sync.get(["plugins"], function(results){
    var plugins = results.plugins
    var manifestData = chrome.runtime.getManifest();
    for(var s in manifestData.web_accessible_resources){
        s = manifestData.web_accessible_resources[s]
        if(plugins[s.replace(".js","")] && plugins[s.replace(".js","")].enabled ){
            bootstrap(s)
        }
    }
})
