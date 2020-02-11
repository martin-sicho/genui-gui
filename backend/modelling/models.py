from django.db import models

# Create your models here.
from djcelery_model.models import TaskMixin
from polymorphic.models import PolymorphicModel

from commons.models import TaskShortcutsMixIn, PolymorphicTaskManager, NON_POLYMORPHIC_CASCADE, OverwriteStorage
from projects.models import DataSet


class AlgorithmMode(models.Model):
    name = models.CharField(unique=True, blank=False, max_length=32)


class ModelFileFormat(models.Model):
    fileExtension = models.CharField(max_length=32, blank=False, unique=True)
    description = models.TextField(max_length=10000, blank=True)


class Algorithm(models.Model):
    name = models.CharField(blank=False, max_length=128, unique=True)
    fileFormats = models.ManyToManyField(ModelFileFormat)
    validModes = models.ManyToManyField(AlgorithmMode)


class ModelParameter(models.Model):
    STRING = 'string'
    BOOL = 'bool'
    INTEGER = 'integer'
    FLOAT = 'float'
    CONTENT_TYPES = [
       (STRING, 'String'),
       (BOOL, 'Logical'),
       (INTEGER, 'Integer'),
       (FLOAT, 'Float'),
    ]

    name = models.CharField(max_length=128, blank=False)
    algorithm = models.ForeignKey(Algorithm, on_delete=models.CASCADE, null=False, related_name='parameters')
    contentType = models.CharField(max_length=32, choices=CONTENT_TYPES, default=STRING)

    class Meta:
        unique_together = ('name', 'algorithm')

class ModelBuilder(models.Model):
    name = models.CharField(max_length=128, blank=False, unique=True)


class Model(TaskShortcutsMixIn, TaskMixin, DataSet):
    objects = PolymorphicTaskManager()
    modelFile = models.FileField(null=True, blank=True, upload_to='models/', storage=OverwriteStorage()) # TODO: add custom logic to save in a directory specific to the project where the model is
    builder = models.ForeignKey(ModelBuilder, on_delete=models.CASCADE, null=False)

    @property
    def trainingStrategy(self):
        count = self.trainingStrategies.count()
        if count == 1:
            return self.trainingStrategies.get()
        elif count == 0:
            return None
        else:
            raise Exception("Training strategy returned more than one value. This indicates an integrity error in the database!")

    @property
    def validationStrategy(self):
        count = self.validationStrategies.count()
        if count == 1:
            return self.validationStrategies.get()
        elif count == 0:
            return None
        else:
            raise Exception("Validation strategy returned more than one value. This indicates an integrity error in the database!")


class TrainingStrategy(PolymorphicModel):
    algorithm = models.ForeignKey(Algorithm, on_delete=models.CASCADE, null=False)
    mode = models.ForeignKey(AlgorithmMode, on_delete=models.CASCADE, null=False)
    modelInstance = models.ForeignKey(Model, null=False, on_delete=models.CASCADE, related_name="trainingStrategies")


class ModelParameterValue(PolymorphicModel):
    parameter = models.ForeignKey(ModelParameter, on_delete=models.CASCADE, null=False)
    strategy = models.ForeignKey(TrainingStrategy, on_delete=NON_POLYMORPHIC_CASCADE, null=False, related_name='parameters')

    @staticmethod
    def parseValue(val):
        return str(val)


class ModelParameterStr(ModelParameterValue):
    value = models.CharField(max_length=1024)


class ModelParameterBool(ModelParameterValue):
    value = models.BooleanField(null=False)

    @staticmethod
    def parseValue(val):
        return bool(val)


class ModelParameterInt(ModelParameterValue):
    value = models.IntegerField(null=False)

    @staticmethod
    def parseValue(val):
        return int(val)


class ModelParameterFloat(ModelParameterValue):
    value = models.FloatField(null=False)

    @staticmethod
    def parseValue(val):
        return float(val)


class ModelPerformanceMetric(models.Model):
    name = models.CharField(unique=True, blank=False, max_length=128)
    description = models.TextField(max_length=10000, blank=True)


class ValidationStrategy(PolymorphicModel):
    metrics = models.ManyToManyField(ModelPerformanceMetric)
    modelInstance = models.ForeignKey(Model, null=False, on_delete=models.CASCADE, related_name='validationStrategies')


class CV(ValidationStrategy):
    cvFolds = models.IntegerField(blank=False)

    class Meta:
        abstract = True


class ValidationSet(ValidationStrategy):
    validSetSize = models.FloatField(blank=False)

    class Meta:
        abstract = True


class BasicValidationStrategy(ValidationSet, CV):
    pass


class ModelPerformance(PolymorphicModel):
    metric = models.ForeignKey(ModelPerformanceMetric, null=False, on_delete=models.CASCADE)
    value = models.FloatField(blank=False)
    model = models.ForeignKey(Model, null=False, on_delete=NON_POLYMORPHIC_CASCADE, related_name="performance")


class ModelPerformanceCV(ModelPerformance):
    fold = models.IntegerField(blank=False)

class ModelPerfomanceNN(ModelPerformance):
    epoch = models.IntegerField(null=False, blank=False)
    step = models.IntegerField(null=False, blank=False)


PARAM_VALUE_CTYPE_TO_MODEL_MAP = {
    ModelParameter.STRING : ModelParameterStr,
    ModelParameter.INTEGER : ModelParameterInt,
    ModelParameter.FLOAT : ModelParameterFloat,
    ModelParameter.BOOL : ModelParameterBool
}