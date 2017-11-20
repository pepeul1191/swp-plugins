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


$.fn.uploadTable = function(remote, validacion, progressFn, domClickedSend, objeto) {
	// if we dont have post validacion, move it along
	if (typeof validacion != "object") {
		//progressFn = successFn;
		successFn = validacion;
	}

	var formData = new FormData();
	var valido = true;

	var numFiles = 0;
	this.each(function() {
		var i, length = $(this)[0].files.length;
		numFiles += length;
		for (i = 0; i < length; i++) {
			formData.append($(this)[0].name, $(this)[0].files[i]);
			console.log($(this)[0].files[i].type);
			if (validacion.extensiones != '*'){
				if(!_.contains(validacion.extensiones, $(this)[0].files[i].type)){
					valido = false;
					console.log(objeto);
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
					} catch(e) {
						json = res.responseText;
					}
					if (typeof successFn === "function") successFn(json);
					//domClickedSend.prop( "disabled", false );
					def.resolve(json);
				}
			});
		} else {
			def.reject();
		}

		return def.promise();
	}
};