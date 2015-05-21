# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tutores', '0004_auto_20150519_2055'),
    ]

    operations = [
        migrations.AddField(
            model_name='tutores',
            name='fecha',
            field=models.DateTimeField(default=None, auto_now_add=True),
            preserve_default=False,
        ),
    ]
