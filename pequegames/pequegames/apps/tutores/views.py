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
    t.email=form.cleaned_data['email']
    t.telefono=form.cleaned_data['telefono']
    t.foto=form.cleaned_data['foto']
    t.save()
    return super(registro,self).form_valid(form)