# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('records', '0003_auto_20150521_0146'),
    ]

    operations = [
        migrations.AlterField(
            model_name='records',
            name='tiempo',
            field=models.IntegerField(),
        ),
    ]
