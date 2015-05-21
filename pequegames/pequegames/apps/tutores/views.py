from django.shortcuts import render_to_response
from django.template import RequestContext
# Usuarios
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.decorators import login_required
#Vistas
from django.views.generic import TemplateView, CreateView, FormView
#formas
from .forms import Tutores_form
#modelos
from .models import Tutores
# Redireccionamientos
from django.core.urlresolvers import reverse_lazy
from django.core.mail import EmailMessage
from django.core import serializers
from django.http import HttpResponse

# Create your views here.
class registro(FormView):
  template_name 	= 	'tutores/registrarse.html'
  form_class 		=	Tutores_form
  success_url		=	reverse_lazy('login')
  def form_valid(self,form):
    tutor=form.save()
    t=Tutores()
    t.nombre=tutor
    t.edad=form.cleaned_data['edad']
    correo=form.cleaned_data['email']
    t.email=correo
    t.telefono=form.cleaned_data['telefono']
    t.foto=form.cleaned_data['foto']
    t.save()
    msg=EmailMessage(
			subject='Gracias por registrarte: PEQUEGAMES',
			from_email = 'aprendepequegames@gmail.com',
			body='Felicidades: %s, Esperamos que nuestra pageWEB sea de gran ayuda para el desarrollo de habilidades de sus peques, cualquier recomendacion nos puede contactar en el siguiente correo: aprendepequegames@gmail.com Muchos saludos y miles de gracias, PequeGames :D!!!' %(tutor),
			to= [correo])
    #msg.template_name='welcome'
			#msg.template_content={'std_content00':'<h1>Bienvenido%s</h1>'%request.user}
    msg.send()
    return super(registro,self).form_valid(form)

  #vista Json
def WEBjson_view(request):
	data = serializers.serialize("json",Tutores.objects.all())
	return HttpResponse(data, content_type = 'application/json')

def WEBxml_view(request):
	data = serializers.serialize("xml",Tutores.objects.all())
	return HttpResponse(data, content_type = 'application/xml')