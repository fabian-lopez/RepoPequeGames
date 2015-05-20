# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tutores', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Peques',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('nombre', models.CharField(max_length=60)),
                ('edad', models.IntegerField()),
                ('escolaridad', models.CharField(max_length=100)),
                ('foto', models.ImageField(null=True, upload_to=b'pequeFoto', blank=True)),
                ('tutor', models.ForeignKey(to='tutores.Tutores')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
