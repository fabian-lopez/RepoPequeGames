from django.conf.urls import patterns, url
from .views import registro


urlpatterns = patterns('pequegames.apps.tutores.views',
	url(r'^tutores/registro/$', registro.as_view(), name = 'registroTutor_view'),
)