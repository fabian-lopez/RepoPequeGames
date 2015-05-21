from django.conf.urls import url, patterns
from .views import juegos_view, memoria_view, numeros_view, yetti_view, deduccion_view, ahorcado_view, memoria_img_view, tanque_view, nave_view, simondice_view, gato_view

urlpatterns = patterns ('pequegames.apps.juegos.views',
	url(r'^home/$', juegos_view, name = 'juegos_view'),
	url(r'^agilidad/memoria/$', memoria_view, name = 'memoria_view'),
  url(r'^matematicas/numeros/$',numeros_view, name = 'numeros_view'),                  
  url(r'^agilidad/yetti/$',yetti_view, name = 'yetti_view'),
  url(r'^razonamiento/deduccion/$',deduccion_view, name = 'deduccion_view'),
  url(r'^razonamiento/ahorcado/$',ahorcado_view, name = 'deduccion_view'),
  url(r'^logica/memoria_img/$',memoria_img_view, name = 'memoria_img_view'),
  url(r'^agilidad/tanque/$',tanque_view, name = 'tanque_view'),
  url(r'^agilidad/nave/$',nave_view, name = 'nave_view'),
  url(r'^agilidad/simondice/$',simondice_view, name = 'simondice_view'),
  url(r'^logica/gato/$',gato_view, name = 'gato_view'),
)