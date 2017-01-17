 // nombre : mootools.chain.js
// version : 1.0
// dependencias : mootools-core-min.js, mootools-min.js, underscore-min.js, jquery.min.js

 IChainOperacion = new Interface( "IChainOperacion", { 
    SetearSiguienteInstancia: function(instancia){},
    SiguienteEslabon: function(operacion, obj_query_event, objeto) {}, 
    EjecutarOperacion: function(operacion, obj_query_event, objeto) {}
}); 

var AgregarFila = new Class({
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
        if(operacion == "AgregarFila"){
            //console.log("Debería agregar una fila"); console.log(objeto);
            var array_json_td = objeto.array_json_td;
            var array_json_th = objeto.array_json_th;
            var nueva_fila = "<tr>";

            for( var k = 0; k < array_json_th.length; k++){
                 var index_td = array_json_td[k].index;
                 var tipo_form = array_json_td[k].tipo; 
                 //console.log(array_json_td[k].tipo); //console.log(index_td); //console.log(valor_ajax_dao);
                 switch(tipo_form) {
                     case "text":
                         //console.log("tenemos un texto");
                         var input_text = new InputText();
                         var estilos = array_json_td[k].estilos;
                         var edicion = array_json_td[k].edicion;
                         var valor = "";
                         input_text.Crear(estilos,edicion,valor, objeto.objeto); //console.log(input_text.GetHtml());
                         nueva_fila = nueva_fila + input_text.GetHtml();
                         break;
                     case "label":
                         //console.log("tenemos un label");
                         var label = new Label();
                         var titulo_th = array_json_th[k].titulo;
                         var estilos = array_json_td[k].estilos;
                         var valor = "";

                         if(titulo_th == "id"){
                            valor = objeto.id_dom.substring(1) + "_"+ _.random(0, 1000);
                         }

                         label.Crear(estilos, valor, objeto);//console.log(label.GetHtml());
                         nueva_fila = nueva_fila + label.GetHtml();
                         break;
                      case "label_id":
                         //console.log("tenemos un label");
                         var label = new LabelId();
                         var titulo_th = array_json_th[k].titulo;
                         var estilos = array_json_td[k].estilos;
                         var valor = "";

                         if(titulo_th == "id"){
                            valor = objeto.id_dom.substring(1) + "_"+ _.random(0, 1000);
                         }

                         label.Crear(estilos, valor, objeto);//console.log(label.GetHtml());
                         nueva_fila = nueva_fila + label.GetHtml();
                         break;
                      case "label_id_mongo":
                         //console.log("tenemos un label");
                         var label_id_mongo = new LabelId();
                         var estilos = array_json_td[k].estilos;
                         var titulo_th = array_json_th[k].titulo;
                         
                         if(titulo_th == "id"){
                            valor = objeto.id_dom.substring(1) + "_"+ _.random(0, 1000);
                         }

                         label_id_mongo.Crear(estilos, valor, index_td);//console.log(label.GetHtml());
                         nueva_fila = nueva_fila + label_id_mongo.GetHtml();
                         break;
                     case "botones":
                         var botones_fila = new BotonesFila();
                         var estilos = array_json_td[k].estilos;
                         
                         botones_fila.Crear(objeto.array_json_btn_td, estilos, this.objeto); //console.log(botones_fila.GetHtml());
                         nueva_fila = nueva_fila + botones_fila.GetHtml();
                         break;
                      case "select":
                         var select = new Select();
                         var estilos = array_json_td[k].estilos;
                         var options = JSON.parse(array_json_td[k].options.ajax_rpta_data);
                         var valor = null; 

                         select.Crear(estilos, options, valor, this.objeto); 
                         nueva_fila = nueva_fila + select.GetHtml();
                         break;
                     default:
                        console.log("SetTableBody:'" + tipo_form + "' no tiene una implementación.");
                        break;
                 }    
            }

            nueva_fila = nueva_fila + "</tr>";
            //console.log(nueva_fila);
            $(objeto.id_dom + " tbody").append(nueva_fila);
        }else{
           try {
              this.SiguienteEslabon(operacion, thisDOM, objeto);
           }catch(error){
              console.log("Operación no implementada");
           }
        }
    }
});

