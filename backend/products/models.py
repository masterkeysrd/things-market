from djongo import models

class Attribute(models.Model):
    name = models.CharField(max_length=60)
    value = models.CharField(max_length=60)

    class Meta:
        abstract = True

    def __str__(self) -> str:
        return self.name

class Product(models.Model):
    id = models.ObjectIdField(primary_key=True)
    name = models.CharField(max_length=60)
    description = models.TextField()
    type = models.CharField(max_length=60)
    attributes = models.ArrayField(
        model_container=Attribute
    )

    def __str__(self) -> str:
        return f'name={self.name}, description={self.description}'