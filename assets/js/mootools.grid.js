// nombre : mootools.grid.js
// version : 1.0
// dependencias : mootools-core-min.js, mootools-min.js, underscore-min.js, jquery.min.js, mootools.dao.js

IGridPlan = new Interface( "IGridPlan", {
    SetTableId: function(id_tabla) {},
    SetTableObj: function(objeto) {},
    SetTableHeader: function(array_json_th) {},
    SetTableBody: function(array_json_td, array_json_btn_td, ajax_dao) {},
    SetTableFooter: function(array_json_btn, tamanio_pagina) {},
    SetLabelMensaje: function(id_label_mensaje){},
    SetURLGuardar: function(url) {} ,
    SetURLNuevo: function(url) {} 
});

var Grid = new Class({
    Interfaces: [ IGridPlan ],
    html_gird : "",
    id_label_mensaje : "#txtMensajeRpta",
    SetTableId: function(id_tabla) {
        this.id_dom = "#" + id_tabla;
        this.observador = new Observador(id_tabla);
        ObservadorConcreto.RegistrarObservador(this.observador);
    },
    SetTableObj: function(objeto) {
        this.objeto = objeto;
    },
    SetTableHeader: function(array_json_th) {
        this.array_json_th = array_json_th;
        var cabecera = "<thead><tr>";
        for(var i = 0; i < array_json_th.length; i++){
            //console.log(array_json_th[i]);
            cabecera = cabecera + "<th style='"+ array_json_th[i].estilos +"'>" + array_json_th[i].titulo + "</th>";
        }
        cabecera = cabecera + "</tr></thead>";
        //this.cabecera = cabecera;
        this.html_gird = this.html_gird + cabecera;
    },
    SetTableBody: function(array_json_td, array_json_btn_td, ajax_dao) {
        //console.log(array_json_td); //console.log(array_json_btn_td); //console.log(ajax_dao.GetRespuesta());
        this.array_json_td = array_json_td; this.array_json_btn = array_json_btn;
        this.html_gird = this.html_gird + "<tbody>";
        this.array_json_btn_td = array_json_btn_td;
        var dao_rpta = ajax_dao.GetRespuesta();
        this.array_extra_data = null;
        if(jQuery.isEmptyObject(dao_rpta)){
            console.log("esta vacío");
        }else{
           var array_rpta = [];
           for(var i = 0; i < dao_rpta.length; i++){
               //console.log(JSON.parse(dao_rpta[i]));
               try {
                    array_rpta.push(JSON.parse(dao_rpta[i]));
                }catch(err) {
                    if (err instanceof SyntaxError) {
                        array_rpta.push(dao_rpta[i]);       
                     } else {
                        throw err; // let others bubble up
                     }
                }
            }
            dao_rpta = array_rpta;
            //console.log(dao_rpta);
        }

        for( var i = 0; i < dao_rpta.length; i++){
            this.html_gird = this.html_gird + "<tr>"; 
           for( var k = 0; k < array_json_td.length; k++){
                var index_td = array_json_td[k].index;
                var tipo_form = array_json_td[k].tipo; 
                //console.log(array_json_td[k].tipo); console.log(index_td);
                switch(tipo_form) {
                    case "text":
                        //console.log("tenemos un texto");
                        var input_text = new InputText();
                        var estilos = array_json_td[k].estilos;
                        var edicion = array_json_td[k].edicion;
                        var valor = dao_rpta[i][index_td];
                        
                        input_text.Crear(estilos,edicion,valor, this.objeto); //console.log(input_text.GetHtml());
                        this.html_gird = this.html_gird + input_text.GetHtml();
                        break;
                    case "label":
                        //console.log("tenemos un label");
                        var label = new Label();
                        var estilos = array_json_td[k].estilos;
                        var valor = dao_rpta[i][index_td];

                        label.Crear(estilos, valor, index_td);//console.log(label.GetHtml());
                        this.html_gird = this.html_gird + label.GetHtml();
                        break;
                    case "label_id":
                        //console.log("tenemos un label");
                        var label_id = new LabelId();
                        var estilos = array_json_td[k].estilos;
                        var valor = dao_rpta[i][index_td];

                        label_id.Crear(estilos, valor, index_td);//console.log(label.GetHtml());
                        this.html_gird = this.html_gird + label_id.GetHtml();
                        break;
                    case "label_id_mongo":
                        //console.log("tenemos un label");
                        var label_id_mongo = new LabelId();
                        var estilos = array_json_td[k].estilos;
                        //console.log(dao_rpta[i][index_td]);
                        var valor = dao_rpta[i][index_td]; 
                        valor = valor["$oid"];
                        //console.log(valor);
                        label_id_mongo.Crear(estilos, valor, index_td);//console.log(label.GetHtml());
                        this.html_gird = this.html_gird + label_id_mongo.GetHtml();
                        break;
                    case "botones":
                        var botones_fila = new BotonesFila();
                        var estilos = array_json_td[k].estilos;
                        
                        botones_fila.Crear(array_json_btn_td, estilos, this.objeto); //console.log(botones_fila.GetHtml());
                        this.html_gird = this.html_gird + botones_fila.GetHtml();
                        break;
                    case "checkbox":
                        var checkbox = new Checkbox();
                        var estilos = array_json_td[k].estilos;
                        var valor = dao_rpta[i][index_td]; 
                        
                        checkbox.Crear(estilos, valor, this.objeto); //console.log(botones_fila.GetHtml());
                        this.html_gird = this.html_gird + checkbox.GetHtml();
                        break;
                    case "checkbox-read-only":
                        var checkbox_read_only = new CheckboxReadOnly();
                        var estilos = array_json_td[k].estilos;
                        var valor = dao_rpta[i][index_td]; 
                        
                        checkbox_read_only.Crear(estilos, valor, this.objeto); //console.log(botones_fila.GetHtml());
                        this.html_gird = this.html_gird + checkbox_read_only.GetHtml();
                        break;
                    case "select":
                        var select = new Select();
                        var estilos = array_json_td[k].estilos;
                        var options = JSON.parse(array_json_td[k].options.ajax_rpta_data);
                        var valor = dao_rpta[i][index_td]; 
                        
                        select.Crear(estilos, options, valor, this.objeto); //console.log(botones_fila.GetHtml());
                        this.html_gird = this.html_gird + select.GetHtml();
                        break;
                    default:
                        console.log("SetTableBody:'" + tipo_form + "' no tiene una implementación.");
                }    
           }
           this.html_gird = this.html_gird + "</tr>"; 
        }
        this.html_gird = this.html_gird + "</tbody>"; 
    },
    SetTableFooter: function(array_json_btn, tamanio_pagina) {
        this.html_gird = this.html_gird + "<tfoot><tr><td colspan='1000' style='text-align:right'>";
        
        for( var i = 0; i < array_json_btn.length; i++){
            //tipo: "agrega_fila", operacion:"AgregarFila", icono: "fa fa-plus", label: "Agregar Registro"
            var boton = new Button();
            boton.Crear(array_json_btn[i].label, array_json_btn[i].icono, array_json_btn[i].operacion, array_json_btn[i].clase, this.objeto);
            this.html_gird = this.html_gird + boton.GetHtml();
        }

        this.html_gird = this.html_gird + "</td></tr></tfoot>";
    },
    SetURLGuardar: function(url) {
        this.url_guardar = url;
    },
    SetURLNuevo: function(url) {
        this.url_nuevo = url;
    },
    SetLabelMensaje: function(id_label_mensaje){
        this.id_label_mensaje = id_label_mensaje;
    },
    SetExtraData: function(array_extra_data){
        //console.log(this.array_extra_data);
        this.array_extra_data = array_extra_data;
        //console.log(this.array_extra_data);
    },
    MostrarTable: function(){
        //console.log(this.id_dom);console.log(this.html_gird);
        $(this.id_dom).append(this.html_gird);
    } ,
    BorrarTable: function(){
        this.html_gird = "";
        $(this.id_dom).children().remove();
    },
    GetEstructuraFila: function(){
        var rpta = [];
        rpta[0] = array_json_td; rpta[1] = array_json_btn_td;
        return rpta;
    }
});