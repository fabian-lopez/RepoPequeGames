# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('peques', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Records',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('fecha', models.DateField()),
                ('juego', models.CharField(max_length=40)),
                ('record', models.IntegerField()),
                ('tiempo', models.TimeField()),
                ('habilidad', models.CharField(max_length=50)),
                ('peque', models.ForeignKey(to='peques.Peques')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
