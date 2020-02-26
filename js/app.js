var valor_ini = "0", num_concat = "", a = "", b = "", resul = "";

function agregarOperacion(texto){
	var display = document.getElementById("display");
	var cant = texto.length;
	if(cant <= 8){
		display.innerHTML = texto;
	}
}
function agregarPunto(valor){
	if(valor == ""){
		valor = "0.";
		return valor;
	}else if(valor.includes(".")==true){
		return valor;
	}else{
		return valor + ".";
	}
}


var Calculadora = {
	init: function(){
		this.efectoteclas("tecla");
		this.operar("tecla");
		document.getElementById("sign").onclick = this.agregarSignoMenos;
		document.getElementById("on").onclick = this.borrarOperando;
	},
	efectoteclas: function(selector){
		var teclas = document.getElementsByClassName(selector);
		for (let i = 0; i < teclas.length; i++) {
			teclas[i].addEventListener("mousedown", function () {
				teclas[i].style.transform = "scale(.95, .95)";
			});
			teclas[i].addEventListener("mouseup", function () {
				teclas[i].setAttribute("style", "transform:scale(1, 1)");
			});
		};
	},
	operar: function(selector){
		var teclas = document.getElementsByClassName(selector);
		for (let i = 0; i < teclas.length; i++) {
			teclas[i].addEventListener("click", function () {
				var id = teclas[i].id;
				if(isNaN(id) == false || id == "punto"){
					if(id == "punto"){
						num_concat = agregarPunto(num_concat);
						agregarOperacion(num_concat);
					}else if(id == "0" && num_concat == ""){
						agregarOperacion(id);
					}else{
						num_concat += id;
						agregarOperacion(num_concat);
					}
				}
			});
		};
	},
	borrarOperando: function(){
		agregarOperacion(valor_ini);
		num_concat = "";
	},
	agregarSignoMenos: function(){
		if(num_concat.includes("-") == true){
			var cant_car = num_concat.length;
			num_concat = num_concat.slice(1, cant_car);
			agregarOperacion(num_concat);
		}else{
			num_concat = "-"+num_concat;
			agregarOperacion(num_concat);
		}
	}
}
Calculadora.init();
