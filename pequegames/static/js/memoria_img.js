/*** Variables ****/
var ctx, canvas;
var primerCarta = true;
var cartaPrimera, cartaSegunda;
var colorDelante = "white";
var colorAtras = "purple";
var colorCanvas = "green";
var inicioX = 45;
var inicioY = 50;
var cartaMargen = 30;
var cartaLon = 30;
var cartaAncho = 100;
var cartaLargo = 140;
var cartas_array = new Array();
var iguales = false;
var cartas = 0;
var pares = 0;

/*Disque variables a registrar*/
var tiempoinicio;
var intentos = 0;
/*-----------------------------*/

/***** FUNCIONES ****/
function Carta(x, y, ancho, largo, img, info){
	this.x = x;
	this.y = y;
	this.ancho = ancho;
	this.largo = largo;
	this.info = info;
	this.img = img;
	this.dibuja = dibujaCarta;	
}
function dibujaCarta(){
	ctx.fillStyle = colorAtras;
	ctx.fillRect(this.x, this.y, this.ancho, this.largo);	
}
function tablero(archivos){
	var i;
	var carta;
	var x = inicioX;
	var y = inicioY;
	pares = archivos.length / 2;
	for(i=0; i<archivos.length; i+=2){
		img = "/static/imgs/img_memoria/"+archivos[i];
		carta = new Carta(x, y, cartaAncho, cartaLargo, img, i);
		cartas_array.push(carta);
		carta.dibuja();
		//Creamos la segunda carta
		img = "/static/imgs/img_memoria/"+archivos[i+1];
		carta = new Carta(x, y+cartaLargo+cartaMargen, 
		cartaAncho, cartaLargo, img, i);
		cartas_array.push(carta);
		carta.dibuja();
		//Aumentamos el valos de x
		x += cartaAncho + cartaMargen;
	}
}
function barajea(){
	var i, j, k;
	var temporalInfo, temporalImg;
	var lon = cartas_array.length;
	for(j=0; j<lon*3; j++){
		i = Math.floor(Math.random()*lon);
		k = Math.floor(Math.random()*lon);	
		//
		temporalInfo = cartas_array[i].info;
		temporalImg = cartas_array[i].img;
		//
		cartas_array[i].info = cartas_array[k].info;
		cartas_array[i].img = cartas_array[k].img;
		//
		cartas_array[k].info = temporalInfo;
		cartas_array[k].img = temporalImg;
	}
}
function ajusta(xx, yy){
	var posCanvas = canvas.getBoundingClientRect();
	var x = xx - posCanvas.left;
	var y = yy - posCanvas.top;
	return {x:x, y:y}
}
function selecciona(e){
	var pos = ajusta(e.clientX, e.clientY);
	//alert(pos.x+", "+pos.y);
	for(var i=0; i<cartas_array.length; i++){
		var carta = cartas_array[i];
		if(carta.x > 0){
			if(
			(pos.x > carta.x) && 
			(pos.x < carta.x+carta.ancho) && 
			(pos.y > carta.y) && 
			(pos.y < carta.y+carta.largo)){	
				if((primerCarta)||(i!=cartaPrimera)) break;	
			}
		}
	}
	//Encontramos la carta
	if(i<cartas_array.length){
		if(primerCarta){
			cartaPrimera = i;
			primerCarta = false;
			pinta(carta);
		} else {
			cartaSegunda = i;
			pinta(carta);
			primerCarta = true;
			if(cartas_array[cartaPrimera].info==cartas_array[cartaSegunda].info){
				iguales = true;	
        /*INTENTOS intentos imprime intentos aumenta cuando elige dos cartas, en este caso son iguales y es un acierto*/
  intentos = intentos +1
  document.record.intentos.value = String(intentos);
				cartas++;
				aciertos();
			} else {
				iguales = false;
        /*INTENTOS intentos imprime intentos, aumenta cuando elige dos cartas, en este caso no son iguales*/
  intentos = intentos +1
  document.record.intentos.value = String(intentos);
			}
			setTimeout(volteaCarta,1000);
		}
	}
}
function volteaCarta(){
	if(cartas<pares){
		if(iguales==false){	
			cartas_array[cartaPrimera].dibuja();	
			cartas_array[cartaSegunda].dibuja();
		} else {
			ctx.clearRect(cartas_array[cartaPrimera].x,cartas_array[cartaPrimera].y, cartas_array[cartaPrimera].ancho, cartas_array[cartaPrimera].largo);
			ctx.clearRect(cartas_array[cartaSegunda].x,cartas_array[cartaSegunda].y, cartas_array[cartaSegunda].ancho, cartas_array[cartaSegunda].largo);
			cartas_array[cartaPrimera].x = -1;
			cartas_array[cartaSegunda].x = -1;	
		}
	}  else {
		ctx.fillStyle = "black";
		ctx.font = "bold 80px Comic";
		ctx.clearRect(0,0, canvas.width, canvas.height);
		ctx.fillText("Muy bien, ¡eres un genio!", 60, 220);
    
    /*ganaste  - has ganado - win - variables de tiempo variables de salida (record)*/
    
    var now = new Date();
		var nt = Number(now.getTime());
    
    var segundos = Math.floor(.5+(nt-tiempoinicio)/1000); 
		document.record.tiempo.value = String(segundos);
    document.record.intentos.value = String(intentos);
    
    /*Datos finales*/
            /*Espera 6 segundos despues de ganar para guardar los datos en la base de datos! 
              y luego en medio segundo despues limpiar el metodo de guardar para 
              prevenir que no guarde mas de 1 sola vez*/
          myVar = setInterval(function () {
          alert('Felicidades !! Has completado el juego :D\nEl numero de intentos fue de: '+intentos+'\nEl tiempo que te tomo completar el juego fue: ' + segundos+'seg.\n\nAl dar click sobre \"OK\ se guardara automaticamente tu record.\nEspero hayas disfrutado de este juego. Pronto tendremos mas versiones  :\)');
            document.record.submit();}, 1000);
          
          setInterval(function () {clearTimeout(myVar)}, 2200);
    /*Fin ganaste xD*/
	}
}
function pinta(carta){
	ctx.fillStyle = colorDelante;
	ctx.fillRect(carta.x, carta.y, carta.ancho, carta.largo); 
	var imagen = new Image();
	imagen.src = carta.img;
	imagen.onload = function(){
		ctx.drawImage(imagen, carta.x, carta.y, carta.ancho, carta.largo);	
	}
}
function aciertos(){
	ctx.fillStyle = "black";
	ctx.save();
	ctx.clearRect(0,390, canvas.width/2, 100);
	ctx.font = "bold 40px Comic";
	ctx.fillText("Aciertos: "+String(cartas), 30, 420);
	ctx.restore();
}
/*** TO DO ***/
window.onload = function(){
	canvas = document.getElementById("miCanvas");
	if(canvas && canvas.getContext){
		ctx = canvas.getContext("2d");
		if(ctx){
			if (window.File && window.FileReader && window.FileList && window.Blob) {
				var control = document.getElementById("archivos");
				control.addEventListener("change", function(event) {
					var archivos = control.files;
					var archivo = archivos[0];
					var lector = new FileReader();
					lector.onload = function(event) {
						var cadena = event.target.result;
						var archivos_array = cadena.split(",");
						tablero(archivos_array);
					    barajea();
					    aciertos();
            /*VARIABLE TIEMPO DE INICIO :D*/
              tiempoinicio = new Date();
              tiempoinicio = Number(tiempoinicio.getTime());
					};
					lector.onerror = function(event) {
						console.error("No se pudo leer el archivo Código " + 
						event.target.error.code);
					};
					lector.readAsText(archivo);
				}, false);	
			    canvas.addEventListener("click",selecciona,false);
			} else {
			  alert('Tu navegador no soporta el API de lectura de archivo.');
			}
		} else {
			alert("Error al crear tu contexto");	
		}
	}
}