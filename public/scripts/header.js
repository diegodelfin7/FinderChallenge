function enabledInput(value){
	var element = document.getElementById("btnSearch");
	if(value.length > 2){
		element.disabled = false;
	} else {
		if(value.length == 0){
			listSearch();
		}
		element.disabled = true;
	}
}

function initInputAwesomplete(){

	var xobj = new XMLHttpRequest();

    xobj.overrideMimeType("application/json");
    xobj.open("GET", JSON_FILE, true);
    xobj.onreadystatechange = function(responseText){
        if(xobj.readyState == 4 && xobj.status == "200"){
            var data = JSON.parse(xobj.responseText).data;
			var list = _.pluck(data, 'title');
			var input = document.getElementById("searchInputText");
			new Awesomplete(input , {
				list,
				minChars : 3,
				maxItems : 7
			});
        }
    };
    xobj.send(null);
	
}

function submitForm(evt){
	evt.preventDefault();

	var inputValue = document.getElementById("searchInputText").value;
	if(inputValue.length > 2){
		var resultArray = [];
		var xobj = new XMLHttpRequest();

	    xobj.overrideMimeType("application/json");
	    xobj.open("GET", JSON_FILE, true);
		xobj.onreadystatechange = function(responseText){
	        if(xobj.readyState == 4 && xobj.status == "200"){
	            
	            var data = JSON.parse(xobj.responseText).data;
	            data.forEach(function(item) {
					var str = item.title.toLowerCase();
					if(str.indexOf(inputValue.toLowerCase()) != -1){
						resultArray.push(item);
					}
				});

	            if(resultArray.length > 0){
		            var tpl = '<div class="flex-container">';
		            for(var i = 0 ; i < resultArray.length ; i++){
		                tpl += '<article class="flex-item"><div class="square">';
		                    if( (i > 0) && (i % 2 == 0) )
		                        tpl += '<p class="main">' + resultArray[i].title + '</p>';
		                    else
		                        tpl += '<p class="no-main">' + resultArray[i].title + '</p>';
		                    
		                tpl += '</div>';
		                tpl += '<h3>'+ resultArray[i].title + '</h3>';
		                tpl += '<p class="teaser">' + resultArray[i].teaser + '</p></article>';   
		            }
	            	tpl += '</div>';
	            	document.getElementById("main").innerHTML = tpl ;
		        }else{
	            	document.getElementById("main").innerHTML = '<h4>No se encontraron titulos de su busqueda</h4>' ;
		        }
	        }
	    }
	    xobj.send(null);
	}

    return false;
}



