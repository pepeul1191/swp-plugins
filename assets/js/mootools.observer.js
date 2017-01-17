IObservador = new Interface( "IObservador",{
    initialize: function(){},
    Notificar: function(){} 
});

ISujetoObservador = new Interface( "ISujetoObservador", { 
    RegistrarObservador: function(sujeto){},
    DeregistrarObservador: function(sujeto){},
    NotificarObservadores: function(){}
}); 

var Observador = new Class({
    Interfaces: [ IObservador ],
    initialize: function(id_tabla){        
        this.arreglo_nuevos = [];
        this.arreglo_eliminados = [];
        this.arreglo_editados = [];
        this.tabla_observada =id_tabla;
    },
    Notificar: function(tipo_arreglo, id) {
        switch(tipo_arreglo) {
            case "nuevo":
               if (_.contains(this.arreglo_eliminados, id)){
                   //console.log("NUEVLO ELIMNADO IF");
                   this.arreglo_eliminados = _.without(this.arreglo_eliminados, id);
               }
               if (! _.contains(this.arreglo_nuevos, id)){
                    //console.log("NUEVO IF");
                   this.arreglo_nuevos.push(id);
               }
               break;
            case "editado":
               if (! _.contains(this.arreglo_editados, id)){
                   //console.log("EDITADO IF");
                   this.arreglo_editados.push(id);
               }
               break;
            case "eliminado":
               if ( _.contains(this.arreglo_nuevos, id)){
                   //console.log("1er ELIMNADO IF");
                   this.arreglo_nuevos = _.without(this.arreglo_nuevos, id);
               }
               if ( _.contains(this.arreglo_editados, id)){
                  //console.log("2do ELIMNADO IF");
                   this.arreglo_editados = _.without(this.arreglo_editados, id);
               }
               if (! _.contains(this.arreglo_eliminados, id)){
                   //console.log("3er ELIMNADO IF");
                   this.arreglo_eliminados.push(id);
               }
               break;
        } 
    }
});

var SujetoObservador = new Class({ 
    Interfaces: [ ISujetoObservador ], 
    observador_array : [],
    RegistrarObservador: function(observador){
        var tabla_observada = observador.tabla_observada;
        for(var k = 0 ; k < this.observador_array.length ; k++){
           if(this.observador_array[k].tabla_observada == tabla_observada){
               this.DeregistrarObservador(this.observador_array[k]);
           }
        }
        this.observador_array.push(observador);
    },
    DeregistrarObservador: function(observador){
        this.observador_array = _.without(this.observador_array, observador);
    },
    NotificarObservadores: function(observador, tipo_arreglo, id){
        observador.Notificar(tipo_arreglo, id);
    },
    ObtenerObservador: function(id_tabla){
        var rpta = null;
        for(var k = 0 ; k < this.observador_array.length ; k++){
           if(this.observador_array[k].tabla_observada == id_tabla){
               rpta = this.observador_array[k];
           }
        }
        return rpta;
    },
    Ver: function(){
        for(var k = 0 ; k < this.observador_array.length ; k++){
            console.log(this.observador_array[k]);
        }
    }
});

var ObservadorConcreto = new SujetoObservador();

function verObservadores(){
    ObservadorConcreto.Ver();
}