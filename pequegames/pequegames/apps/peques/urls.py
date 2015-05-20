from .views import registropeque, consulta_peques
from django.conf.urls import patterns, url

urlpatterns = patterns('pequegames.apps.peques.views',
	url(r'^registro/$', registropeque, name = 'registroPeque_view'),
  url(r'^consulta/$', consulta_peques, name = 'consulta_peques_view'),
)