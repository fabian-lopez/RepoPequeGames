from django.conf.urls import url, patterns
from .views import juegos_view, memoria_view, snake_view, yetti_view

urlpatterns = patterns ('pequegames.apps.juegos.views',
	url(r'^home/$', juegos_view, name = 'juegos_view'),
	#url(r'^razonamiento/$', razonamiento_view, name = 'razonamiento_view'),
	#url(r'^logica/$', logica_view, name = 'logica_view'),
	#url(r'^matematicas/$', matematicas_view, name = 'matematicas_view'),
	#url(r'^agilidad/$', agilidad_view, name = 'agilidad_view'),
	url(r'^agilidad/memoria/$', memoria_view, name = 'memoria_view'),
  url(r'^agilidad/snake/$',snake_view, name = 'snake_view'),                  
  url(r'^agilidad/yetti/$',yetti_view, name = 'yetti_view'),                     
)