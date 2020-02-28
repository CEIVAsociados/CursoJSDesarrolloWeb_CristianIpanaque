var valor_ini = 0, num_concat = "", a = "", b = "", resul = "";

function agregarTextoDisplay(texto){
	var display = document.getElementById("display");
	display.innerHTML = texto;
}

function agregarResultado(resul){
	var display = document.getElementById("display");
	var cant = resul.length;
	if(cant > 9){
		resul = resul.slice(0, 8);
		display.innerHTML = resul;
	}else{
		display.innerHTML = resul;
	}
}
function agregarPunto(valor){
	if(valor == ""){
		valor = "0.";
		return valor;
	}else if(valor.includes(".") == true){
		return valor;
	}else{
		valor = valor + "."
		return valor;
	}
}

var Calculadora = {
	init: function(){
		this.efectoteclas("tecla");
		this.concatenar("tecla");
		document.getElementById("sign").onclick = this.agregarSignoMenos;
		document.getElementById("on").onclick = this.borrarCadena;
		document.getElementById("mas").onclick = this.calcularSuma;
		document.getElementById("menos").onclick = this.calcularResta;
		document.getElementById("por").onclick = this.calcularMultiplicacion;
		document.getElementById("dividido").onclick = this.calcularDivision;
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
	concatenar: function(selector){
		var teclas = document.getElementsByClassName(selector);
		for (let i = 0; i < teclas.length; i++) {
			teclas[i].addEventListener("click", function () {
				var id = teclas[i].id;
				if(isNaN(id) == false || id == "punto"){
					var contador = num_concat.length;
					if(contador < 8){
						if(id == "punto"){
							num_concat = agregarPunto(num_concat);
							agregarTextoDisplay(num_concat);
						}else if(id == "0" && num_concat == ""){
							agregarTextoDisplay(id);
						}else{
							num_concat += id;
							agregarTextoDisplay(num_concat);
						}	
					}
				}
			});
		};
	},
	borrarCadena: function(){
		num_concat = "";
		a = 0;
		b = 0;
		resul = 0;
		agregarTextoDisplay(valor_ini);
	},
	agregarSignoMenos: function(){
		if(num_concat.includes("-") == true){
			var cant_car = num_concat.length;
			num_concat = num_concat.slice(1, cant_car);
			agregarTextoDisplay(num_concat);
		}else{
			num_concat = "-"+num_concat;
			agregarTextoDisplay(num_concat);
		}
	},
	calcularSuma: function(){
		a = num_concat;
		num_concat = "";
		agregarTextoDisplay(num_concat);
		document.getElementById("igual").addEventListener("click", function(){
			b = num_concat;
			resul = parseFloat(a) + parseFloat(b);
			agregarResultado(resul);
			a = resul;
		});
	},
	calcularResta: function(){
		a = num_concat;
		num_concat = "";
		agregarTextoDisplay(num_concat);
		document.getElementById("igual").addEventListener("click", function(){
			b = num_concat;
			resul = parseFloat(a) - parseFloat(b);
			agregarResultado(resul);
			a = resul;
		});
	}

}
Calculadora.init();
