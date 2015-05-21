/**********************************
Variables y constantes
**********************************/
var ctx, canvas;
var fichas_array = new Array();
var COLUMNAS = 3;
var RENGLONES = 3;
var fichas_X = 0;
var fichas_O = 0;
var tiradas	= 0;
var gameOver = false;
var colorGato = "black";
var colorCanvas = "green";
var largo = 120;
/***********************/
function Ficha(x,y,w,h,i,ren,col){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.i = i;
	this.ren = ren;
	this.col = col;
	this.peso = 0
	this.valor = "";
	this.pinta = pintaFicha;
}
function pintaFicha(valor){
	this.valor = valor;
	ctx.font = "bold 100px Arial";
	ctx.fillStyle = colorGato;
	ctx.fillText(valor,this.x+30,this.y+100,this.w,this.h);
			
}
/*****************************
Funciones
******************************/
function gato(){
	ctx.fillStyle = colorCanvas;
	ctx.strokeStyle = colorGato;
	ctx.lineWidth = 20;
	ctx.beginPath()
	ctx.moveTo(410,20);
	ctx.lineTo(410,420);
	ctx.stroke();
	//
	ctx.beginPath()
	ctx.moveTo(550,20);
	ctx.lineTo(550,420);
	ctx.stroke();
	//
	ctx.beginPath()
	ctx.moveTo(280,150);
	ctx.lineTo(680,150);
	ctx.stroke();
	//
	ctx.beginPath()
	ctx.moveTo(280,290);
	ctx.lineTo(680,290);
	ctx.stroke();
	//
	fichas_array.push(new Ficha(280,20,largo,largo,0,0,0));
	fichas_array.push(new Ficha(420,20,largo,largo,1,0,1));
	fichas_array.push(new Ficha(560,20,largo,largo,2,0,2));
	
	fichas_array.push(new Ficha(280,160,largo,largo,3,1,0));
	fichas_array.push(new Ficha(420,160,largo,largo,4,1,1));
	fichas_array.push(new Ficha(560,160,largo,largo,5,1,2));
	
	fichas_array.push(new Ficha(280,300,largo,largo,6,2,0));
	fichas_array.push(new Ficha(420,300,largo,largo,7,2,1));
	fichas_array.push(new Ficha(560,300,largo,largo,8,2,2));	
}
/*****************************
Ajusta las coordenadas globales
a las coordenadas del canvas
******************************/
function ajusta(xx, yy){
	var posCanvas = canvas.getBoundingClientRect();
	var x = xx - posCanvas.left;
	var y = yy - posCanvas.top;
	return {x:x, y:y}
	
}
/*****************************
Selecciona la ficha con el
apuntador delratón
******************************/
function selecciona(e){
	//Remueve la selección del usuario
	canvas.removeEventListener("click",selecciona,false);
	mensaje("pensando...");
	//Ajusta coordenadas
	var pos = ajusta(e.clientX, e.clientY);	
	var x = pos.x;
	var y = pos.y;
	var ficha;
	//Busca la ficha
	for(var i=0; i<fichas_array.length; i++){
		ficha = fichas_array[i];
		if(ficha.x > 0){
			if((x > ficha.x)&&
			(x < ficha.x + ficha.w)&&
			(y > ficha.y)&&
			(y< ficha.y + ficha.h)){
				tiradas++;
				break;	
			}
		}
	}
	//Se encontró la ficha y está libre
	if(i<fichas_array.length){
		if(ficha.valor == ""){
			//Selecciona la ficha
			ficha.pinta("X");
			//Tira la máquina
			setTimeout(tiraMaquina,1000);	
		}
	}
}
/*****************************
1) Verifica todos los pesos
2) Tira
3) Verifica si alguien ganó
******************************/
function tiraMaquina() {
	//Suma tirada
	tiradas++;
	console.log("Tirada: "+tiradas);
	//sigue el juego?
	if (gameOver==false) {
		//Verifica el peso por celda
		verificaRenglones(true);
		verificaColumnas(true);
		verificaDiagonal1(true);
		verificaDiagonal2(true);
		//
		// Determina la mejor jugada
		//
		fichas_X = 0;
		fichas_O = 0;
		mejorJugada = 0;
		//
		for (var i=0; i<fichas_array.length; i++) {
			ficha = fichas_array[i];
			//console.log("Ficha "+i+": "+ficha.ren+", "+ficha.col+": Valor"+ficha.valor+" , Peso="+ficha.peso);
			if (ficha.peso>mejorJugada) {
				mejorJugada = ficha.peso;
				ii = i;
			}
		}
		// tirada de la compu  
		ficha = fichas_array[ii];
		ficha.pinta("O");
		//
		console.log(ficha.i+" Mejor jugada "+ficha.ren+", "+ficha.col+" peso: "+ficha.peso);
		console.log("--------------------------------------------------");
		//
		//Verifica fin de juego 
		//con la jugada de la compu
		//(no calcula peso)
		//
		verificaRenglones(false);
		verificaColumnas(false);
		verificaDiagonal1(false);
		verificaDiagonal2(false);
		//
		if(gameOver==false){
			//ttodavía hay espacios?
			if(tiradas<9){
				canvas.addEventListener("click",selecciona,false);
				mensaje("Pulse su jugada ");
			} else {
				mensaje("¡GATO!");
			}
		}
	}
}
/**************************************** 
Calcula el peso de cada celda o ficha
*****************************************/
function pesoFicha(i,fichas_O, fichas_X) {
	ficha = fichas_array[i];
	if (ficha.valor == "") {
		//Tirar para ganar
		if (fichas_O == 2 && fichas_X == 0) {
			ficha.peso += 10;
		} else if (fichas_O == 0 && fichas_X == 2) {
			ficha.peso += 6;
		} else if (fichas_O == 1 && fichas_X == 0) {
			ficha.peso += 3;
		} else {
			ficha.peso += 1;
		}
	} else {
		ficha.peso = 0;
	}
	//console.log("El peso de la ficha "+i+" es "+ficha.peso);
}
/**************************************** 
Si hay tres bolas juntas, perdiste
si hay tres equis juntas, ganaste
*****************************************/
function verificaFin(O, X){
	fin = false;
	if (X == 3) {
		fin = true;
		mensaje("Felicidades, ganaste!");
	} else if (O == 3) {
		fin = true;
		mensaje("Lo siento, perdiste!");
	}	
	return fin;
}
/**************************************** 
Recibe el renglón y la columna y regresa
el índice consecutivo de la ficha
*****************************************/
function buscaFicha(i,j){
	for(var k=0; k<fichas_array.length; k++){
		ficha = fichas_array[k];
		if(ficha.ren == i && ficha.col==j){
			break;	
		}
	}
	return ficha;
}
/***************************************************
Verifica los renglones
****************************************************/
function verificaRenglones(calculaPeso) {
	if(gameOver==false){
		/*Verifica renglones */
		for (i=0; i<RENGLONES; i++) {
			//
			fichas_X = 0;
			fichas_O = 0;
			for (j=0; j<COLUMNAS; j++) {
				ficha = buscaFicha(i,j);
				fichas_X += (ficha.valor=="X"?1:0);
				fichas_O += (ficha.valor=="O"?1:0);
			}
			//console.log("Renglon "+i+" fichas x "+fichas_X+", fichas O "+fichas_O);
			if(calculaPeso){
				for (j=0; j<COLUMNAS; j++) {
					ficha = buscaFicha(i,j);
					pesoFicha(ficha.i, fichas_O, fichas_X);
				}
			}
			gameOver = verificaFin(fichas_O, fichas_X);
			if(gameOver) break;
		}
	}
}
/***************************************************
Revisa los Columnas
****************************************************/
function verificaColumnas(calculaPeso) {
	if(gameOver==false){
		/*Verifica columnas */
		for (var j=0; j<COLUMNAS; j++) {
			//
			fichas_X = 0;
			fichas_O = 0;
			for (i=0; i<RENGLONES; i++) {
				ficha = buscaFicha(i,j);
				fichas_X += (ficha.valor=="X"?1:0);
				fichas_O += (ficha.valor=="O"?1:0);
			}
			//console.log("Columna "+j+" fichas x "+fichas_X+", fichas O "+fichas_O);
			if(calculaPeso){
				for (i=0; i<RENGLONES; i++) {
					ficha = buscaFicha(i,j);
					pesoFicha(ficha.i, fichas_O, fichas_X);
				}
			}
			gameOver = verificaFin(fichas_O, fichas_X);
			if(gameOver) break;
		}
	}
}
/***************************************************
Revisa la diagonal 1
****************************************************/
function verificaDiagonal1(calculaPeso) {
	if(gameOver==false){
		/*Verifica diagonal 1 */
		fichas_X = 0;
		fichas_O = 0;
		//
		for (var i=0; i<RENGLONES; i++) {
			ficha = buscaFicha(i,i);
			fichas_X += (ficha.valor=="X"?1:0);
			fichas_O += (ficha.valor=="O"?1:0);
		}
		//console.log("Diagonal 1 fichas x "+fichas_X+", fichas O "+fichas_O);
		if(calculaPeso){
			for (i=0; i<RENGLONES; i++) {
				ficha = buscaFicha(i,i);
				pesoFicha(ficha.i, fichas_O, fichas_X);
			}
		}
		//
		gameOver = verificaFin(fichas_O, fichas_X);
	}
}
function verificaDiagonal2(calculaPeso) {
	if(gameOver==false){
		/*Verifica diagonal 2 */
		fichas_X = 0;
		fichas_O = 0;
		j = 2;
		for (i=0; i<RENGLONES; i++) {
			ficha = buscaFicha(i,j);
			fichas_X += (ficha.valor=="X"?1:0);
			fichas_O += (ficha.valor=="O"?1:0);
			j--;
		}
		//console.log("Diagonal 2 fichas x "+fichas_X+", fichas O "+fichas_O);
		if(calculaPeso){
			j = 2;
			for (i=0; i<RENGLONES; i++) {
				ficha = buscaFicha(i,j);
				pesoFicha(ficha.i, fichas_O, fichas_X);
				j--;
			}
		}
		gameOver = verificaFin(fichas_O, fichas_X);
	}
}
/**************************************** 
Recibe una cadena y la despliega
*****************************************/
function mensaje(cadena){
	var lon = (canvas.width-(20*cadena.length))/2;
	ctx.fillStyle = "black";
	ctx.clearRect(0,420, canvas.width, 100);
	ctx.font = "bold 40px Courier";
	ctx.fillText(cadena, lon, 470);
}
/**************************************** 
INICIO
*****************************************/
window.onload = function(){
	canvas = document.getElementById("miCanvas");
	if(canvas && canvas.getContext){
		ctx = canvas.getContext("2d");
		if(ctx){
			mensaje("Pulse su jugada");
			gato();
			canvas.addEventListener("click",selecciona,false);
		} else {
			alert("Error al crear tu contexto");	
		}
	}
}