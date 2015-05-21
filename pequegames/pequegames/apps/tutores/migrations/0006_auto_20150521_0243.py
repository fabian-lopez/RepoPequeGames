# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tutores', '0005_tutores_fecha'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tutores',
            name='foto',
            field=models.ImageField(null=True, upload_to=b'usuarios', blank=True),
        ),
        migrations.AlterField(
            model_name='tutores',
            name='telefono',
            field=models.BigIntegerField(null=True, blank=True),
        ),
    ]
