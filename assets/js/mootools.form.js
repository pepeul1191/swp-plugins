// nombre : mootools.form.js
// version : 1.0
// dependencias : mootools-core-min.js, mootools-min.js, underscore-min.js,

IForm = new Interface("IForm", {
	Crear: function(){},
	GetHtml: function(){}
});

var InputText = new Class({
	Interfaces: [ IForm ],
	Crear: function(estilos,edicion,valor, objeto){
		if (typeof valor === 'undefined'){
			this.html = "<td title = 'text'><input type='text' id='' name='' value class='mootools' operacion='EditarInputText' objeto='" + objeto + "'  style='"+ estilos +"' "+ edicion + "></td>";
		}else{
			this.html = "<td title = 'text'><input type='text' id='' name='' value='" + valor + "' operacion='EditarInputText' class='mootools' objeto='" + objeto + "' style='"+ estilos +"' "+ edicion + "></td>";
		}
	},
	GetHtml: function(){
		return this.html;
	}
});

var Label = new Class({
	Interfaces: [ IForm ],
	Crear: function(estilos, valor){
		if(typeof valor === 'undefined'){valor = ' ';}
       if(typeof clase === 'undefined'){clase= ' ';}
       this.html = "<td  title = 'label' style='"+estilos+"'><label>"+ valor +"</label></td>";
	},
	GetHtml: function(){
		return this.html;
	}
});

var LabelId = new Class({
	Interfaces: [ IForm ],
	Crear: function(estilos, valor){
		if(typeof valor === 'undefined'){valor = ' ';}
       if(typeof clase === 'undefined'){clase= ' ';}
       this.html = "<td  title = 'label_id' style='"+estilos+"'><label>"+ valor +"</label></td>";
	},
	GetHtml: function(){
		return this.html;
	}
});

var Checkbox = new Class({
	Interfaces: [ IForm ],
	Crear: function(estilos, valor, objeto){
		if(typeof valor === 'undefined'){valor = ' ';}else if(valor == true || valor == "true"){valor = "checked"}else if(valor == false || valor == "false"){valor = ""}
        if(typeof estilos === 'undefined'){estilos= ' ';}
        this.html = "<td style='" + estilos + "' title='checkbox'><input class='mootools' type='checkbox' operacion='EditarInputCheck' objeto='" + objeto + "'" + valor + "/></td>";
	},
	GetHtml: function(){
		return this.html;
	}
});

var CheckboxReadOnly = new Class({
	Interfaces: [ IForm ],
	Crear: function(estilos, valor, objeto){
		if(typeof valor === 'undefined'){valor = ' ';}else if(valor == true || valor == "true"){valor = "checked"}else if(valor == false || valor == "false"){valor = ""}
        if(typeof estilos === 'undefined'){estilos= ' ';}
        var name_for = "cb_" + _.random(0, 1000);
        this.html = "<td style='" + estilos + "' title='checkbox'><input disabled readonly class='mootools' type='checkbox' id='" + name_for + "' operacion='EditarInputCheck' name='" + name_for + "' objeto='" + objeto + "'" + valor + "/><label for='" + name_for + "'><span></span></label></td>";
	},
	GetHtml: function(){
		return this.html;
	}
});

var Button = new Class({
	Interfaces: [ IForm ],
	//Button(array_json_btn[i].label, array_json_btn[i].icono, array_json_btn[i].operacion);
	Crear: function(label, icono, operacion, clase, objeto){
		if(typeof label === 'undefined'){valor = ' ';}
       if(typeof icono === 'undefined'){clase= ' ';}
       if(typeof operacion === 'undefined'){clase= ' ';}
       if(typeof clase === 'undefined'){clase= ' ';}
       this.html = "<button class= 'btn " + clase + "' operacion= '" + operacion +"' objeto='" + objeto + "'> <i class='" +icono + "' style='margin-right:5px' ></i>" + label + "</button>";
       //var boton = "<b title='Agregar Registro' class='btn-small boton-tabla mootools' href='#' style='margin-left:10px;' operacion=" + operacion + "><i class='fa fa-plus' style='margin-right: 5px;'></i>Agregar Registro</b>";
	},
	GetHtml: function(){
		return this.html;
	}
});

var ButtonHRef = new Class({
	Interfaces: [ IForm ],
	//Button(array_json_btn[i].label, array_json_btn[i].icono, array_json_btn[i].operacion);
	Crear: function(label, icono, operacion, clase, objeto, link){
		if(typeof label === 'undefined'){valor = ' ';}
       if(typeof icono === 'undefined'){clase= ' ';}
       if(typeof operacion === 'undefined'){clase= ' ';}
       if(typeof clase === 'undefined'){clase= ' ';}
       this.html = "<a href='" + link + "' class= 'btn " + clase + "' objeto='" + objeto + "'> <i class='" +icono + "' style='margin-right:5px' ></i>" + label + "</a>";
       //var boton = "<b title='Agregar Registro' class='btn-small boton-tabla mootools' href='#' style='margin-left:10px;' operacion=" + operacion + "><i class='fa fa-plus' style='margin-right: 5px;'></i>Agregar Registro</b>";
	},
	GetHtml: function(){
		return this.html;
	}
});

