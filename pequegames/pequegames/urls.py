from django.conf.urls import patterns, include, url
from django.contrib import admin
import settings

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'pequegames.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    
    #Urls para login y logout
    url(r'^login/$', 'django.contrib.auth.views.login', 
  		{'template_name':'home/login.html',}, name = 'login'),
  	url(r'^cerrar/$', 'django.contrib.auth.views.logout_then_login',name = 'logout'),

  	#URLS CONF
  		#URL MEDIA 
  	url(r'^media/(?P<path>.*)$','django.views.static.serve',{'document_root':settings.MEDIA_ROOT,}),
    url(r'^admin/', include(admin.site.urls)),

    # URLS APLICACIONES
   	url(r'^', include('pequegames.apps.home.urls')),
    url(r'^tutores/', include('pequegames.apps.tutores.urls')),
    url(r'^peque/', include('pequegames.apps.peques.urls')),
    url(r'^juegos/', include('pequegames.apps.juegos.urls')),
    url(r'^records/', include('pequegames.apps.records.urls')),
)
