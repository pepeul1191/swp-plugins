// nombre : mootools.dao.js
// version : 1.0
// dependencias : mootools-core-min.js, mootools-min.js, mootools-interfaces.js, underscore-min.js, jquery.min.js

IAjax = new Interface( "IAjax", {
	Constructor: function(ajax_type, ajax_url, ajax_data, ajax_async){},
	GetRespuesta: function() {}
});

var AjaxRuby = new Class({
    Interfaces: [ IAjax ],
    Constructor: function(ajax_type, ajax_url, ajax_data, ajax_async){
    	 var rpta = null;
    	 $.ajax({
			type: ajax_type,
			url: ajax_url,
			data: "data=" + ajax_data,
			async: ajax_async,
			success:function(data){
				//data = JSON.parse(data);
				if(jQuery.isEmptyObject(data)){
					console.log("esta vacío");
				}else{
					var array_rpta = [];
					for(var i = 0; i < data.length; i++){
						array_rpta.push(data[i]);
					}
					rpta = array_rpta;
				}
				rpta = data;
			}
		});
    	this.ajax_rpta_data = rpta;
    },
	GetRespuesta: function() {
		return this.ajax_rpta_data;
	}
});

var AjaxPython = new Class({
    Interfaces: [ IAjax ],
    Constructor: function(ajax_type, ajax_url, ajax_data, ajax_async){
    	 var rpta = null;
    	 $.ajax({
			type: ajax_type,
			url: ajax_url,
			data: "data="+ajax_data,
			async: ajax_async,
			success:function(data){
				data = JSON.parse(data);
				if(jQuery.isEmptyObject(data)){
					console.log("esta vacío");
				}else{
					var array_rpta = [];
					for(var i=0; i<data.length; i++){
						//console.log(data[i]);
						array_rpta.push(data[i]);
					}
					rpta = array_rpta;
					//console.log(rpta);
				}
			}
		});
    	//console.log(rpta);
    	this.ajax_rpta_data = rpta;
    },
	GetRespuesta: function() {
		return this.ajax_rpta_data;
	}
});

var AjaxPadrinoPython = new Class({
    Interfaces: [ IAjax ],
    Constructor: function(ajax_type, ajax_url, ajax_data, ajax_async){
    	 var rpta = null;
    	 $.ajax({
			type: ajax_type,
			url: ajax_url,
			data: "data=" + ajax_data,
			async: ajax_async,
			success:function(data){
				data = JSON.parse(JSON.parse(data));
				if(jQuery.isEmptyObject(data)){
					console.log("esta vacío");
				}else{
					rpta = data;
				}
			}
		});
    	//console.log(rpta);
    	this.ajax_rpta_data = rpta;
    },
	GetRespuesta: function() {
		return this.ajax_rpta_data;
	}
});

var AjaxPHP = new Class({
    Interfaces: [ IAjax ],
    Constructor: function(ajax_type, ajax_url, ajax_data, ajax_async){
    	 var rpta = null;
    	 $.ajax({
			type: ajax_type,
			url: ajax_url,
			data: "data=" + ajax_data,
			async: ajax_async,
			success:function(data){
				console.log(data);
				data = JSON.parse(JSON.parse(data));
				if(jQuery.isEmptyObject(data)){
					console.log("esta vacío");
				}else{
					var array_rpta = [];
					for(var i=0; i<data.length; i++){
						array_rpta.push(data[i]);
					}
					rpta = array_rpta;
					//console.log(rpta);
				}
			}
		});
    	//console.log(rpta);
    	this.ajax_rpta_data = rpta;
    },
	GetRespuesta: function() {
		return this.ajax_rpta_data;
	}
});