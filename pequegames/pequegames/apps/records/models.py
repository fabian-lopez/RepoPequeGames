from django.db import models
from pequegames.apps.peques.models import Peques

# Create your models here.
class Records(models.Model):
  peque=models.ForeignKey(Peques)
  fecha=models.DateTimeField(auto_now_add= True)
  juego=models.CharField(max_length=40)
  record=models.IntegerField()
  tiempo=models.IntegerField()
  habilidad=models.CharField(max_length=50)
  def __unicode__(self):
    return "%s %s" %(self.juego, self.record)