from django.shortcuts import render_to_response
from django.template import RequestContext
# Redireccionadores
from django.core.urlresolvers import reverse_lazy

# Create your views here.
def juegos_view(request):
	return render_to_response('juegos/juegos.html', context_instance = RequestContext(request))

def memoria_view(request):
	return render_to_response('juegos/memoria.html', context_instance = RequestContext(request))

def snake_view(request):
	return render_to_response('juegos/snake.html', context_instance = RequestContext(request))

def yetti_view(request):
	return render_to_response('juegos/yetti.html', context_instance = RequestContext(request))


