$("a[name = 'favo']").after("<a id='forward' name='forward' class='meta-item zu-autohide'><i class='z-icon-follow'></i>推送</a>");
$("a[name = 'forward']").click(function(){
	var url = document.URL;
	console.info(url);
	if(/^(http:\/\/www\.zhihu\.com\/collection\/\d{8})$/.test(url)){//收藏页面
		parems = $(this).parent().parent().prev().find(".toggle-expand").attr("href");
		theUrl = 'http://127.0.0.1:8080/iBlog/forwardAction.action?method:forward&url=http://www.zhihu.com' + parems;
	}else if(/^(http:\/\/www\.zhihu\.com\/question\/\d{8})$/.test(url)){ //问题页面
		parems = $(this).siblings().eq(0).children().first().attr("href");
		theUrl = 'http://127.0.0.1:8080/iBlog/forwardAction.action?method:forward&url=http://www.zhihu.com' + parems;
	}else if(url == "http://www.zhihu.com"){//主页面
		var questionId = $(this).parent().parent().parent().parent().parent().parent().children().filter("meta[itemprop='question-url-token']").attr('content');
		var answerId = $(this).parent().parent().parent().parent().parent().parent().children().filter("meta[itemprop='answer-url-token']").attr('content');
		theUrl = 'http://127.0.0.1:8080/iBlog/forwardAction.action?method:forward&url=http://www.zhihu.com/question/'+questionId+'/answer/'+answerId;
	}
	alert("+++"+theUrl);
	xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", theUrl, false );
	xmlHttp.send( null );
	var datum = JSON.parse(xmlHttp.responseText);
	if(datum.hasForwarded==true){
		$(this).html("推送成功").fadeIn();
	}else if(datum.hasForwarded==false){
		$(this).html("已取消推送").fadeIn();
	}
});
