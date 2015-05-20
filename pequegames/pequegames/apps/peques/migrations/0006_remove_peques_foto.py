# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('peques', '0005_auto_20150519_1847'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='peques',
            name='foto',
        ),
    ]
