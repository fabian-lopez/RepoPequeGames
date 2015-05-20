from django.db import models
from pequegames.apps.peques.models import Peques
# Create your models here.
class Evaluaciones(models.Model):
	peque 		=	models.ForeignKey(Peques)
	fecha 		=	models.DateField()
	progreso	=	models.IntegerField()
	habilidad 	=	models.CharField(max_length=40)
	comentarios = 	models.CharField(max_length=100)
	ulti_calif 	=	models.IntegerField(default=0)
	promedio 	=	models.FloatField()

	def __unicode__(self):
		return "%s %s %s" %(self.promedio, self.progreso, self.fecha)
