# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('records', '0002_auto_20150520_2059'),
    ]

    operations = [
        migrations.AlterField(
            model_name='records',
            name='tiempo',
            field=models.CharField(max_length=15),
        ),
    ]
