from django import forms
from django.contrib.auth.forms import UserCreationForm

class Tutores_form(UserCreationForm):
  edad=forms.IntegerField(widget= forms.NumberInput())
  email=forms.EmailField(widget=forms.EmailInput())
  telefono=forms.IntegerField(widget=forms.NumberInput())
  foto=forms.ImageField()