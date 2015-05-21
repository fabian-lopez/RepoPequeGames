/******************
VARIABLES
*******************/
var ctx = null;
var imagen;
var radianes;
var BARRA = 32;
var maximoEnemigos = 10;
var teclaPulsada = null;
var tecla = new Array();
var balas_array = new Array();
var enemigos_array = new Array();
var colorEnemigo = ["red", "blue", "black", "white", "yellow", "pink", "purple"];
var colorBala = "red";
var centroX, centroY;
var w, h;
var puntos=0;
var vidas=3;
var finJuego = false;
/******************
OBJETOS
*******************/
function Bala(x,y,radianes){
	this.x = x;
	this.y = y;
	this.w = 5;
	this.velocidad = 8;
	this.color = colorBala;
	this.radianes = radianes;
	this.dibuja = function(){
		ctx.save();
		//console.log(Math.floor(Math.random()*colorBala.length));
		ctx.fillStyle = this.color;
		this.x += Math.cos(this.radianes) * this.velocidad;
		this.y += Math.sin(this.radianes) * this.velocidad;
		ctx.fillRect(this.x, this.y, this.w, this.w);
		ctx.restore();	
	};
}
//
function Tanque(x,y,radius){
	this.x=(x==null)?0:x;
	this.y=(y==null)?0:y;
	this.radius=(radius==null)?0:radius;
	this.scale=1;
	this.rotation=0;
	this.w = 0;
	this.h = 0;
	this.dibuja = function(){ /*-------------------------IMAGENES-------------------------*/
		imagen.src = "/static/imgs/img_tanque/tanque.png";
		imagen.onload = function(){
				this.w = imagen.width;
				this.h = imagen.height;
				var ww = imagen.width/2;
				var hh = imagen.height/2;
				ctx.drawImage(imagen, canvas.width/2-ww, canvas.height/2-hh);	
		}
	}
}
/*** Enemigo ***/
function Enemigo(x, y){
	this.n = 0;
	this.x = x;
	this.y = y;
	this.inicioX = x;
	this.inicioY = y;
	this.estado = 1;
	this.r = 10;
	this.w = this.r * 2;
	this.vive = true;
	this.velocidad = .3+Math.random();
	this.color = colorEnemigo[Math.floor(Math.random()*colorEnemigo.length)];
	this.dibuja = function(){
		if(this.n<100 && this.vive){
			ctx.save();
			//console.log(this.x, this.y);
			ctx.fillStyle = this.color;
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
			ctx.fill();
			this.n+=this.velocidad;
			this.x = centroX*this.n/100 + this.inicioX*(100-this.n)/100;
			this.y = centroY*this.n/100 + this.inicioY*(100-this.n)/100;
			ctx.restore();
		}
	}
}
/******************
FUNCIONES
*******************/
function inicio(){
	tanque.dibuja();
	setTimeout(lanzaEnemigo, 1000);
	anima();	
}
function anima(){
	if(finJuego==false){
		requestAnimationFrame(anima);
		actualiza();
		pinta(radianes);
		colisiones();
	}
}

