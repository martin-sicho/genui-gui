# Generated by Django 2.2.8 on 2020-01-27 15:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('modelling', '0002_modelperfomancenn'),
    ]

    operations = [
        migrations.AlterField(
            model_name='model',
            name='modelFile',
            field=models.FileField(blank=True, null=True, upload_to='qsar/models/'),
        ),
    ]
