/*Variables para fuegos artificiales*/        
    var canvas, ctx, w, h, particles = [], probability = 0.04,
    xPoint, yPoint;
        
/*fin variables*/

/*Variables para juego de memoria*/
	var cancho = 900;
	var calto = 400;
	var ctx;
	var primeraeleccion = true;
	var primeracarta;
	var segundacarta;
	var colordorso = "rgb(128,0,128)";
	var frontbgcolor = "rgb(245,137,177)"; 
	var colorpoli = "rgb(92,151,184)";
	var colormesa = "rgb(255,255,255)";
	var cardrad = 30;
	var baraja = [];
	var primersx = 30;
	var primersy = 50;
	var margen = 30;
	var cartaancho = 4*cardrad;
	var cartaalto = 4*cardrad;
	var coinciden;
	var tiempoinicio;
  var intentos = 0;

/*Fin variables memoria*/
	
//Carta contiene información de las cartas: la localización y dimensiones e información de identificación
//info de identificación(coincidencia) en este caso es el número de lados para el polígono

function Carta(sx,sy,sancho,salto,info) {
	this.sx = sx;
	this.sy = sy;
	this.sancho = sancho;
	this.salto = salto;
	this.info = info;
	this.dibujar = dibujardorso;
}

//genera la baraja de Cartas con 6 pares de polígonos
function hacerbaraja() {
	var i;
	var acarta;
	var bcarta;
	var cx = primersx;
	var cy = primersy;
	for(i=3;i<9;i++) {
		acarta = new Carta(cx,cy,cartaancho,cartaalto,i);
		baraja.push(acarta);
		bcarta = new Carta(cx,cy+cartaalto+margen,cartaancho,cartaalto,i);
		baraja.push(bcarta);
		cx = cx+cartaancho+ margen;
		acarta.dibujar();
		bcarta.dibujar();
	}
	barajar();
}

function barajar() {
//función encargada de barajar las cartas para modificar su posición aleatoriamente
var i;
var k;
var contenedor;
var dl = baraja.length
var nt;
	for (nt=0;nt<3*dl;nt++) {  //hacer el intercambio 3 veces según baraja.length 
	  i = Math.floor(Math.random()*dl);
	  k = Math.floor(Math.random()*dl);
	  contenedor = baraja[i].info;
	  baraja[i].info = baraja[k].info;
	  baraja[k].info = contenedor;
	}
}

//Policarta producirá la cara de la carta. Dorsocarta producirá el dorso común.
	
function Policarta(sx,sy,rad,n) {
  this.sx = sx;
  this.sy = sy;
  this.rad = rad;
  this.dibujar = dibujarpoli;
  this.n = n;
  this.angulo = (2*Math.PI)/n  
  this.muevela = movgeneral;
  
}

function dibujarpoli() {
	ctx.fillStyle= frontbgcolor;
	ctx.strokeStyle=colordorso;
	ctx.fillRect(this.sx-2*this.rad,this.sy-2*this.rad,4*this.rad,4*this.rad);
	ctx.beginPath();
	ctx.fillStyle=colorpoli;
	var i;
	var rad = this.rad;
	ctx.beginPath();
	ctx.moveTo(this.sx+rad*Math.cos(-.5*this.angulo),this.sy+rad*Math.sin(-.5*this.angulo));
	for (i=1;i<this.n;i++) {
	  ctx.lineTo(this.sx+rad*Math.cos((i-.5)*this.angulo),this.sy+rad*Math.sin((i-.5)*this.angulo));
	}
	ctx.fill();	
}

function movgeneral(dx,dy) {
	this.sx +=dx;
	this.sy +=dy;
}

function dibujardorso() {
	ctx.fillStyle = colordorso;
	ctx.fillRect(this.sx,this.sy,this.sancho,this.salto);	
}

function elige(ev) {
	var mx;
	var my;
	var eleccion1;
	var eleccion2;
	if ( ev.layerX ||  ev.layerX == 0) { // Firefox
   			mx= ev.layerX;
    		my = ev.layerY;
  		} else if (ev.offsetX || ev.offsetX == 0) { // Opera
    		mx = ev.offsetX;
    		my = ev.offsetY;
  		}
	var i;
	for (i=0;i<baraja.length;i++){
		var carta = baraja[i];
		if (carta.sx >=0)  //este es el modo de evitar chequeo pulsando en este espacio
		if ((mx>carta.sx)&&(mx<carta.sx+carta.sancho)&&(my>carta.sy)&&(my<carta.sy+carta.salto)) {
			//comprobar que no se está pulsando en la primera carta
			if ((primeraeleccion)|| (i!=primeracarta)) break;
		}
	}
	if (i<baraja.length) {  //pulsado en una carta
		if (primeraeleccion) {
			primeracarta = i;
			primeraeleccion = false;
			// crea polígono para dibujar
			eleccion1 = new Policarta(carta.sx+cartaancho*.5,carta.sy+cartaalto*.5,cardrad,carta.info);
			eleccion1.dibujar();
		}
		else {
			segundacarta = i;
			eleccion2 = new Policarta(carta.sx+cartaancho*.5,carta.sy+cartaalto*.5,cardrad,carta.info);
			eleccion2.dibujar();
		  	if (baraja[i].info==baraja[primeracarta].info) {
				coinciden = true;
        intentos = intentos +1
				
				var nm = 1+Number(document.record.contador.value);
				document.record.contador.value = String(nm);
        /*intentos*/
				document.record.intentos.value = String(intentos);
          
				if (nm>= .5*baraja.length) {
					var now = new Date();
					var nt = Number(now.getTime());
					
					var segundos = Math.floor(.5+(nt-tiempoinicio)/1000); 
					document.record.tiempo.value = String(segundos);
					//necesario para darvuelta en la última coincidencia
					
          /*Datos finales*/
            /*Espera 6 segundos despues de ganar para guardar los datos en la base de datos! 
              y luego en medio segundo despues limpiar el metodo de guardar para 
              prevenir que no guarde mas de 1 sola vez*/
          myVar = setInterval(function () {
          alert('Felicidades !! Has completado el juego :D\nEl numero de intentos fue de: '+intentos+'\nEl tiempo que te tomo completar el juego fue: ' + segundos+'seg.\n\nAl dar click en OK tu record se guardara automaticamente :\)');
            document.record.submit();}, 6000);
          
          setInterval(function () {clearTimeout(myVar)}, 6500);
            
          
					window.addEventListener("resize", resizeCanvas, false);
			        window.addEventListener("DOMContentLoaded", fuegoo(), false);
			        
			        window.requestAnimationFrame = 
			            window.requestAnimationFrame       || 
			            window.webkitRequestAnimationFrame || 
			            window.mozRequestAnimationFrame    || 
			            window.oRequestAnimationFrame      || 
			            window.msRequestAnimationFrame     || 
			            function (callback) {
			                window.setTimeout(callback, 1000/60);
			            };

				}	
			}
			else {
				coinciden = false;
        intentos = intentos +1;
        document.record.intentos.value = String(intentos);
			}
			primeraeleccion = true;
			tid = setTimeout(darvuelta,1000);

		}
	}
}

