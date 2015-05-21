from django.shortcuts import render_to_response
from django.template import RequestContext
# Redireccionadores
from django.core.urlresolvers import reverse_lazy
from pequegames.apps.records.models import Records
from pequegames.apps.peques.models import Peques
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist

# Create your views here.
def juegos_view(request):
	return render_to_response('juegos/juegos.html', context_instance = RequestContext(request))

#----------------------------------------------------Memoria Figuras
def memoria_view(request, *args, **kwargs):
  u = ''
  usuarioid = 0
  try:
    if request.user.is_authenticated() and not request.user.is_superuser:
      u = request.user.username
      u=User.objects.get(username=u)
      idusuario=Peques.objects.get(nombre__username=u)
      print idusuario

      if request.method=='POST':
        #peque= 
        attemp=request.POST.get('intentos')
        print attemp
        time=request.POST.get('tiempo')
        print time
        game='memoria figuras'
        hability='matematicas'
        R=Records()
        R.peque=idusuario
        R.record=attemp
        R.tiempo=time
        R.juego=game
        R.habilidad=hability
        R.save()
        return render_to_response('juegos/memoria.html', context_instance = RequestContext(request))
      return render_to_response('juegos/memoria.html', context_instance = RequestContext(request))
    else:
      return render_to_response('juegos/memoria.html', context_instance = RequestContext(request))
  except ObjectDoesNotExist:
    return render_to_response('juegos/memoria.html', context_instance = RequestContext(request))


#----------------------------------------------------Memoria Imagenes
def memoria_img_view(request, *args, **kwargs):
  u = ''
  usuarioid = 0
  try:
    if request.user.is_authenticated() and not request.user.is_superuser:
      u = request.user.username
      u=User.objects.get(username=u)
      idusuario=Peques.objects.get(nombre__username=u)
      print idusuario

      if request.method=='POST':
        #peque= 
        attemp=request.POST.get('intentos')
        print attemp
        time=request.POST.get('tiempo')
        print time
        
        game='memoria imagenes'
        hability='logica'
        print '\nIntentos: '+attemp+'\nTiempo: '+time+'\nJuego: '+game+'\nHabilidad: '+hability

        R=Records()
        R.peque=idusuario
        R.record=attemp
        R.tiempo=time
        R.juego=game
        R.habilidad=hability
        R.save()
        return render_to_response('juegos/img_memoria.html', context_instance = RequestContext(request))
      return render_to_response('juegos/img_memoria.html', context_instance = RequestContext(request))
    else:
      return render_to_response('juegos/img_memoria.html', context_instance = RequestContext(request))
  except ObjectDoesNotExist:
    return render_to_response('juegos/img_memoria.html', context_instance = RequestContext(request))

def simondice_view(request, *args, **kwargs):
  u = ''
  usuarioid = 0
  try:
    if request.user.is_authenticated() and not request.user.is_superuser:
      u = request.user.username
      u=User.objects.get(username=u)
      idusuario=Peques.objects.get(nombre__username=u)
      print idusuario

      if request.method=='POST':
        #peque= 
        attemp=request.POST.get('contador')
        print attemp
        time=request.POST.get('tiempo')
        print time
        
        game='simon dice'
        hability='agilidad'
        print '\Puntos: '+attemp+'\nTiempo: '+time+'\nJuego: '+game+'\nHabilidad: '+hability

        R=Records()
        R.peque=idusuario
        R.record=attemp
        R.tiempo=time
        R.juego=game
        R.habilidad=hability
        R.save()
        return render_to_response('juegos/simondice.html', context_instance = RequestContext(request))
      return render_to_response('juegos/simondice.html', context_instance = RequestContext(request))
    else:
      return render_to_response('juegos/simondice.html', context_instance = RequestContext(request))
  except ObjectDoesNotExist:
    return render_to_response('juegos/simondice.html', context_instance = RequestContext(request))

# Listo para agregar mas cosas a esta vista
def deduccion_view(request):
	return render_to_response('juegos/deduccion.html', context_instance = RequestContext(request))

def ahorcado_view(request):
  return render_to_response('juegos/ahorcado.html', context_instance = RequestContext(request))

def numeros_view(request):
  return render_to_response('juegos/numeros.html', context_instance = RequestContext(request))

def tanque_view(request):
  return render_to_response('juegos/tanque.html', context_instance = RequestContext(request))

def nave_view(request):
  return render_to_response('juegos/nave.html', context_instance = RequestContext(request))

def gato_view(request):
  return render_to_response('juegos/gato.html', context_instance = RequestContext(request))

# Pendiente ... No funciona ------------------------------------------------------------
def yetti_view(request):
	return render_to_response('juegos/yetti.html', context_instance = RequestContext(request))


