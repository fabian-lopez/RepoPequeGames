from django.conf.urls import url, patterns
from .views import index_view

urlpatterns = patterns('pequegames.apps.home.views',
	url(r'^$', index_view, name = 'index' ),
)