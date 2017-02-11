var Validacion = new Class({
    initialize: function(input_id, mensaje_error = false){
        this.input_id = input_id;
        this.mensaje_error = mensaje_error;
        this.rpta = false;
    },
    ValidarCorreo() {
      var email = $(this.input_id).val();
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (re.test(email)){
            $(this.input_id).removeClass("input-text-error");
            rpta = true;
        }else{
            $(this.input_id).addClass("input-text-error");
            $(this.input_id).val("");
            $(this.input_id).attr("placeholder", "Ingrese un dirección de correo válida");
        }
    },
    ValidarRepetido(ruta_url, mensaje_error_ajax, lbl_rpta) {
      var input_id = this.input_id;
      var mensaje_error = this.mensaje_error;
      var rpta = false;

      $.ajax({
          type: "POST",
          url: ruta_url,
          data: "data=" + JSON.stringify($(this.input_id).val()),
          async: false,
          success:function(data){
              var data = JSON.parse(data);
              //console.log(data);
              if (data["tipo_mensaje"] == "error"){
                  $(lbl_rpta).html(mensaje_error_ajax);
                  $(lbl_rpta).addClass("color-rojo");
                  rpta = false;
              }else{
                  //console.log(data["mensaje"]);
                  if (data["mensaje"]){
                    $(input_id).addClass("input-text-error");
                    $(input_id).val("");
                    $(input_id).attr("placeholder", mensaje_error);
                    rpta = false;
                  }else{
                      $(input_id).removeClass("input-text-error");
                      rpta = true;
                  }
              }
          }
      });

      this.rpta = rpta;
    },
    ValidarTextLleno(){
      var texto = $(this.input_id).val();
      //console.log(this.input_id);
      if (texto == ""){
        $(this.input_id).addClass("input-text-error");
        $(this.input_id).val("");
        $(this.input_id).attr("placeholder", this.mensaje_error);
      }else{
        $(this.input_id).removeClass("input-text-error");
        this.rpta = true;
      }
    },
    ValidarSelect(){
      var valor = $(this.input_id).val();

      if (valor == "E"){
        $(this.input_id).addClass("input-text-error");
        $(this.input_id).attr("placeholder", this.mensaje_error);
      }else{
        $(this.input_id).removeClass("input-text-error");
        this.rpta = true;
      }
    }
});