var QuitarFila = new Class({
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
        if(operacion == "QuitarFila"){
            //console.log("Debería quitar una fila");
            var id_fila = thisDOM[0].getParent().getParent().getChildren()[0].getChildren().get('html')[0];
            var tipo_arreglo = "eliminado";
            var id_tabla =  thisDOM[0].getParent().getParent().getParent().getParent().get('id');
            var fila =  thisDOM[0].getParent().getParent();
            fila.remove();
            ObservadorConcreto.NotificarObservadores(objeto.observador, tipo_arreglo, id_fila);
            console.log("paso!!!");
        }else{
             try {
              this.SiguienteEslabon(operacion, thisDOM, objeto);
           }catch(error){
              console.log("Operación no implementada");
           }
        }
    }
});

var EditarFila = new Class({
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
        if(operacion == "EditarFila"){
            console.log("Debería editar una fila");
        }else{
             try {
              this.SiguienteEslabon(operacion, thisDOM, objeto);
           }catch(error){
              console.log("Operación no implementada");
           }
        }
    }
});

var AccionURL = new Class({
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
        if(operacion == "AccionURL"){
            //console.log("Debería quitar una fila");
            var id_fila = thisDOM[0].getParent().getParent().getChildren()[0].getChildren().get('html')[0];
            var url =  thisDOM[0].getChildren()[0].get('href');

            //console.log(id_fila); console.log(url);
            window.location.href = url + id_fila;
            event.preventDefault();

        }else{
             try {
              this.SiguienteEslabon(operacion, thisDOM, objeto);
           }catch(error){
              console.log("Operación no implementada");
           }
        }
    }
});

 var IrURL = new Class({
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
        if(operacion == "IrURL"){
            //console.log("Debería ir a una url");
            var url =  thisDOM[0].getChildren()[0].get('href');

            window.location.href =  objeto.url_nuevo;
            event.preventDefault();

        }else{
             try {
              this.SiguienteEslabon(operacion, thisDOM, objeto);
           }catch(error){
              console.log("Operación no implementada");
           }
        }
    }
});