var Select = new Class({
	Interfaces: [ IForm ],
	//Button(array_json_btn[i].label, array_json_btn[i].icono, array_json_btn[i].operacion);
	Crear: function(estilos, options, valor, objeto){
		this.html = "<td style='" + estilos + "' title='select'><select class='mootools' objeto='" + objeto + "' operacion='SeleccionarOption'>";
		for(var k=0; k < options.length; k = k + 1){
			if(options[k].id == valor){
				this.html = this.html + "<option value='" + options[k].id + "' selected >" + options[k].nombre + "</option>";
			}else{
				this.html = this.html + "<option value='" + options[k].id + "'>" + options[k].nombre + "</option>";
			}
		}
		this.html = this.html + "</select></td>";
	},
	GetHtml: function(){
		return this.html;
	}
});


var BotonesFila = new Class({
	Interfaces: [ IForm ],
	Crear: function(array_json_btn_td, estilos, objeto, id_fila){
		var botones_html = "<td title = 'botonesTd' style='"+ array_json_btn_td[0].estilos + "'>" ;

		for( var i = 0; i < array_json_btn_td.length; i++){
			//console.log(array_json_btn_td[i]);
			if(array_json_btn_td[i].operacion == 'SeleccionarArchivoFila'){
				//alert('SeleccionarArchivoFila');
       	var temp = "<input type='file' id='" + objeto + "_file_" + id_fila + "' name='myFile' type='file' style='display:none'/>";
       	var boton = temp + "<b operacion = '" + array_json_btn_td[i].operacion + "' objeto='" + objeto +"' class='mootools'><a title = '" + array_json_btn_td[i].alt + "' class = 'boton-tabla-td ' href = '" + array_json_btn_td[i].url + "' ><i class='" + array_json_btn_td[i].clase + "'></i></a></b>";
				botones_html = botones_html + boton;
       }else if(typeof array_json_btn_td[i].href === 'undefined'){
       		var boton = "<b operacion = '" + array_json_btn_td[i].operacion + "' objeto='" + objeto +"' class='mootools'><a title = '" + array_json_btn_td[i].alt + "' class = 'boton-tabla-td ' href = '" + array_json_btn_td[i].url + "' ><i class='" + array_json_btn_td[i].clase + "'></i></a></b>";
				botones_html = botones_html + boton;
       }else{
				var boton_href = "<a title = '" + array_json_btn_td[i].alt + "' class = 'boton-tabla-td ' href = '" + array_json_btn_td[i].href + id_fila + "' ><i class='" + array_json_btn_td[i].clase + "'></i></a>";
				//console.log(array_json_btn_td[i]);
				botones_html = botones_html + boton_href;
			}
		}

		this.html = botones_html + "</td>";
	},
	GetHtml: function(){
		return this.html;
	}
});

var TablaAutocomplete = new Class({
	Interfaces: [ IForm ],
	//Button(array_json_btn[i].label, array_json_btn[i].icono, array_json_btn[i].operacion);
	Crear: function(estilos,edicion,datos, objeto, randito_id){
		 var rpta = "<td style='" + estilos + "' title='autocomplete'>";

		if (typeof datos === 'undefined'){
			rpta = rpta + "<label class='oculto' id='id_sugerencia_"+ randito_id + "'></label><input style='" + estilos + "' type='text' class='mootools' id='valor_sugerencia_" + randito_id  + "' placeholder='' operacion='EscribirAutoCompleteTabla' objeto='" + objeto + "' objeto_autocomplete='objeto_" + randito_id + "'><div style='position:relative;'><ul id='ul_sugerencia_" + randito_id + "' class='oculto sugerencia-contenedor'></ul></div>";
		}else{
			rpta = rpta + "<label class='oculto' id='id_sugerencia_"+ randito_id + "'>" + datos.llave + "</label><input style='" + estilos + "' type='text' class='mootools' id='valor_sugerencia_" + randito_id  + "' placeholder='' operacion='EscribirAutoCompleteTabla' objeto='" + objeto + "' objeto_autocomplete='objeto_" + randito_id + "' value='" + datos.valor + "'><div style='position:relative;'><ul id='ul_sugerencia_" + randito_id + "' class='oculto sugerencia-contenedor'></ul></div>";
		}

		this.html = rpta + "</td>";
	},
	GetHtml: function(){
		return this.html;
	}
});
