/****************
VARIABLES
*****************/
var canvas, ctx;
var inicioX = 280;
var inicioY = 50;
var renglones = 4;
var columnas = 4;
var numFichas = renglones * columnas - 1;
var ancho = 100;
var b = 0;
var fichas_array = new Array();
var colorFicha = "white";
var colorMarco = "black";
/****************
OBJETOS
*****************/
function Ficha(x, y, ren, col, w, i){
	this.x = x;
	this.y = y;
	this.w = w;
	this.i = i;
	this.ren = ren;
	this.col = col;
	this.dibuja = dibujaFicha;
}
function dibujaFicha(){
	ctx.save();
	ctx.fillStyle = colorFicha;
	ctx.strokeStyle = colorMarco;
	ctx.fillRect(this.x, this.y, this.w, this.w);
	ctx.strokeRect(this.x, this.y, this.w, this.w);
	//
	ctx.font = "bold 40px Comic";
	ctx.fillStyle = colorMarco;
	if(this.i<9){
		ctx.fillText(this.i, this.x+this.w/2-10, this.y+this.w/2+10);
	} else if(this.i>numFichas){
		ctx.fillText("", this.x+this.w/2-18, this.y+this.w/2+10);
	} else {
		ctx.fillText(this.i, this.x+this.w/2-18, this.y+this.w/2+10);
	}
	ctx.restore();	
}
/*****************
FUNCIONES
******************/
function tablero(){
	var i,j;
	for(i = 0; i<renglones; i++){
		for(j=0; j<columnas; j++){
			x = inicioX + ancho * j;
			y = inicioY + ancho * i;
			ii = j + i * renglones;
			fichas_array.push(new Ficha(x, y, i, j, ancho, ii+1));
			fichas_array[ii].dibuja();
		}
	}
}
function busca(ficha){
	var ren2, col2;
	var ren = fichas_array[ficha].ren;
	var col = fichas_array[ficha].col;
	bandera = false;
	//arriba
	ren2 = ren - 1;
	if(ren2>-1) bandera = intercambia(ren, col, ren2, col);
	
	if(bandera==false){
		//abajo
		ren2 = ren + 1;
		if(ren2<renglones) bandera = intercambia(ren, col, ren2, col);
	}
	
	//izquierda
	if(bandera==false){
		col2 = col - 1;
		if(col2>-1) bandera = intercambia(ren, col, ren, col2);
	}
	
	//derecha
	if(bandera==false){
		col2 = col + 1;
		if(col2<columnas) bandera = intercambia(ren, col, ren, col2);
	}
	
	//setTimeout(barajea,1/0);
}
function intercambia(ren, col, ren2, col2){
	var i = col + ren * renglones;
	var j = col2 + ren2 * renglones;
	var cambio = false;
	//
	if(fichas_array[j].i==16){
		fichas_array[j].i = fichas_array[i].i;
		fichas_array[i].i = 16;
		tablero();
		cambio = true;
		clic.play();
		//console.log(i+") "+ren+" "+col+"-> "+(fichas_array[i].i)+" "+j+") "+ren2+" "+col2+"->"+fichas_array[j].i);
	}
	return cambio;
}
function barajea(){
	/*b++;
	if(b<1000){
		r = Math.floor(Math.random()*(renglones*columnas));
		busca(r);
	}*/
	for(i=0; i<1000; i++){
		r = Math.floor(Math.random()*(renglones*columnas));
		busca(r);
	}
}
/************************
Ajustamos las coordenadas
*************************/
function ajustar(xx, yy){
	var posCanvas = canvas.getBoundingClientRect();
	var x = xx - posCanvas.left;
	var y = yy - posCanvas.top;
	return {x:x, y:y}
}
/********************
Selecciona por el apuntador
del ratón
**********************/
function selecciona(e){
	var pos = ajustar(e.clientX, e.clientY);
	var x = pos.x;
	var y = pos.y;
	var ficha;
	for(var i=0; i<fichas_array.length; i++){
		ficha = fichas_array[i];
		if((x>ficha.x)&&(x < ficha.x + ficha.w)&&(y>ficha.y)&&(y<ficha.y+ficha.w)){
			break;
		}
	}
	if(i<fichas_array.length){
		//console.log(i);
		if(fichas_array[i].i != 16){
			busca(i);
		}
	}
}
window.onload = function(){
	canvas = document.getElementById("miCanvas");
	if(canvas && canvas.getContext){
		ctx = canvas.getContext("2d");
		if(ctx){
			clic = document.getElementById("clic");
			tablero();
			//setTimeout(barajea,10);
			barajea();
			canvas.addEventListener("click",selecciona,false);
		} else {
			alert("Error al crear tu contexto");	
		}
	}
}