var EditarInputText = new Class({
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
        //console.log("EditarInputText");
        if(operacion == "EditarInputText"){
            var id_fila = thisDOM.parent().parent().children(0).children(0).html();
            var id_tabla =  thisDOM.parent().parent().parent().parent().attr("id");
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
              console.log("Operación no implementada");
           }
        }
    }
});

 var GuardarTabla = new Class({
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
        if(operacion == "GuardarTabla"){
           //GENERAR UN OBJETO A ENVIAR POR AJAX QUE TENGA LOS OBJETOS EDITADOS; NUEVOS y ELIMINADOS EN FUNCION A "array_json_td"
           var tabla_actual = objeto.id_dom.substring(1);
           var objeto_observado;
           for( var k = 0 ; k < ObservadorConcreto.observador_array.length ; k++){
               if(ObservadorConcreto.observador_array[k].tabla_observada == tabla_actual){
                   objeto_observado = ObservadorConcreto.observador_array[k];
               }  
           }
           //console.log(objeto_observado); //return false; 
           var arreglo_nuevos = [];            var arreglo_editados = [];           var arreglo_eliminados = []; 
           for(var k = 0; k < $(objeto.id_dom).children("tbody").children().length; k++){
               var fila = $(objeto.id_dom).children("tbody").children()[k];
               for(var i = 0; i < $(fila).children().length; i++){
                   var titulo_td = $($(fila).children()[i]).attr("title");
                   var id = $($(fila).children()[i]).children().html();
                   if(titulo_td == "label_id" || titulo_td == "label_id_mongo"){
                      //console.log("XDXFAFASDFADSF");
                       if (_.contains(objeto_observado.arreglo_editados, id)){
                          var fila_editado = $($(fila).children()[i]).parent();
                          //console.log("EDITADO");
                          var temp = this.GenerarObjetoJSON(fila_editado, objeto.array_json_th);
                          arreglo_editados.push(temp);
                       }
                       if (_.contains(objeto_observado.arreglo_nuevos, id)){
                           var fila_nueva = $($(fila).children()[i]).parent();
                          //console.log("NUEVO");
                          var temp = (this.GenerarObjetoJSON(fila_nueva, objeto.array_json_th));
                          arreglo_nuevos.push(temp);
                       }
                   }
               }
           }
           //console.log("arreglo_nuevos");console.log(arreglo_nuevos);console.log("arreglo_editados");console.log(arreglo_editados);console.log("arreglo_eliminados");console.log(arreglo_eliminados);
           //ENVIARLOS POR AJAX
           if(arreglo_nuevos.length == 0 && arreglo_editados.length == 0 && objeto_observado.arreglo_eliminados.length == 0){
               //alert("No ha ejecutado cambios en la tabla");
               $(objeto.id_label_mensaje).html("No ha ejecutado cambios en la tabla");
               $(objeto.id_label_mensaje).removeClass("oculto");
               $(objeto.id_label_mensaje).addClass("color-warning");
           }else{
               //console.log(array_json_datos_ajax);  //esto es para comprobar el formato a enviar
               var ajax_tabla = new AjaxRuby();
               //console.log(objeto.array_extra_data == null);
               //console.log(objeto);
               if (objeto.array_extra_data == null){
                  var json_datos = {
                       nuevos: arreglo_nuevos,
                       editados: arreglo_editados,
                       eliminados: objeto_observado.arreglo_eliminados
                    };
                   var data = JSON.stringify(json_datos);
                   //ajax_tabla.Constructor("POST", objeto.url_guardar + json_parse , "", false);
                   ajax_tabla.Constructor("POST", objeto.url_guardar , data, false);
                   //console.log(objeto.url_guardar + json_parse);
               }else{
                   var json_extra_data = {};
                   for(var t = 0; t < objeto.array_extra_data.length; t++){
                       var temp = objeto.array_extra_data[t];
                       switch (temp.tipo){
                          case "label":
                             var valor = $("#" + temp.id).html();
                             var llave = temp.llave;
                             json_extra_data[llave] = valor;
                             //console.log(json_extra_data[llave]);
                          break;
                       }
                   }
                   var json_datos = {
                       nuevos: arreglo_nuevos,
                       editados: arreglo_editados,
                       eliminados: objeto_observado.arreglo_eliminados,
                       extra: json_extra_data
                    };
                   var data = JSON.stringify(json_datos);
                   //console.log(data);
                   
                   ajax_tabla.Constructor("POST", objeto.url_guardar, data, false);
               }
               
               
               var rpta_mensaje = JSON.parse(ajax_tabla.GetRespuesta());
               console.log(rpta_mensaje);
               if(rpta_mensaje.tipo_mensaje == "success"){
                   $(objeto.id_label_mensaje).html(rpta_mensaje.mensaje[0]);
                   $(objeto.id_label_mensaje).removeClass("oculto");
                   $(objeto.id_label_mensaje).addClass("color-success");
                   //reemplazar el id temporal de los nuevos
                   var ids_nuevos = rpta_mensaje.mensaje[1];

                   if(ids_nuevos != null){
                       for(var p = 0; p < ids_nuevos.length; p++){
                           var temp = ids_nuevos[p];//JSON.parse(ids_nuevos[p]);
                           var id_temporal = temp.temporal;
                           var nuevo_id = temp.nuevo_id;

                           for(var k = 0; k < $(objeto.id_dom).children("tbody").children().length; k++){
                               var fila = $(objeto.id_dom).children("tbody").children()[k];
                               for(var i = 0; i < $(fila).children().length; i++){
                                   var id_actual = $($(fila).children()[i]).children().html();
                                   if(id_actual == id_temporal){
                                       $($(fila).children()[i]).children().html(nuevo_id);
                                   }
                               }
                           }
                       }
                   }
               }else if(rpta_mensaje.tipo_mensaje == "error"){
                   $(objeto.id_label_mensaje).html(rpta_mensaje.mensaje[0]);
                   $(objeto.id_label_mensaje).removeClass("oculto");
                   $(objeto.id_label_mensaje).addClass("color-error");
               }
           }
           
           //SI NO HAY ERROR EN EL AJAX, ENTONCES QUITO EL OBSERVADOR
           //objeto_observado.arreglo_editados = [];
           //objeto_observado.arreglo_nuevos = [];
           //objeto_observado.arreglo_eliminados = [];

           //FIN
        }else{
             try {
              this.SiguienteEslabon(operacion, thisDOM, objeto);
           }catch(error){
              console.log("Operación no implementada");
           }
        }
    },
    GenerarObjetoJSON: function(objeto_fila, array_json_th){
        var arreglo_indices = [];
        var arreglo_rpta = [];
        //console.log(array_json_th);
        for( var k = 0; k < array_json_th.length; k++){
            arreglo_indices.push(array_json_th[k].index);
        }

        var objeto_nuevo  = {};
        for( var k = 0; k < objeto_fila.children().length ; k++){
           var titulo_td = $($(objeto_fila.children())[k]).attr("title");
           switch(titulo_td) {
               case "text":
                  //console.log(k + " tenemos un texto");
                  var llave = arreglo_indices[k];
                  var valor = $(objeto_fila.children()[k]).children().val();
                  objeto_nuevo[llave] = valor;
                  //console.log(llave + " : " + valor);
                  break;
               case "label":
                  //console.log(k + " tenemos un label");
                   var llave = arreglo_indices[k];
                   var valor = $(objeto_fila.children()[k]).children().html();
                  objeto_nuevo[llave] = valor;
                  //console.log(llave + " : " + valor);
                   break;
               case "label_id":
                  //console.log(k + " tenemos un label_id");
                   var llave = arreglo_indices[k];
                   var valor = $(objeto_fila.children()[k]).children().html();
                   objeto_nuevo[llave] = valor;
                  //console.log(llave + " : " + valor);
                   break;
               case "label_id_mongo":
                  //console.log(k + " tenemos un label_id");
                   var llave = arreglo_indices[k];
                   var valor = $(objeto_fila.children()[k]).children().html();
                   objeto_nuevo[llave] = valor;
                  //console.log(llave + " : " + valor);
                   break;
              case "select":
                  //console.log(k + " tenemos un select");
                   var llave = arreglo_indices[k];
                   var valor = $(objeto_fila.children()[k]).children().val();
                   objeto_nuevo[llave] = valor;
                  //console.log(llave + " : " + valor);
                   break;
               case "botonesTd":
                   //No hace nada porque lo botones no cambian
                   //console.log(k + " tenemos un conjunto de botones");
                   break;
                case "checkbox":
                   //No hace nada porque lo botones no cambian
                   //console.log(k + " tenemos un conjunto de botones");
                   break;
               default:
                  console.log("GenerarObjetoJSON:'" + tipo_form + "' no tiene una implementación.");
           } 
        }
        //console.log(objeto_nuevo);
        return objeto_nuevo;
    }
});

 var EditarInputCheck = new Class({
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
        //console.log("EditarInputCheck");
        if(operacion == "EditarInputCheck"){
            var id_fila = thisDOM.parent().parent().children(0).children(0).html();
            var id_tabla =  thisDOM.parent().parent().parent().parent().attr("id");
            //console.log(id_tabla);console.log(id_fila);console.log(id_fila.indexOf(id_tabla));
            if(thisDOM.prop( "checked") == true){
                //console.log("es una fila nueva");
                var tipo_arreglo = "nuevo";
            }else{
                //console.log("es una fila eliminada");
                var tipo_arreglo = "eliminado";
            }
           
           ObservadorConcreto.NotificarObservadores(objeto.observador, tipo_arreglo, id_fila);
        }else{
             try {
              this.SiguienteEslabon(operacion, thisDOM, objeto);
           }catch(error){
              console.log("Operación no implementada");
           }
        }
    }
});

  var SeleccionarOption = new Class({
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
        console.log("SeleccionarOption");
        if(operacion == "SeleccionarOption"){
            var id_fila = thisDOM.parent().parent().children(0).children(0).html();
            var id_tabla =  thisDOM.parent().parent().parent().parent().attr("id");
            //console.log(id_tabla);console.log(id_fila);console.log(id_fila.indexOf(id_tabla));
            if(id_fila.indexOf(id_tabla) > -1){
                console.log("es una fila nueva");
                var tipo_arreglo = "nuevo";
            }else{
                console.log("es una fila editada");
                var tipo_arreglo = "editado";
            }
           
           ObservadorConcreto.NotificarObservadores(objeto.observador, tipo_arreglo, id_fila);
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
    var eslabon_1 = new AgregarFila();
    var eslabon_2 = new GuardarTabla();
    var eslabon_3 = new QuitarFila();
    var eslabon_4 = new EditarInputCheck();
    var eslabon_5 = new IrURL();

    eslabon_1.SetearSiguienteInstancia(eslabon_2);
    eslabon_2.SetearSiguienteInstancia(eslabon_3);
    eslabon_3.SetearSiguienteInstancia(eslabon_4);
    eslabon_4.SetearSiguienteInstancia(eslabon_5);

    var operacion = this.get("operacion"); console.log(operacion);

    eslabon_1.EjecutarOperacion(operacion, $(this), objeto);
});

$(document).on("keydown", ".mootools", function(event) {
  var objeto = eval(this.get("objeto"));
  var eslabon_1 = new EditarInputText();
  var operacion = this.get("operacion"); //console.log(operacion);
    eslabon_1.EjecutarOperacion(operacion, $(event.currentTarget), objeto);
});

$(document).on("change", ".mootools", function(event) {
  var objeto = eval(this.get("objeto"));
  var eslabon_1 = new SeleccionarOption();
  var operacion = this.get("operacion"); //console.log(operacion);
    eslabon_1.EjecutarOperacion(operacion, $(event.currentTarget), objeto);
});