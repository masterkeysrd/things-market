from djongo import models
from .manager import ProductManager
from graphene import String, List
from graphene_django.converter import convert_django_field

class Attribute(models.Model):
    name = models.CharField(max_length=60)
    value = models.CharField(max_length=60)

    class Meta:
        abstract = True

    def __str__(self) -> str:
        return self.name

class Product(models.Model, object):
    _id = models.ObjectIdField()
    name = models.CharField(max_length=60)
    description = models.TextField()
    price = models.FloatField()
    type = models.CharField(max_length=60)
    attributes = models.ArrayField(
        model_container=Attribute
    )

    @property
    def id(self):
        return self._id

    @id.setter
    def id(self, value):
        self._id = value

    objects = ProductManager()

    def __str__(self) -> str:
        return f'name={self.name}, description={self.description}'

@convert_django_field.register(models.ObjectIdField)
def convert_object_id_field_to_string(field, registry=None):
    return String(description=field.help_text, required=not field.null)

@convert_django_field.register(models.ArrayField)
def convert_array_field_to_list(field: models.ArrayField, registry=None):
    return List(of_type=field.model_container, description=field.help_text, required=not field.null)