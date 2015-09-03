function getDomainFromUrl(url){
	var host = "null";
	if(typeof url == "undefined" || null == url)
		url = window.location.href;
	var regex = /.*\:\/\/([^\/]*).*/;
	var match = url.match(regex);
	if(typeof match != "undefined" && null != match)
		host = match[1];
	return host;
}

function checkForValidUrl(tabId, changeInfo, tab) {
	var url = tab.url;
	console.info(tab.url);
	
	if(/www\.zhihu\.com\/question\/\d{8}\/answer\/\d{8}/.test(url) | url.indexOf("douban")>=0 | url.indexOf("csdn")>=0 | url.indexOf("zhidao.baidu")>=0 | url.indexOf("cnblogs")>=0 | url.indexOf("iteye")>=0 ){
		xmlHttp = new XMLHttpRequest();
		theUrl = 'http://127.0.0.1:8080/iBlog/forwardAction.action?method:hasForwarded&url='+url;
		xmlHttp.open( "post", theUrl, false );
		xmlHttp.send(null);
		var datum = JSON.parse(xmlHttp.responseText);
		if(datum.hasForwarded==false){
			chrome.pageAction.show(tabId);
			chrome.pageAction.setIcon({'tabId':tab.id,path:"add.png"});  
			console.info("n");
		}else{
			chrome.pageAction.show(tabId);
			chrome.pageAction.setIcon({'tabId':tab.id,path:"added.png"});  
			console.info("y");
			
		}

		console.info("excuted");
	}
};

chrome.tabs.onUpdated.addListener(checkForValidUrl);

chrome.extension.onRequest.addListener(
        function (request, sender, sendResponse) {
        	 console.info('xxxxxx');
            var name = request.name;
            if (name == "toggleicon") {
                var hasForwarded = request.hasForwarded;
                var tabId = request.tabId;
        		if(hasForwarded == false){
        			console.log("nnn");
        			chrome.pageAction.setIcon({'tabId':tabId,path:"add.png"});  
        		}else{
        			console.log("yyy");
        			chrome.pageAction.setIcon({'tabId':tabId,path:"added.png"});  
        		}
            } 
        });

