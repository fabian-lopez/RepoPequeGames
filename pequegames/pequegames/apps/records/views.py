from django.shortcuts import render_to_response
from django.template import RequestContext
#modelos
from .models import Records
# Redireccionamientos
from django.core.exceptions import ObjectDoesNotExist

# Create your views here.
def consulta_records(request):
  try:
    informacion = ""
    ctx ={'records': Records.objects.all(), 'info':informacion}
    return render_to_response('records/records.html', ctx, context_instance = RequestContext(request))
  except ObjectDoesNotExist:
    informacion = "No se encontraron registros!"
    ctx={'info':informacion}
    return render_to_response('records/records.html', ctx, context_instance = RequestContext(request))