function actualiza(){
	if(tecla[BARRA]){
		//console.log(balas_array.length);
		balas_array.push(new Bala(centroX+Math.cos(radianes) * 35,
		centroY+Math.sin(radianes) * 35,radianes));	
		tecla[BARRA]=false;
		disparo.play();
	}
}
function colisiones(){
	for(var i=0; i<enemigos_array.length; i++){
		for(var j=0; j<balas_array.length; j++){
			enemigo = enemigos_array[i];
			bala = balas_array[j];
			if(enemigo != null && bala != null){
				if((bala.x > enemigo.x)&& 
					(bala.x < enemigo.x+enemigo.w)&& 
					(bala.y > enemigo.y)&& 
					(bala.y < enemigo.y+enemigo.w)){
						enemigo.vive = false;
						enemigos_array[i] = null;
						balas_array[j] = null;
						puntos += 10;
						boing.play();	
					}
				
			}
		}
		if(enemigos_array[i]!=null){
			enemigo = enemigos_array[i];
			if(enemigo.n>95){
				enemigo.vive = false;
				enemigos_array[i] = null;
				vidas--;
				boom.play();
				if(vidas==0) gameOver();	
			}
		}
	}
}
function lanzaEnemigo() {
	var lado = Math.floor(Math.random()*4)+1;
	var x,y;
	//
	if(lado==1){
		x = -10;
		y = Math.floor(Math.random()*h);
	} else if(lado==2){
		x = Math.floor(Math.random()*w);
		y = -10;
	} else if(lado==3){
		x = w + Math.random()*10;
		y = Math.floor(Math.random()*h);
	} else {
		x = Math.floor(Math.random()*w);
		y = h + Math.random()*10;
	}
	//console.log("Lado: "+lado+" "+x+", "+y+", "+h+" "+w);
	enemigos_array.push(new Enemigo(x, y));
	setTimeout(lanzaEnemigo, 2000);
}
function pinta(radianes){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	score();
	ctx.save();
	ctx.translate(centroX,centroY);
	ctx.scale(tanque.scale,tanque.scale);
	ctx.rotate(radianes);
	ctx.drawImage(imagen,-imagen.width/2,-imagen.height/2);
	ctx.restore();
	//
	//Balas
	for(var i=0; i<balas_array.length; i++){
		if(balas_array[i]!=null){
			//console.log(balas_array[i].y);
			balas_array[i].dibuja();
			//if(balas_array[i].y<0) balas_array[i] = null;	
		}
	}
	//Enemigos
	for(var i=0; i<enemigos_array.length; i++){
		if(enemigos_array[i]!=null){
			//console.log(balas_array[i].y);
			enemigos_array[i].dibuja();	
		}
	}
}
function ajusta(xx, yy){
	var pos = canvas.getBoundingClientRect();
	var x = xx - pos.left;
	var y = yy - pos.top;
	return {x:x, y:y}	
}
function score(){
	ctx.save();
	ctx.fillStyle = "white";
	ctx.clearRect(0,0,canvas.width,40);
	ctx.font = "bold 20px Courier";
	ctx.fillText("SCORE: "+puntos+" VIDAS: "+vidas,10,20);
	ctx.restore();	
}
function mensaje(cadena){
	var lon = (canvas.width-(53*cadena.length))/2;
	ctx.fillStyle = "black";
	ctx.clearRect(0,0,canvas.width, canvas.height);
	ctx.font = "bold 100px Rosewood Std";
	ctx.fillText(cadena,lon,220);	
}
function gameOver(){
	mensaje("Game Over");
	finJuego = true;
	fin.play();
}
/*****************
LISTENERS
******************/
window.requestAnimationFrame=(function(){
	return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			function(callback){window.setTimeout(callback,17);}
})();
document.addEventListener("mousemove",function(e){
	var pos = ajusta(e.clientX,e.clientY);
	var x = pos.x;
	var y = pos.y;
	var dx = x - centroX;
	var dy = y - centroY;
	radianes = Math.atan2(dy, dx);
});
document.addEventListener("keydown",function(e){
	teclaPulsada=e.keyCode;
	tecla[e.keyCode]=true;
});
/*****************
INICIO
******************/
window.onload = function(){
	canvas = document.getElementById("miCanvas");
	if(canvas && canvas.getContext){
		ctx = canvas.getContext("2d");
		if(ctx){
			var boing = document.getElementById("boing");
			var disparo = document.getElementById("disparo");
			var intro = document.getElementById("intro");
			var fin = document.getElementById("fin");
			var boom = document.getElementById("boom");
			w = canvas.width;
			h = canvas.height;
			centroX = w / 2;
			centroY = h / 2;
			imagen = new Image();
			tanque = new Tanque();
			mensaje("TANQUES");
			intro.play();
			setTimeout(inicio,3500);
		} else {
			alert("Error al crear tu contexto");	
		}
	}
}