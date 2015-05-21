var ctx, canvas;
var cuadroW = 150;
var cuadroH = 150;
var inicioX = 50;
var inicioY = 100;
var margen = 30;
var marco = 10;
var cuadros_array = new Array();
var colores_array = new Array("red", "yellow", "blue", "purple", "cyan");
var numCuadros = colores_array.length;
var cuadro;
var secuencia_array = new Array();
var repiteSecuencia = true;
var n, m;

/*Disque variables a registrar*/
var tiempoinicio;
var intentos = 0;
/*-----------------------------*/
//
function Cuadro(x, y, w, h, nota, color){
	this.x = x;	
	this.y = y;
	this.w = w;
	this.h = h;
	this.nota = nota;
	this.color = color;
	this.dibuja = dibujaCuadro;
	this.dibujaGrande = dibujaCuadroGrande;
}
function dibujaCuadro(){
    ctx.fillStyle = this.color;
	ctx.clearRect(this.x-marco, this.y-marco, this.w+marco*2, this.h+marco*2);
	ctx.fillRect(this.x, this.y, this.w, this.h);
}
function dibujaCuadroGrande(){
    ctx.fillStyle = this.color;
	ctx.fillRect(this.x-marco, this.y-marco, this.w+marco*2, this.h+marco*2);
}
function ajusta(xx, yy){
	var posCanvas = canvas.getBoundingClientRect();
	var x = xx - posCanvas.left;
	var y = yy - posCanvas.top;
	return {x:x, y:y}
}
function selecciona(e){
	var pos = ajusta(e.clientX, e.clientY);	
	var x = pos.x;
	var y = pos.y;
	//
	for(var i=0; i<cuadros_array.length; i++){
		cuadro = cuadros_array[i];
		if((x >cuadro.x)&&(x<cuadro.x+cuadro.w)&&(y>cuadro.y)&&(y<cuadro.y+cuadro.h)){
			break;
		}
	}
	if(i<cuadros_array.length){
		if(i==secuencia_array[m]){
			ejecutaNota(i);
		} else {
			gameOver();
		}
	} 
}
function ejecutaNota(i){
	if(i==0) nota1.play();
	if(i==1) nota2.play();
	if(i==2) nota3.play();
	if(i==3) nota4.play();
	if(i==4) nota5.play();
	cuadro = cuadros_array[i];
	cuadro.dibujaGrande();
	setTimeout(regresa,600);	
}
function regresa(){
	cuadro.dibuja();
	if(repiteSecuencia){
		setTimeout(secuencia,600);	
	} else {
		m++;
		if(m==secuencia_array.length){
			mensaje("Muy bien, tienes "+m+" puntos");
			m = 0;
			setTimeout(creaSecuencia,1000);	
      document.record.contador.value = String(m);
        /*intentos*/
				document.record.tiempo.value = String(m);
		}
	}
}
function mensaje(cadena){
	var lon = (canvas.width-(18*cadena.length))/2;
	ctx.fillStyle = "black";
	ctx.clearRect(0,280,canvas.width,100);
	ctx.font = "bold 30px Courier";
	ctx.fillText(cadena,lon,310);	
}
function creaSecuencia(){
	repiteSecuencia = true;
	mensaje("Observa y escucha la secuencia de la computadora");
	canvas.removeEventListener("click", selecciona, false);
	secuencia_array.push(Math.floor(Math.random()*numCuadros));
	console.log(secuencia_array.length);
	n = -1;
	setTimeout(secuencia,500);	
}
function secuencia(){
	n++;
	if(n==secuencia_array.length){
		n = 0;
		m = 0;
		repiteSecuencia = false;
		mensaje("Ahora repite la secuencia");
		canvas.addEventListener("click", selecciona, false);
	} else {
		ejecutaNota(secuencia_array[n]);
	}
}
function gameOver(){
  var puntos = secuencia_array.length-1
	mensaje("Fin del juego, obtuviste "+puntos+" puntos");
	fin.play();
	canvas.removeEventListener("click", selecciona, false);	
  
  /*Variables finales de Tiempo --------------------------------------------*/
  var now = new Date();
	var nt = Number(now.getTime());
  
	var segundos = Math.floor(.5+(nt-tiempoinicio)/1000); 
	document.record.tiempo.value = String(segundos);
  
  document.record.contador.value = puntos
  
   /*Datos finales*/
   /*Espera 6 segundos despues de ganar para guardar los datos en la base de datos! 
   y luego en medio segundo despues limpiar el metodo de guardar para 
   prevenir que no guarde mas de 1 sola vez*/
   myVar = setInterval(function () {
   alert('Felicidades !! Has completado el juego :D\nPuntos obtenidos: '+puntos+'\nEl tiempo que te tomo completar el juego fue: ' + segundos+'seg.\n\nAl dar click en OK tu record se guardara automaticamente :\)');
   document.record.submit();}, 1100);
          
   setInterval(function () {clearTimeout(myVar)}, 1300);
  /*Variables finales de Tiempo ------------------------------------------ */
}
window.onload = function(){
	canvas = document.getElementById("miCanvas");
	if(canvas && canvas.getContext){
		ctx = canvas.getContext("2d");
		if(ctx){
			 var nota1 = document.getElementById("nota1");
			 var nota2 = document.getElementById("nota2");
			 var nota3 = document.getElementById("nota3");
			 var nota4 = document.getElementById("nota4");
			 var nota5 = document.getElementById("nota5");
			 var fin = document.getElementById("fin");
			 //
			 for(var i=0; i<numCuadros; i++){
				 cuadros_array.push(
					 new Cuadro(
						 inicioX+(cuadroW+margen)*i, 
						 inicioY, 
						 cuadroW, 
						 cuadroH, 
						 i, 
						 colores_array[i])
					 );
				cuadros_array[i].dibuja();
			 }
      /* Variables inidciales -----------------------------------*/
       document.record.contador.value = "0";
       document.record.tiempo.value = "";
       tiempoinicio = new Date();
       tiempoinicio = Number(tiempoinicio.getTime());
      /* Variables inidciales -----------------------------------*/
			 creaSecuencia();
		} else {
			alert("Error al crear tu contexto");	
		}
	}
}