function darvuelta() {
	var carta;
	if (!coinciden) {
	baraja[primeracarta].dibujar();
	baraja[segundacarta].dibujar();
	}
	else {
		ctx.fillStyle = colormesa;
				ctx.fillRect(baraja[segundacarta].sx,baraja[segundacarta].sy,baraja[segundacarta].sancho,baraja[segundacarta].salto);
				ctx.fillRect(baraja[primeracarta].sx,baraja[primeracarta].sy,baraja[primeracarta].sancho,baraja[primeracarta].salto);
				baraja[segundacarta].sx = -1;
				baraja[primeracarta].sx = -1;
	}
}

function init(){
  
   ctx = document.getElementById('canvas').getContext('2d'); 
   canvas1 = document.getElementById('canvas');
   canvas1.addEventListener('click',elige,false);
   hacerbaraja();
   document.record.contador.value = "0";
   document.record.tiempo.value = "";
   tiempoinicio = new Date();
   tiempoinicio = Number(tiempoinicio.getTime());
   barajar();
} 

        

/*FUNCIONES para los fuegos artificiales*/
        
        function fuegoo() {
            canvas = document.getElementById("canvas");
            ctx = canvas.getContext("2d");
            resizeCanvas();
            
            window.requestAnimationFrame(updateWorld);
        } // fin de onLoad();
        
        function resizeCanvas() {
            if (!!canvas) {
                w = canvas.width ;
                h = canvas.height;
            }
        } // fin de resizeCanvas();
        
        function updateWorld() {
            update();
            paint();
            window.requestAnimationFrame(updateWorld);
        } // fin de update();
        
        function update() {
            if (particles.length < 500 && Math.random() < probability) {
                createFirework();
            }
            var alive = [];
            for (var i=0; i<particles.length; i++) {
                if (particles[i].move()) {
                    alive.push(particles[i]);
                }
            }
            particles = alive;
        } // fin de update();
        
        function paint() {
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = "rgba(0,0,55,0.2)";
            ctx.fillRect(0, 0, w, h);
            ctx.globalCompositeOperation = 'lighter';
            for (var i=0; i<particles.length; i++) {
                particles[i].draw(ctx);
            }
        } // fin de paint();
        
        function createFirework() {
            xPoint = Math.random()*(w-200)+100;
            yPoint = Math.random()*(h-200)+100;
            var nFire = Math.random()*50+100;
            var c = "rgb("+(~~(Math.random()*200+55))+","
                 +(~~(Math.random()*200+55))+","+(~~(Math.random()*200+55))+")";
            for (var i=0; i<nFire; i++) {
                var particle = new Particle();
                particle.color = c;
                var vy = Math.sqrt(25-particle.vx*particle.vx);
                if (Math.abs(particle.vy) > vy) {
                    particle.vy = particle.vy>0 ? vy: -vy;
                }
                particles.push(particle);
            }
        } // fin de createParticles();
        
        function Particle() {
            this.w = this.h = Math.random()*4+1;
            // Position
            this.x = xPoint-this.w/2;
            this.y = yPoint-this.h/2;
            // Velocidades x e y entre -5 y +5
            this.vx = (Math.random()-0.5)*10;
            this.vy = (Math.random()-0.5)*10;
            // Tiempo de vida
            this.alpha = Math.random()*.5+.5;
            // color
            this.color;
        } // fin de Particle();
        
        Particle.prototype = {
            gravity: 0.05,
            move: function () {
                this.x += this.vx;
                this.vy += this.gravity;
                this.y += this.vy;
                this.alpha -= 0.01;
                if (this.x <= -this.w || this.x >= screen.width ||
                    this.y >= screen.height ||
                    this.alpha <= 0) {
                        return false;
                }
                return true;
            },
            draw: function (c) {
                c.save();
                c.beginPath();
                
                c.translate(this.x+this.w/2, this.y+this.h/2);
                c.arc(0, 0, this.w, 0, Math.PI*2);
                c.fillStyle = this.color;
                c.globalAlpha = this.alpha;
                
                c.closePath();
                c.fill();
                c.restore();
            }
        } // fin de Particle.prototype;