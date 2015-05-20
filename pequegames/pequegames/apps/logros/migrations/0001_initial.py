# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('peques', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Insignias',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('nombre', models.CharField(max_length=50)),
                ('insignia', models.ImageField(upload_to=b'')),
                ('descripcion', models.CharField(max_length=100)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Logros',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('fecha', models.DateField()),
                ('insignia', models.ForeignKey(to='logros.Insignias')),
                ('peque', models.ManyToManyField(to='peques.Peques')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
