/***************
VARIABLES
****************/
var ctx, canvas;
var colores_array = new Array("yellow", "blue", "red", "purple", "cyan");
var numColores = colores_array.length;
var numJugadas = 10;
var t = 0;
var tirada, jugada;
var colorResultado = "black";
var colorBoton = "black";
var colorContorno = "yellow";
/***************
OBJETOS
****************/
function Bolitas(tiro, c1, c2, c3, c4, c5){
	this.tiro = tiro;
	this.bolas = [c1, c2, c3, c4, c5];
	this.w = 30;
	this.margen = 40;
	this.margenRenglon = 12;
	this.x = 100;
	this.y = 35+(this.w+this.margenRenglon)*this.tiro;
	this.r = 15;
	this.xx = this.x - this.r;
	this.yy = this.y - this.r;
	this.lon = this.xx + this.margen * numColores;	
	this.dibuja = dibujaBolitas;
}
function Boton(tiro){
	this.w = 30;
	this.l = 80;
	this.margenRenglon = 12;
	this.x = 300;
	this.y = 40+(this.w+this.margenRenglon)*tiro;
	this.dibuja = dibujaBoton;
}
/**************
FUNCIONES
***************/
function dibujaBoton(){
	ctx.fillStyle = colorBoton;
	ctx.strokeStyle = colorContorno;
	ctx.font = "bold 20px Arial";
	ctx.fillText("Prueba", this.x, this.y);	
}
function dibujaBolitas(){
	for(var i=0; i<numColores; i++){
		bolita(this.bolas[i], this.x + this.margen * i	, this.y, this.r);
	}
}
function bolita(color, x, y, r){
	ctx.save();
	ctx.beginPath();
	if(color==-1){
		ctx.fillStyle = "gray";
	} else {
		ctx.fillStyle = colores_array[color];
	}
	ctx.arc(x, y, r, 0, 2*Math.PI);
	ctx.fill();
	ctx.restore();
}
function ajusta(xx, yy){
	var pos = canvas.getBoundingClientRect();
	var x = xx - pos.left;
	var y = yy - pos.top;
	return {x:x, y:y}	
}
function selecciona(e){
	var pos = ajusta(e.clientX, e.clientY);
	var x = pos.x;
	var y = pos.y;
	var color;
	//
	if((x>tirada.xx)&&(x<tirada.lon)&&(y>tirada.yy)&(y<tirada.yy+tirada.w)){
		for(var i=0; i<numColores; i++){
			xx = tirada.xx+tirada.margen*i;
			if((x > xx)&&(x < xx+tirada.w)){
				break;
			}
		}
		if(i<numColores){
			color = tirada.bolas[i]+1;
			if(color==numColores) color = -1;
			bolita(color, tirada.x+tirada.margen*i,tirada.y, tirada.r);
			tirada.bolas[i] = color;
		}
	} else if((x>boton.x)&&(x<boton.x+boton.l)&&(y>boton.y-boton.w/2)&&(y<boton.y+boton.w/2)){
		revisa();
	}
}
function revisa(){
	var correctas=0;
	var colores=0;
	for(var i=0; i<numColores; i++){
		console.log(i+": "+tirada.bolas[i]+", "+jugada.bolas[i]);	
		if(tirada.bolas[i]==jugada.bolas[i]) correctas++;
	}
	//
	var tiradaLimpio = limpiaArreglo(tirada.bolas);
	var jugadaLimpio = limpiaArreglo(jugada.bolas);
	//
	for(var i=0; i<tiradaLimpio.length; i++){
		for(var j=0; j<jugadaLimpio.length; j++){
			if(tiradaLimpio[i]==jugadaLimpio[j]){
				colores++;	
			}
		}
	}
	resultado(correctas, colores);
}
function resultado(correctas, colores){
	var margen = 100;
	t++;
	ctx.fillStyle = colorResultado;
	ctx.font = "bold 20px Arial";
	if(correctas==numColores){
		ctx.fillText("Excelente, esa es la combinación", 
		boton.x + margen, boton.y);
		canvas.removeEventListener("click",
		selecciona,false);
	} else if(t<numJugadas){
		ctx.fillText(t+") Correctas: "+correctas+
		" , Colores correctos: "+colores, 
		boton.x + margen, boton.y);
		tirada = new Bolitas(t, -1, -1, -1, -1, -1);
		tirada.dibuja();
		boton = new Boton(t);
		boton.dibuja();
	} else {
		ctx.fillText("Lo sentimos, perdiste, vuelve a intentarlo", 
					  boton.x + margen, boton.y);
		tirada = new Bolitas(t,
		jugada.bolas[0],
		jugada.bolas[1],
		jugada.bolas[2],
		jugada.bolas[3],
		jugada.bolas[4]);
		tirada.dibuja();
		canvas.removeEventListener("click",selecciona,false);
	}
}
function limpiaArreglo(arreglo){
	var salida = new Array();
	var c, bandera;
	for(var i=0; i<arreglo.length; i++){
		c = arreglo[i];
		bandera = false;
		for(var j=0; j<salida.length; j++){
			if(salida[j]==c){
				bandera = true;
				break;
			}
		}
		if(bandera==false){
			salida.push(c);	
		}
	}
	return salida;
}
/***************
MAIN
****************/
window.onload = function(){
	canvas = document.getElementById("miCanvas");
	if(canvas && canvas.getContext){
		ctx = canvas.getContext("2d");
		if(ctx){
			 jugada = new Bolitas(99,
			 Math.floor(Math.random()*numColores),
			 Math.floor(Math.random()*numColores),
			 Math.floor(Math.random()*numColores),
			 Math.floor(Math.random()*numColores),
			 Math.floor(Math.random()*numColores));
			 //
			 tirada = new Bolitas(t, -1, -1, -1, -1, -1);
			 tirada.dibuja();
			 //
			 boton = new Boton(t);
			 boton.dibuja()
			 //
			 canvas.addEventListener("click", selecciona, false);
		} else {
			alert("Error al crear tu contexto");	
		}
	}
}