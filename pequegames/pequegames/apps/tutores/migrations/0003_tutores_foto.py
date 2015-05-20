# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tutores', '0002_auto_20150511_0618'),
    ]

    operations = [
        migrations.AddField(
            model_name='tutores',
            name='foto',
            field=models.ImageField(default=None, upload_to=b''),
            preserve_default=False,
        ),
    ]
