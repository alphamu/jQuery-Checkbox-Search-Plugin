/**
 * jQuery Checkbox Search Plugin
 * This is a plugin that lets you search an HTML document for text.
 * Check the README.txt file for instructions on how to use it.
 * and adapted to me for use like a plugin from jQuery.
 * @name jquery-checkbox-search.js
 * @author Ali Muzaffar - http://www.waddleworks.com
 * @version 1.0
 * @date Aug 12, 2008
 * @category jQuery plugin
 * @license LGPL
 */
 
var path_to_brands = ".checkbox_container span";
var charInput = 0; //if input is greater than this then
			//fetch results.
var brands = null;
var brandsMap = null;
var brandToElementMap = new Array();
var brandSuggestion = null;
var globalMatching = true; //matches anywhere in the string.
//if false, an optimization is used to match the first character and filter based on that

function MapOfArrays(){
	this.alpha = new Object();
	this.add = function(str){
		try{
		var index = (str.charAt(0)).toLowerCase();
		if(this.alpha[index] == null){
			var content = new Array(str);
			this.alpha[index] = content;
		}
		else{
			var content = this.alpha[index];
			var next = content.length;
			content[next] = str;
			this.alpha[index] = content;

		}
		return true;		
		
		}catch(err){
		  document.write(err+'<br/>');
		  return false;
		}
	}
	
	this.get = function(i){
		return this.alpha[i];
	}
	
	this.getHashMap = function(){
		return this.alpha;
	}
	
	this.print = function(){
		for(key in this.alpha){
			for(var i=0; i< this.alpha[key].length; i++){
				$(this.alpha[key]).each(function(i){
					document.write(key + " - " + this + "<br/>");
				});
			}
		}
	}
	
	this.getMatches = function(key, value){
		var result = new Array();
		var item = 0;
		
		var content = this.get(key);
		if(globalMatching) {
			for(var i = 0; i < brands.length; i++){
				var huh = brands[i];
				if(huh != null){
					var regexp = new RegExp("("+value+")","ig");
					if(huh.innerHTML.search(regexp) > -1){				
						result[item++] = new String(huh.innerHTML);
					}
				}
			}
		} else {
			for(var i = 0; i < content.length; i++){
				var brandName = new String(content[i]);
				var regexp = new RegExp("^("+value+")","i");
				if(brandName.search(regexp) > -1){				
					result[item++] = content[i];
				}
			}
		}
		
		return result;
			
	}
	
}

function matchBrands(str){
	if(str.length > charInput){
		var key = str.charAt(0).toLowerCase();
		var result = brandsMap.getMatches(key,str);
		populateSuggestionDiv(result);
	}
}

function populateSuggestionDiv(result){
	if(brandSuggestion == null)
		brandSuggestion = $("div#brandSuggestion");
	
	if(result.length > 0){
		var content = "";
		for(var i=0; i<result.length; i++){
			if(!isBrandChecked(result[i]))
				content += "<div class='option' onmouseover='changeBg(this,1);' onmouseout='changeBg(this,0)' >"+result[i]+" <a href='#' onclick='selectBrand(this,\""+result[i]+"\");return false;'>[add]</a></div>";
			else
				content += "<div class='option' onmouseover='changeBg(this,1);' onmouseout='changeBg(this,0)' >"+result[i]+" <a class='selected' href='#' onclick='selectBrand(this,\""+result[i]+"\");return false;'>[remove]</a></div>";
		}
		brandSuggestion.html(content);
		brandSuggestion.css("display","block");
	}
	else{
		brandSuggestion.css("display","none");
	}
	
}

function isBrandChecked(brand){
	var brandEle = brandToElementMap[brand];
	var cbx = $(brandEle).prev();
	var ischecked = cbx.attr("checked");
	return ischecked;
		
}

function selectBrand(caller,brand){
	var content = $(caller).html();
	var element = brandToElementMap[brand];
	if(content.indexOf("add") > -1){
		$(element).prev().attr("checked","checked");
		$(caller).addClass("selected");
		$(caller).html("[remove]");
	}
	else{
		$(element).prev().removeAttr("checked");
		$(caller).removeClass("selected");
		$(caller).html("[add]");	
	}
}

function hideSuggestions(e){
	if(brandSuggestion == null)
		brandSuggestion = $("div#brandSuggestion");
	
	brandSuggestion.css("display","none");
}

var backColor = new Array("#FFFFFF","#CCCCCC");
function changeBg(obj,color){
	$(obj).css("background-color",backColor[color]);
}

$(document).ready(function(){
	brands = $(path_to_brands);
	brandsMap = new MapOfArrays();
	brands.each(function(i){
		var text = $(brands[i]).text();
		brandsMap.add(text);
		brandToElementMap[text]=brands[i];
	});
	
	//brandsMap.print();
	
	$(document).click(function(e){
		var target = (e && e.target) || (event && event.srcElement);
		var container = $('#brandsSuggestContainer');
		var suggestDiv = $('#brandSuggestion');
		var inputEle = $('#brandsSuggestContainer input');
		var links = $('div#brandSuggestion .option a.selected');
		var callerParent = ($(target).parent())[0];
		this.exit = false;
		if(target!=container[0] && target!=suggestDiv[0] && target!=inputEle[0] && target!=links[0] && target.className != "option" && callerParent.className != 'option')
		{
			suggestDiv[0].style.display='none';
		} 
	});
});