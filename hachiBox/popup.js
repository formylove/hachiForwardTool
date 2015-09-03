chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
	theUrl = 'http://127.0.0.1:8080/iBlog/forwardAction.action?method:forward&url='+tabs[0].url;
	xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", theUrl, false );
	xmlHttp.send( null );
	var datum = JSON.parse(xmlHttp.responseText);
	var msg = document.getElementById("msg");
	if(datum.hasForwarded == true){
		var href ="http://127.0.0.1:8080/iBlog/diaryAction.action?method:loadDiary&id=" + datum.diaryID;
		document.write("<a href='"+ href +"' target='_blank'>推送成功</a>");
	}else{
		document.write("取消推送");
	}
    chrome.extension.sendRequest(
    		{tabId:tabs[0].id,name: "toggleicon", hasForwarded: datum.hasForwarded},
    		function (response) {console.log("lll");}
    							);
});
