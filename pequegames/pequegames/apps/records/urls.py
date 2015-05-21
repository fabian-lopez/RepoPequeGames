from django.conf.urls import patterns, url
from .views import consulta_records


urlpatterns = patterns('pequegames.apps.records.views',
	url(r'^consulta/$', consulta_records, name = 'records'),
)