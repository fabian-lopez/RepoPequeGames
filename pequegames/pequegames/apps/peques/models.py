from django.db import models
from pequegames.apps.tutores.models import Tutores
from django.contrib.auth.models import User

# Create your models here.
class Peques(models.Model):
  tutor=models.ForeignKey(Tutores)
  nombre=models.OneToOneField(User)
  edad=models.IntegerField()
  escolaridad=models.CharField(max_length=100)
  fecha=models.DateTimeField(auto_now_add= True, blank = False)

  def __unicode__(self):
    return '%s' %(self.nombre)