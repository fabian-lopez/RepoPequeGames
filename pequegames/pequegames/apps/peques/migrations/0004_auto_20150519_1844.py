# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('peques', '0003_peques_foto'),
    ]

    operations = [
        migrations.AlterField(
            model_name='peques',
            name='foto',
            field=models.ImageField(upload_to=b'pequeFoto'),
        ),
    ]
