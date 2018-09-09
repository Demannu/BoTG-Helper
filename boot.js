function bootstrap(script){
    var s = document.createElement('script');
    s.src = chrome.extension.getURL(script)
    s.onload = function() {
        this.remove();
    };
    (document.head || document.documentElement).appendChild(s);
}

var manifestData = chrome.runtime.getManifest();
for(var s in manifestData.web_accessible_resources){
    bootstrap(manifestData.web_accessible_resources[s])
}
