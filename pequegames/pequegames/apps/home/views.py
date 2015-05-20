from django.shortcuts import render_to_response
from django.template import RequestContext
# Redireccionadores
from django.core.urlresolvers import reverse_lazy

# Create your views here.
def index_view(request):
	return render_to_response('home/index.html', context_instance = RequestContext(request))

