from django import forms
from django.contrib.auth.forms import UserCreationForm

school = (
  ('educaciontemprana','Educacion Temprana'),
  ('preescolar','Preescolar'),
  ('primaria','Primaria'),
)

class Peques_form(UserCreationForm):
  edad 		    	=	forms.IntegerField(widget = forms.NumberInput())
  escolaridad 	=	forms.ChoiceField(choices= school)
  def clean(self):
    return self.cleaned_data
