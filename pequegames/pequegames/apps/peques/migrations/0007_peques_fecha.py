# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('peques', '0006_remove_peques_foto'),
    ]

    operations = [
        migrations.AddField(
            model_name='peques',
            name='fecha',
            field=models.DateTimeField(default=None, auto_now_add=True),
            preserve_default=False,
        ),
    ]
