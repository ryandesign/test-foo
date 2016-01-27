!function(){
	var root='/test-foo/';
	var d=document;
	function loadJson(uri,cb){
		if(!JSON||!JSON.parse)return cb(new Error('JSON.parse not available'));
		var xhr=typeof XMLHttpRequest!='undefined'?new XMLHttpRequest():new ActiveXObject('Microsoft.XMLHTTP');
		xhr.open('get',uri,true);
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4){
				var status=xhr.status;
				if(status!=200){
					var err=new Error();
					err.status=status;
					return cb(err);
				}
				cb(null,JSON.parse(xhr.responseText));
			}
		};
		xhr.send();
	}
	function show(title,message){
		if(title){
			d.title=title;
			d.getElementById('header').innerHTML=title;
		}
		if(message)d.getElementById('message').innerHTML=message;
		d.getElementById('container').style.display='block';
	}
	function r(uri){
		show('Moved Permanently','The document has moved to <a href="'+uri+'">'+uri+'</a>.');
		// Delay is for debugging; to be removed in production.
		setTimeout(function(){location.replace(uri)},2000);
	}
	var L=location.search.substr(1).split('+')[0].match(/^L(\d+)$/);
	switch(location.pathname){
		case root+'blog.php':
			if(L){
				loadJson(root+'404/blog.json',function(err,data){
					if(!err&&data[L[1]]){
						return r('https://michaelrsweet.github.io/cups/'+data[L[1]]+'.html');
					}
				});
			}
			break;
		case root+'str.php':
			if(L){
				loadJson(root+'404/str.json',function(err,data){
					if(!err&&data[L[1]]){
						return r('https://github.com/michaelrsweet/testcups/issues/'+data[L[1]]);
					}
				});
			}
			break;
	}
	show('','The requested URL '+location.pathname+' was not found on this server.');
}();
