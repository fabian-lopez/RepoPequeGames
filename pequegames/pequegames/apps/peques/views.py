from django.shortcuts import render_to_response
from django.template import RequestContext
#Vistas
from django.views.generic import FormView
#formas
from .forms import Peques_form
#modelos
from .models import Peques
from pequegames.apps.tutores.models import Tutores
# Redireccionamientos
from django.core.urlresolvers import reverse_lazy
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.core import serializers
from django.http import HttpResponse
from django.core.exceptions import ObjectDoesNotExist

# Create your views here.
def registropeque(request):
  try:
    u = ''
    usuarioid = 0
    if request.user.is_authenticated() and not request.user.is_superuser:
      u = request.user.username
      u=User.objects.get(username=u)
      idusuario=Tutores.objects.get(nombre__username=u)

    if request.method == "POST":
      form = Peques_form(request.POST)
      if form.is_valid():
        peque=form.save()
        p=Peques()
        p.nombre=peque
        age=form.cleaned_data['edad']
        edu=form.cleaned_data['escolaridad']
        p.tutor=idusuario
        p.edad=age
        p.escolaridad=edu
        p.save()
        informacion = 'Peque Registrado exitosamente!'
        form = Peques_form()
        ctx ={'form':form, 'info':informacion}
        return render_to_response('peques/registroPeque.html', ctx, context_instance = RequestContext(request))
      else:
        informacion = 'Verificar datos! :('
        form = Peques_form()
        ctx ={'form':form, 'info':informacion}
        return render_to_response('peques/registroPeque.html', ctx, context_instance = RequestContext(request))
  except ObjectDoesNotExist:
    return render_to_response('home/index.html', context_instance = RequestContext(request))


  form = Peques_form()
  ctx ={'form':form}
  return render_to_response('peques/registroPeque.html', ctx, context_instance = RequestContext(request))



def consulta_peques(request):
  try:
    u = request.user.username
    idusuario=Tutores.objects.get(nombre__username=u)
    informacion = ""
    ctx ={'peques': Peques.objects.filter(tutor=idusuario), 'info':informacion}
    return render_to_response('peques/consulta.html', ctx, context_instance = RequestContext(request))
  except ObjectDoesNotExist:
    informacion = "Aun no tiene Peques registrados!"
    ctx={'info':informacion}
    return render_to_response('peques/consulta.html', ctx, context_instance = RequestContext(request))



#vista Json
def WEBjson_view(request):
	data = serializers.serialize("json",Peques.objects.all())
	return HttpResponse(data, content_type = 'application/json')



def WEBxml_view(request):
	data = serializers.serialize("xml",Peques.objects.all())
	return HttpResponse(data, content_type = 'application/xml')
