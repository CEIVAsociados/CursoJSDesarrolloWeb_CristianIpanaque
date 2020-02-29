var valor_ini = "0", num_concat, a, b, resul;
var display = document.getElementById("display");

function agregarTextoDisplay(texto){
	display.innerHTML = texto;
}

function agregarResultado(resultado){
	var result = resultado.toString();
	var cant = result.length;
	if(cant > 7){
		return result = result.substr(0, 8);
	}else {
		display.innerHTML = result;
		return result;
	}
}
function agregarPunto(valor){
	if(valor == ""){
		valor = "0.";
		return valor;
	}else if(valor.includes(".") == true){
		return valor;
	}else if(valor.length == 7){
		return valor;
	}else{
		valor = valor + "."
		return valor;
	}
}
function realizarOperacion(){
	b = num_concat; //ultimo numero concatenado
	resul = parseFloat(a) + parseFloat(b);
	resul = agregarResultado(resul);
	agregarTextoDisplay(resul);
	a = resul; //resultado = a
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
		document.getElementById("igual").onclick = realizarOperacion;
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
					num_concat = display.innerHTML;
					var contador = num_concat.length;
					if(contador < 8){
						if(id == "punto"){
							num_concat = agregarPunto(num_concat);
							agregarTextoDisplay(num_concat);
						}else if(id == "0" && num_concat == "0"){
							agregarTextoDisplay(id);
						}else if(num_concat == "0"){
							num_concat = "";
							num_concat += id;
							agregarTextoDisplay(num_concat);
						}else{
							num_concat += id;
							agregarTextoDisplay(num_concat);
						}
					}
				}
			});
		};
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
		a = display.innerHTML;
		num_concat = ""; 
		agregarTextoDisplay(num_concat);
	},
	borrarCadena: function(){
		num_concat = "";
		a = "";
		b = "";
		resul = "";
		agregarTextoDisplay(valor_ini);
	},
}
Calculadora.init();
