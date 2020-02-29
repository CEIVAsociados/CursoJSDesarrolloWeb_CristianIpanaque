var valor_ini = "0", num_concat, a, b, resul, oper; //Variables generales del proyecto
var display = document.getElementById("display"); // Variable de Objeto para manipularlo

function mostrarTextoDisplay(texto){
	//Agregar numeros a la pantalla display
	display.innerHTML = texto;
}

function mostrarResultado(resultado){
	//Verificar si el resultado no sobrepase los 8 caracteres
	var result = resultado.toString();
	var cant = result.length;
	if(cant > 7){
		return result = result.substr(0, 8);
	}else {
		return result;
	}
}
function agregarPunto(valor){
	//Agregamos el punto al numero
	if(valor == ""){
		//Si la cadena esta vacia al presionar . se agrega un 0 a la izquierda
		valor = "0.";
		return valor;
	}else if(valor.includes(".") == true){
		//Si la cadena ya posee un punto se devuelve la cadena sin modificar
		return valor;
	}else if(valor.length == 7){
		//Si la cadena posee la cantidad de 7, no es posible agregar .
		return valor;
	}else{
		//En cualquier caso agrega .
		valor = valor + "."
		return valor;
	}
}
function realizarOperacion(){
	//Realizamos la operacion
	//La variable a ya tiene valor al clickear cualquiera de los operadores proveniente
	//de la funcion iniciarOperacion()
	//La variable oper contiene el id del tipo de operacion
	b = num_concat; //ultimo numero concatenado que es guardado en la variable b
	if(oper == "mas"){
		//Si la operacion es suma, realiza la suma
		resul = parseFloat(a) + parseFloat(b);
	}else if(oper == "menos"){
		//Si la operacion es menos, realiza la resta
		resul = parseFloat(a) - parseFloat(b);
	}else if(oper == "por"){
		//Si la operacion es por, realiza la multiplicacion
		resul = parseFloat(a) * parseFloat(b);
	}else if(oper == "dividido"){
		//Si la operacion es division, realiza la division
		resul = parseFloat(a) / parseFloat(b);
	}
	resul = mostrarResultado(resul); //Enviamos el resultado para verificar si sobrepasa los 8 caracteres
	mostrarTextoDisplay(resul);//Agregamos el resultado a la pantalla
	a = resul; //Ahora la variable a es igual a resultado, para posteriormente seguir operando
}

var Calculadora = {
	init: function(){
		this.efectoteclas("tecla");//Funcion para cambiar el tamaño de las teclas
		this.concatenar("tecla"); //Funcion para concatenar las cadenas
		document.getElementById("sign").onclick = this.agregarSignoMenos; //Click para agregar signos
		document.getElementById("on").onclick = this.reiniciar; //Click para reiniciar la cadena
		document.getElementById("mas").onclick = this.iniciarOperacion; //Click para iniciar la operacion
		document.getElementById("menos").onclick = this.iniciarOperacion;
		document.getElementById("por").onclick = this.iniciarOperacion;
		document.getElementById("dividido").onclick = this.iniciarOperacion;
		document.getElementById("igual").onclick = realizarOperacion; //Click para realizar la operacion
	},
	efectoteclas: function(selector){//Funcion para cambiar tamaño de teclas
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
	concatenar: function(selector){//Funcion para concatenar
		var teclas = document.getElementsByClassName(selector);//Obtenemos las teclas
		for (let i = 0; i < teclas.length; i++) {
			teclas[i].addEventListener("click", function () {//Si una tecla es clickeada
				var id = teclas[i].id; //Obtenemos su id
				if(isNaN(id) == false || id == "punto"){ //Verificamos si numero o si es punto (.)
					num_concat = display.innerHTML; //Obtenemos la cadena de numero del display
					var contador = num_concat.length; //Contamos
					if(contador < 8){
						if(id == "punto"){
							num_concat = agregarPunto(num_concat); //Agregamos (.) en la funcion agregarPunto
							mostrarTextoDisplay(num_concat); //Mostrar al display
						}else if(id == "0" && num_concat == "0"){
							//Si la tecla es 0 y el display muestra 0, se muestrará solo un cero 0
							mostrarTextoDisplay(id);
						}else if(num_concat == "0"){
							//Si el display muestra un cero 0, y la tecla presionada es otro numero
							//Construimos la cadena y la mostramos al display
							num_concat = "";
							num_concat += id;
							mostrarTextoDisplay(num_concat);
						}else{
							//En otro caso construye la cadena y la muestra
							num_concat += id;
							mostrarTextoDisplay(num_concat);
						}
					}
				}
			});
		};
	},
	agregarSignoMenos: function(){//Cambiar de signo
		if(display.innerHTML.includes("-") == true){//Si el display ya cuenta con signo
			var cant_car = display.innerHTML.length;
			num_concat = display.innerHTML.substr(1, cant_car);//Quitamos el signo
			mostrarTextoDisplay(num_concat);
		}else{//En otro caso, agregamos el signo -
			num_concat = "-"+display.innerHTML;
			mostrarTextoDisplay(num_concat);
		}
	},
	iniciarOperacion: function(event){
		//Inicialos la operacion
		//Cualquier tecla de operacion clickeada, 
		a = display.innerHTML;//Obtenemos el numero mostrado en display para la variable a
		num_concat = ""; 
		mostrarTextoDisplay(num_concat); //Mostramos el display vacio
		oper = event.target.id;//Obtenemos el id del objeto clickeado, para saber
		//que operacion de va a realizar y la asignamos a la variable oper
	},
	reiniciar: function(){
		//Reiniciamos las variables
		num_concat = "";
		a = "";
		b = "";
		resul = "";
		oper = ""
		mostrarTextoDisplay(valor_ini); //Mostramos cero 0.
	}
}
Calculadora.init(); //Iniciamos
