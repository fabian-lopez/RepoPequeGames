from django.db import models
from pequegames.apps.peques.models import Peques

# Create your models here.
class Insignias(models.Model):
	nombre 			=	models.CharField(max_length=50)
	insignia 		= 	models.ImageField()
	descripcion 	= 	models.CharField(max_length=100)

	def __unicode__(self):
		return self.nombre



class Logros(models.Model):
	peque 			=	models.ManyToManyField(Peques)
	insignia 		=	models.ForeignKey(Insignias)
	fecha 			=	models.DateField()

	def __unicode__(self):
		return '%s %s' %(self.peque, self.insignia)