
function listSearch(){

	var resultArray = [];
	var xobj = new XMLHttpRequest();

    xobj.overrideMimeType("application/json");
    xobj.open("GET", JSON_FILE, true);
    xobj.onreadystatechange = function(responseText){
        if(xobj.readyState == 4 && xobj.status == "200"){
            var data = JSON.parse(xobj.responseText).data;
            var tpl = '<div class="flex-container">';
            for(var i = 0 ; i < 9 ; i++){
                tpl += '<article class="flex-item"><div class="square">';
                    if( (i > 0) && (i % 2 == 0) )
                        tpl += '<p class="main">' + data[i].title + '</p>';
                    else
                        tpl += '<p class="no-main">' + data[i].title + '</p>';
                    
                tpl += '</div>';
                tpl += '<h3>'+ data[i].title + '</h3>';
                tpl += '<p class="teaser">' + data[i].teaser + '</p></article>';
            }
            tpl += '</div>';
            document.getElementById("main").innerHTML = tpl ;
        }
    }
    xobj.send(null);
};	

