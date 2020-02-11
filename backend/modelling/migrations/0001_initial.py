# Generated by Django 2.2.8 on 2020-02-11 11:45

import commons.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('projects', '0002_delete_dataprovider'),
        ('contenttypes', '0002_remove_content_type_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='Algorithm',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='AlgorithmMode',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=32, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Model',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=256)),
                ('description', models.TextField(blank=True, max_length=10000)),
                ('created', models.DateTimeField()),
                ('updated', models.DateTimeField(verbose_name='last_updated')),
                ('modelFile', models.FileField(blank=True, null=True, storage=commons.models.OverwriteStorage(), upload_to='models/')),
            ],
            options={
                'abstract': False,
            },
            bases=(commons.models.TaskShortcutsMixIn, models.Model),
        ),
        migrations.CreateModel(
            name='ModelBuilder',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='ModelFileFormat',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fileExtension', models.CharField(max_length=32, unique=True)),
                ('description', models.TextField(blank=True, max_length=10000)),
            ],
        ),
        migrations.CreateModel(
            name='ModelParameter',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128)),
                ('contentType', models.CharField(choices=[('string', 'String'), ('bool', 'Logical'), ('integer', 'Integer'), ('float', 'Float')], default='string', max_length=32)),
                ('algorithm', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='parameters', to='modelling.Algorithm')),
            ],
            options={
                'unique_together': {('name', 'algorithm')},
            },
        ),
        migrations.CreateModel(
            name='ModelParameterValue',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('parameter', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='modelling.ModelParameter')),
                ('polymorphic_ctype', models.ForeignKey(editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='polymorphic_modelling.modelparametervalue_set+', to='contenttypes.ContentType')),
            ],
            options={
                'abstract': False,
                'base_manager_name': 'objects',
            },
        ),
        migrations.CreateModel(
            name='ModelPerformance',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.FloatField()),
            ],
            options={
                'abstract': False,
                'base_manager_name': 'objects',
            },
        ),
        migrations.CreateModel(
            name='ModelPerformanceMetric',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128, unique=True)),
                ('description', models.TextField(blank=True, max_length=10000)),
            ],
        ),
        migrations.CreateModel(
            name='ValidationStrategy',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('metrics', models.ManyToManyField(to='modelling.ModelPerformanceMetric')),
                ('modelInstance', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='validationStrategies', to='modelling.Model')),
                ('polymorphic_ctype', models.ForeignKey(editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='polymorphic_modelling.validationstrategy_set+', to='contenttypes.ContentType')),
            ],
            options={
                'abstract': False,
                'base_manager_name': 'objects',
            },
        ),
        migrations.CreateModel(
            name='BasicValidationStrategy',
            fields=[
                ('validationstrategy_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='modelling.ValidationStrategy')),
                ('cvFolds', models.IntegerField()),
                ('validSetSize', models.FloatField()),
            ],
            options={
                'abstract': False,
            },
            bases=('modelling.validationstrategy',),
        ),
        migrations.CreateModel(
            name='ModelParameterBool',
            fields=[
                ('modelparametervalue_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='modelling.ModelParameterValue')),
                ('value', models.BooleanField()),
            ],
            options={
                'abstract': False,
                'base_manager_name': 'objects',
            },
            bases=('modelling.modelparametervalue',),
        ),
        migrations.CreateModel(
            name='ModelParameterFloat',
            fields=[
                ('modelparametervalue_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='modelling.ModelParameterValue')),
                ('value', models.FloatField()),
            ],
            options={
                'abstract': False,
                'base_manager_name': 'objects',
            },
            bases=('modelling.modelparametervalue',),
        ),
        migrations.CreateModel(
            name='ModelParameterInt',
            fields=[
                ('modelparametervalue_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='modelling.ModelParameterValue')),
                ('value', models.IntegerField()),
            ],
            options={
                'abstract': False,
                'base_manager_name': 'objects',
            },
            bases=('modelling.modelparametervalue',),
        ),
        migrations.CreateModel(
            name='ModelParameterStr',
            fields=[
                ('modelparametervalue_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='modelling.ModelParameterValue')),
                ('value', models.CharField(max_length=1024)),
            ],
            options={
                'abstract': False,
                'base_manager_name': 'objects',
            },
            bases=('modelling.modelparametervalue',),
        ),
        migrations.CreateModel(
            name='ModelPerfomanceNN',
            fields=[
                ('modelperformance_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='modelling.ModelPerformance')),
                ('epoch', models.IntegerField()),
                ('step', models.IntegerField()),
            ],
            options={
                'abstract': False,
                'base_manager_name': 'objects',
            },
            bases=('modelling.modelperformance',),
        ),
        migrations.CreateModel(
            name='ModelPerformanceCV',
            fields=[
                ('modelperformance_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='modelling.ModelPerformance')),
                ('fold', models.IntegerField()),
            ],
            options={
                'abstract': False,
                'base_manager_name': 'objects',
            },
            bases=('modelling.modelperformance',),
        ),
        migrations.CreateModel(
            name='TrainingStrategy',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('algorithm', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='modelling.Algorithm')),
                ('mode', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='modelling.AlgorithmMode')),
                ('modelInstance', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='trainingStrategies', to='modelling.Model')),
                ('polymorphic_ctype', models.ForeignKey(editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='polymorphic_modelling.trainingstrategy_set+', to='contenttypes.ContentType')),
            ],
            options={
                'abstract': False,
                'base_manager_name': 'objects',
            },
        ),
        migrations.AddField(
            model_name='modelperformance',
            name='metric',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='modelling.ModelPerformanceMetric'),
        ),
        migrations.AddField(
            model_name='modelperformance',
            name='model',
            field=models.ForeignKey(on_delete=commons.models.NON_POLYMORPHIC_CASCADE, related_name='performance', to='modelling.Model'),
        ),
        migrations.AddField(
            model_name='modelperformance',
            name='polymorphic_ctype',
            field=models.ForeignKey(editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='polymorphic_modelling.modelperformance_set+', to='contenttypes.ContentType'),
        ),
        migrations.AddField(
            model_name='modelparametervalue',
            name='strategy',
            field=models.ForeignKey(on_delete=commons.models.NON_POLYMORPHIC_CASCADE, related_name='parameters', to='modelling.TrainingStrategy'),
        ),
        migrations.AddField(
            model_name='model',
            name='builder',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='modelling.ModelBuilder'),
        ),
        migrations.AddField(
            model_name='model',
            name='polymorphic_ctype',
            field=models.ForeignKey(editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='polymorphic_modelling.model_set+', to='contenttypes.ContentType'),
        ),
        migrations.AddField(
            model_name='model',
            name='project',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='projects.Project'),
        ),
        migrations.AddField(
            model_name='algorithm',
            name='fileFormats',
            field=models.ManyToManyField(to='modelling.ModelFileFormat'),
        ),
        migrations.AddField(
            model_name='algorithm',
            name='validModes',
            field=models.ManyToManyField(to='modelling.AlgorithmMode'),
        ),
    ]
