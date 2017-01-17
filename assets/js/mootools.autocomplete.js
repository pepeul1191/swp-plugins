// nombre : mootools.grid.js
// version : 1.0
// dependencias : mootools-core-min.js, mootools-min.js, underscore-min.js, jquery.min.js, mootools.dao.js

IAutocompletePlan = new Interface( "IAutocompletePlan", {
    SetUrl: function(url) {},
    SetUlSugerencia: function(id_ul_sugerencia) {},
    SetDestinoIdSugerencia: function(id_sugerencia_id) {},
    SetDestinoValorSugerencia: function(id_sugerencia_valor) {},
    SetIndices: function(llave, valor) {},
    SetFuncionAdicional: function(funcion_adicional){}
});

var Autocomplete = new Class({
    Interfaces: [ IAutocompletePlan ], 
    SetUrl: function(url) {
        this.url = url;
    },
    SetUlSugerencia: function(id_ul_sugerencia) {
        this.id_ul_sugerencia = "#" + id_ul_sugerencia;
    },
    SetDestinoIdSugerencia: function(id_sugerencia_id) {
        this.id_sugerencia_id = "#" + id_sugerencia_id;
    },
    SetDestinoValorSugerencia: function(id_sugerencia_valor) {
        this.id_sugerencia_valor = "#" + id_sugerencia_valor;
    },
    SetIndices: function(llave, valor) {
        this.llave = llave;
        this.valor = valor;
    },
    SetFuncionAdicional: function(funcion_adicional){
        this.funcion_adicional = funcion_adicional;
        this.datos_seleccion = null;
    }
});

var EscribirAutoComplete = new Class({
    Interfaces: [ IChainOperacion ],
    SetearSiguienteInstancia: function(instancia){
        //implementación de IChainOperacion
        this.siguiente_instancia = instancia;
    },
    SiguienteEslabon: function(operacion, thisDOM, objeto) {
        //implementación de IChainOperacion
        this.siguiente_instancia.EjecutarOperacion(operacion, thisDOM, objeto);
    }, 
    EjecutarOperacion: function(operacion, thisDOM, objeto) {
        //implementación de IChainOperacion
        if(operacion == "EscribirAutoComplete"){
        	var valor_escrito = $(objeto.id_sugerencia_valor).val();
		   $.ajax({
		       type: "POST",
		       //url: parametros['url'] + "?distrito=" + JSON.stringify(data) ,
		       url: objeto.url + valor_escrito,
		       data:"",
		       async: false,
		       success: function(data) {
		          data = JSON.parse(data);
		          var lis = "";
		          $(objeto.id_ul_sugerencia).empty();
                        objeto.datos_seleccion = data;
		          for(var i = 0; i < data.length ; i++){
                             //console.log(data[i]);
                             if( objeto.llave == "object_id"){
                                  var id = data[i]["_id"]["$oid"];
                             }else{
                                  var id = data[i][objeto.llave];
                             }
		          	var temp = "<li><label class='oculto'>" + id + "</label><label class='mootools' operacion='clickSugerenciaAutocomplete' objeto='" + objeto.nombre_objeto + "'>" + data[i][objeto.valor] + "</label></li>";
		          	lis = lis + temp;
		          }
		          $(objeto.id_ul_sugerencia).removeClass("oculto");
		          $(objeto.id_ul_sugerencia).append(lis);
		          //console.log(temp);
		          return false;                                          
		       }
		    });
        }else{
             try {
              this.SiguienteEslabon(operacion, thisDOM, objeto);
           }catch(error){
              console.log("Operación no implementada");
           }
        }
    }
});

var clickSugerenciaAutocomplete = new Class({
    Interfaces: [ IChainOperacion ],
    SetearSiguienteInstancia: function(instancia){
        //implementación de IChainOperacion
        this.siguiente_instancia = instancia;
    },
    SiguienteEslabon: function(operacion, thisDOM, objeto) {
        //implementación de IChainOperacion
        this.siguiente_instancia.EjecutarOperacion(operacion, thisDOM, objeto);
    }, 
    EjecutarOperacion: function(operacion, thisDOM, objeto) {
        //implementación de IChainOperacion
        if(operacion == "clickSugerenciaAutocomplete"){
        	var objeto = eval( thisDOM.parent().parent().parent().children(0)[0].get("objeto") );
           var id = $(thisDOM.parent().children()[0]).html();
		   $(objeto.id_sugerencia_id).html(id); 
		   $(objeto.id_sugerencia_valor).val( thisDOM.html() );
		   $(objeto.id_ul_sugerencia).empty();
		   $(objeto.id_ul_sugerencia).addClass("oculto");
           if (objeto.funcion_adicional != ""){
               for(var k = 0; k < objeto.datos_seleccion.length; k++){
                   if( objeto.llave == "object_id"){
                      var id_temp = objeto.datos_seleccion[k]["_id"]["$oid"];
                  }else{
                      var id_temp = objeto.datos_seleccion[k][objeto.llave];
                   }
                   if(id == id_temp){
                      objeto.funcion_adicional(objeto.datos_seleccion[k]);
                   }
               }
           }
        }else{
             try {
              this.SiguienteEslabon(operacion, thisDOM, objeto);
           }catch(error){
              console.log("Operación no implementada");
           }
        }
    }
});

 $(document).on("click", ".mootools", function() {
    var objeto = eval(this.get("objeto"));
    var eslabon_1 = new clickSugerenciaAutocomplete();
    var operacion = this.get("operacion"); //console.log(operacion);
    eslabon_1.EjecutarOperacion(operacion, $(this), objeto);
});

$(document).on("keyup", ".mootools", function(event) {
  var objeto = eval(this.get("objeto"));
  var eslabon_1 = new EscribirAutoComplete();
  var operacion = this.get("operacion"); //console.log(operacion);
  eslabon_1.EjecutarOperacion(operacion, $(event.currentTarget), objeto);
});