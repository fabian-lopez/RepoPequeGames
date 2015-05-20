# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('peques', '0002_remove_peques_foto'),
    ]

    operations = [
        migrations.AddField(
            model_name='peques',
            name='foto',
            field=models.ImageField(null=True, upload_to=b'pequeFoto', blank=True),
            preserve_default=True,
        ),
    ]
