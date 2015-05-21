from django.conf.urls import patterns, url
from .views import registro, WEBjson_view, WEBxml_view


urlpatterns = patterns('pequegames.apps.tutores.views',
	url(r'^registro/$', registro.as_view(), name = 'registroTutor_view'),
  url(r'^WEBjson/$', WEBjson_view, name = 'datosjson'),
	url(r'^WEBxml/$', WEBxml_view, name = 'datosxml'),
)