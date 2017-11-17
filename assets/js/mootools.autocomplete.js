// nombre : mootools.grid.js
// version : 1.0
// dependencias : mootools-core-min.js, mootools-min.js, underscore-min.js, jquery.min.js, mootools.dao.js

IAutocompletePlan = new Interface( "IAutocompletePlan", {
    SetUrl: function(url) {},
    SetUlSugerencia: function(id_ul_sugerencia) {},
    SetDestinoIdSugerencia: function(id_sugerencia_id) {},
    SetDestinoValorSugerencia: function(id_sugerencia_valor) {},
    SetIndices: function(llave, valor) {},
    SetNombreObjeto: function(nombre) {},
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
    SetNombreObjeto: function(nombre) {
        this.nombre = nombre;
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
    EjecutarOperacion: function(operacion, thisDOM, objetos) {
        //implementación de IChainOperacion
        if(operacion == "EscribirAutoComplete"){
          var objeto = objetos[0];
        	var valor_escrito = $(objeto.id_sugerencia_valor).val();
		   $.ajax({
		       type: "GET",
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
		          	var temp = "<li><label class='oculto'>" + id + "</label><label class='mootools' operacion='clickSugerenciaAutocomplete' objeto_autocomplete='" + objeto.nombre + "'>" + data[i][objeto.valor] + "</label></li>";
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
              //console.log("Operación no implementada");
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
          var objeto = eval(thisDOM.attr("objeto_autocomplete"));
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
              //console.log("Operación no implementada");
           }
        }
    }
});

var EscribirAutoCompleteTabla = new Class({
    Interfaces: [ IChainOperacion ],
    SetearSiguienteInstancia: function(instancia){
        //implementación de IChainOperacion
        this.siguiente_instancia = instancia;
    },
    SiguienteEslabon: function(operacion, thisDOM, objeto) {
        //implementación de IChainOperacion
        this.siguiente_instancia.EjecutarOperacion(operacion, thisDOM, objeto);
    },
    EjecutarOperacion: function(operacion, thisDOM, objetos) {
        //implementación de IChainOperacion
        if(operacion == "EscribirAutoCompleteTabla"){
          var objeto_autocomplete = objetos[0];
          var objeto = objetos[1];
          var valor_escrito = $(objeto_autocomplete.id_sugerencia_valor).val();

         $.ajax({
             type: "GET",
             //url: parametros['url'] + "?distrito=" + JSON.stringify(data) ,
             url: objeto_autocomplete.url + valor_escrito,
             data:"",
             async: false,
             success: function(data) {
                data = JSON.parse(data);
                var lis = "";
                $(objeto_autocomplete.id_ul_sugerencia).empty();
                          objeto_autocomplete.datos_seleccion = data;
                for(var i = 0; i < data.length ; i++){
                               //console.log(data[i]);
                               if( objeto_autocomplete.llave == "object_id"){
                                    var id = data[i]["_id"]["$oid"];
                               }else{
                                    var id = data[i][objeto_autocomplete.llave];
                               }
                  var temp = "<li><label class='oculto'>" + id + "</label><label class='mootools' objeto='" + objeto.objeto + "' operacion='clickSugerenciaAutocompleteTabla' objeto_autocomplete='objeto_" + objeto_autocomplete.nombre + "'>" + data[i][objeto_autocomplete.valor] + "</label></li>";
                  lis = lis + temp;
                }
                $(objeto_autocomplete.id_ul_sugerencia).removeClass("oculto");
                $(objeto_autocomplete.id_ul_sugerencia).append(lis);
                //console.log(temp);
                return false;
             }
          });

        }else{
             try {
              this.SiguienteEslabon(operacion, thisDOM, objeto);
           }catch(error){
              //console.log("Operación no implementada");
           }
        }
    }
});

var clickSugerenciaAutocompleteTabla = new Class({
    Interfaces: [ IChainOperacion ],
    SetearSiguienteInstancia: function(instancia){
        //implementación de IChainOperacion
        this.siguiente_instancia = instancia;
    },
    SiguienteEslabon: function(operacion, thisDOM, objeto) {
        //implementación de IChainOperacion
        this.siguiente_instancia.EjecutarOperacion(operacion, thisDOM, objeto);
    },
    EjecutarOperacion: function(operacion, thisDOM, objetos) {
        var objeto_autocomplete = objetos[0];
        var objeto = objetos[1];
        //implementación de IChainOperacion
        if(operacion == "clickSugerenciaAutocompleteTabla"){
          var objeto = eval(thisDOM.attr("objeto"));
          var id = $(thisDOM.parent().children()[0]).html();

          $(objeto_autocomplete.id_sugerencia_id).html(id);
          $(objeto_autocomplete.id_sugerencia_valor).val( thisDOM.html() );
          $(objeto_autocomplete.id_ul_sugerencia).empty();
          $(objeto_autocomplete.id_ul_sugerencia).addClass("oculto");

          if (objeto_autocomplete.funcion_adicional != ""){
              for(var k = 0; k < objeto_autocomplete.datos_seleccion.length; k++){
                  if( objeto_autocomplete.llave == "object_id"){
                      var id_temp = objeto_autocomplete.datos_seleccion[k]["_id"]["$oid"];
                  }else{
                      var id_temp = objeto_autocomplete.datos_seleccion[k][objeto_autocomplete.llave];
                  }
              }
          }

          var id_fila = $(objeto_autocomplete.id_sugerencia_id).parent().parent().children().eq(0).children().eq(0).html();
          var id_tabla =  $(objeto_autocomplete.id_sugerencia_id).parent().parent().parent().parent().attr("id");
            //console.log(id_tabla);console.log(id_fila);console.log(id_fila.indexOf(id_tabla));
          if(id_fila.indexOf(id_tabla) > -1){
                //console.log("es una fila nueva");
            var tipo_arreglo = "nuevo";
          }else{
                //console.log("es una fila editada");
            var tipo_arreglo = "editado";
          }

           ObservadorConcreto.NotificarObservadores(objeto.observador, tipo_arreglo, id_fila);
        }else{
             try {
              this.SiguienteEslabon(operacion, thisDOM, objeto);
           }catch(error){
              //console.log("Operación no implementada");
           }
        }
    }
});

 $(document).on("click", ".mootools", function(event) {
    var objeto = eval(this.get("objeto"));// esta objeto se usa cuando el autocomplete sólo esta dentro de una tabla
    if(objeto == null){
      //FORMULARIO
      //alert("FORMULARIO");
      var objeto_autocomplete = eval(this.get("objeto_autocomplete"));
      var eslabon_1 = new clickSugerenciaAutocomplete();
      var operacion = this.get("operacion"); //console.log(operacion);
      eslabon_1.EjecutarOperacion(operacion, $(event.currentTarget), objeto_autocomplete);
    }else{
      // TABLA
        //alert("TABLA");
        objeto.handler_object = JSON.parse(JSON.stringify(objeto.handler_object));
        const temp = $(this).attr("objeto_autocomplete");
        var objeto_autocomplete = objeto.handler_object[temp];
        var eslabon_1 = new clickSugerenciaAutocompleteTabla();
        var operacion = this.get("operacion"); //console.log(operacion);

        eslabon_1.EjecutarOperacion(operacion, $(event.currentTarget), [objeto_autocomplete, objeto]);
    }
});

$(document).on("keyup", ".mootools", function(event) {
    var objeto = eval(this.get("objeto")); // esta objeto se usa cuando el autocomplete sólo esta dentro de una tabla
    if(objeto == null){
        //FORMULARIO
        var objeto_autocomplete = eval(this.get("objeto_autocomplete"));
        var eslabon_1 = new EscribirAutoComplete();
        var operacion = this.get("operacion"); //console.log(operacion);
        eslabon_1.EjecutarOperacion(operacion, $(event.currentTarget), [objeto_autocomplete, objeto]);
    }else{
        // TABLA
        objeto.handler_object = JSON.parse(JSON.stringify(objeto.handler_object));
        const temp = $(this).attr("objeto_autocomplete");
        var objeto_autocomplete = objeto.handler_object[temp];
        var eslabon_1 = new EscribirAutoCompleteTabla();
        var operacion = this.get("operacion"); //console.log(operacion);

        eslabon_1.EjecutarOperacion(operacion, $(event.currentTarget), [objeto_autocomplete, objeto]);
    }
});
