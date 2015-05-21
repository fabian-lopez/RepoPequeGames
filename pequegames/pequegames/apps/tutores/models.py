from django.db import models
from django.contrib.auth.models import User
from django.db.models import fields

class Tutores(models.Model):
  nombre=models.OneToOneField(User)
  edad=models.IntegerField()
  email=models.EmailField()
  telefono=models.BigIntegerField(blank=True, null=True)
  fecha=models.DateTimeField(auto_now_add= True, blank = False)
  foto=models.ImageField(upload_to = 'usuarios', blank=True, null=True)
  def __unicode__(self):
		return self.nombre.username

class BigIntegerField(fields.IntegerField):
    def db_type(self):
        if settings.DATABASE_ENGINE == 'mysql':
            return "bigint"
        elif settings.DATABASE_ENGINE == 'oracle':
            return "NUMBER(19)"
        elif settings.DATABASE_ENGINE[:8] == 'postgres':
            return "bigint"
        else:
            raise NotImplemented
    
    def get_internal_type(self):
        return "BigIntegerField"
    
    def to_python(self, value):
        if value is None:
            return value
        try:
            return long(value)
        except (TypeError, ValueError):
            raise exceptions.ValidationError(
                _("This value must be a long integer."))