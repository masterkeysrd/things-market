# Generated by Django 3.0.5 on 2020-12-17 19:50

from django.db import migrations, models
import djongo.models.fields
import products.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', djongo.models.fields.ObjectIdField(auto_created=True, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=60)),
                ('description', models.TextField()),
                ('type', models.CharField(max_length=60)),
                ('attributes', djongo.models.fields.ArrayField(model_container=products.models.Attribute)),
            ],
        ),
    ]
