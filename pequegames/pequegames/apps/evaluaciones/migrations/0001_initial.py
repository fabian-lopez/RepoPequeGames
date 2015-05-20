# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('peques', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Evaluaciones',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('fecha', models.DateField()),
                ('progreso', models.IntegerField()),
                ('habilidad', models.CharField(max_length=40)),
                ('comentarios', models.CharField(max_length=100)),
                ('ulti_calif', models.IntegerField(default=0)),
                ('promedio', models.FloatField()),
                ('peque', models.ForeignKey(to='peques.Peques')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
