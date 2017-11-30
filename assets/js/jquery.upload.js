$.fn.upload = function(remote, data, successFn, progressFn, domClickedSend) {
	// if we dont have post data, move it along
	if (typeof data != "object") {
		progressFn = successFn;
		successFn = data;
	}

	var formData = new FormData();

	var numFiles = 0;
	this.each(function() {
		var i, length = this.files.length;
		numFiles += length;
		for (i = 0; i < length; i++) {
			formData.append(this.name, this.files[i]);
		}
	});

	// if we have post data too
	if (typeof data == "object") {
		for (var i in data) {
			formData.append(i, data[i]);
		}
	}

	var def = new $.Deferred();
	if (numFiles > 0) {
		// do the ajax request
		$.ajax({
			url: remote,
			type: "POST",
			xhr: function() {
				myXhr = $.ajaxSettings.xhr();
				if(myXhr.upload && progressFn){
					myXhr.upload.addEventListener("progress", function(prog) {
						var value = ~~((prog.loaded / prog.total) * 100);
						// if we passed a progress function
						if (typeof progressFn === "function") {
							progressFn(prog, value);

						// if we passed a progress element
						} else if (progressFn) {
							$(progressFn).val(value);
						}
					}, false);
				}
				return myXhr;
			},
			data: formData,
			dataType: "json",
			cache: false,
			contentType: false,
			processData: false,
			beforeSend: function( xhr ) {
			    domClickedSend.prop( "disabled", true );
			 },
			complete: function(res) {
				var json;
				try {
					json = JSON.parse(res.responseText);
				} catch(e) {
					json = res.responseText;
				}
				if (typeof successFn === "function") successFn(json);
				domClickedSend.prop( "disabled", false );
				def.resolve(json);
			}
		});
	} else {
		def.reject();
	}

	return def.promise();
};

//fuente : https://www.youtube.com/watch?v=AZJfXr2LZXg


$.fn.uploadTable = function(remote, validacion, td_archivo_id, domClickedSend, objeto, thisDOM) {
	// if we dont have post validacion, move it along
	var formData = new FormData();
	var valido = true;
	var rpta = false;
	var numFiles = 0;
	this.each(function() {
		var i, length = $(this)[0].files.length;
		numFiles += length;
		for (i = 0; i < length; i++) {
			formData.append($(this)[0].name, $(this)[0].files[i]);
			if (validacion.extensiones != '*'){
				if(!_.contains(validacion.extensiones, $(this)[0].files[i].type)){
					valido = false;
					//console.log(objeto);
					$(objeto.id_label_mensaje).html('Archivo seleccionado no es del formato válido');
          $(objeto.id_label_mensaje).removeClass("oculto");
          $(objeto.id_label_mensaje).addClass("color-error");
				}
			}
			if($(this)[0].files[i].size > validacion.tamanio){
				valido = false;
				$(objeto.id_label_mensaje).html('Archivo seleccionado supera el tamaño máximo');
        $(objeto.id_label_mensaje).removeClass("oculto");
        $(objeto.id_label_mensaje).addClass("color-error");
			}
		}
		formData.append("csrfmiddlewaretoken",CSRF);
	});
	// if we have post data too
	if (valido == true){
		if (typeof validacion == "object") {
			for (var i in validacion) {
				formData.append(i, validacion[i]);
			}
		}

		var def = new $.Deferred();
		if (numFiles > 0) {
			// do the ajax request
			$.ajax({
				url: remote,
				type: "POST",
				xhr: function() {
					myXhr = $.ajaxSettings.xhr();
					/*if(myXhr.upload && progressFn){
						myXhr.upload.addEventListener("progress", function(prog) {
							var value = ~~((prog.loaded / prog.total) * 100);
							// if we passed a progress function
						}, false);
					}*/
					return myXhr;
				},
				data: formData,
				dataType: "json",
				cache: false,
				contentType: false,
				processData: false,
				beforeSend: function( xhr ) {
				    //domClickedSend.prop( "disabled", true );
				 },
				complete: function(res) {
					var json;
					try {
						json = JSON.parse(res.responseText);
						if(json.tipo_mensaje == 'success'){
							$(objeto.id_label_mensaje).html(json.mensaje[0]);
              $(objeto.id_label_mensaje).removeClass("oculto");
              $(objeto.id_label_mensaje).addClass("color-success");
							$(domClickedSend).parent().parent().children().eq(td_archivo_id).children().eq(0).html(json.mensaje[1]);
						}else{
							$(objeto.id_label_mensaje).html(json.mensaje[0]);
              $(objeto.id_label_mensaje).removeClass("oculto");
              $(objeto.id_label_mensaje).addClass("color-error");
						}
						rpta = true;
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
					} catch(e) {
						json = res.responseText;
						$(objeto.id_label_mensaje).html(res.responseText);
            $(objeto.id_label_mensaje).removeClass("oculto");
            $(objeto.id_label_mensaje).addClass("color-error");
					}
					//domClickedSend.prop( "disabled", false );
					def.resolve(json);
				}
			});
		} else {
			def.reject();
		}

		return rpta;
	}
};