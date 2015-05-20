# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tutores', '0003_tutores_foto'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tutores',
            name='foto',
            field=models.ImageField(upload_to=b'usuarios'),
        ),
    ]
