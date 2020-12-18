import graphene
from graphene_django.types import DjangoObjectType, ObjectType
from products.models import Attribute, Product


class AttributeType(DjangoObjectType):
    class Meta:
        model = Attribute

class ProductType(DjangoObjectType):
    attributes_list = graphene.List(AttributeType)
    class Meta:
        model = Product
        exclude = ('attributes', )


    def resolve_attributes_list(self, info):
        if self.attributes:
            return [{'name': attribute.name, 'value': attribute.value} for attribute in self.attributes]
        
        return list()


class Query(ObjectType):
    product = graphene.Field(ProductType, id=graphene.String())
    products = graphene.List(ProductType)


    def resolve_product(self, info, **kwargs):
        id = kwargs.get('id')

        if id:
            return Product.objects.get_by_id(id)

        return None

    def resolve_products(self, info, **kwargs):
        return Product.objects.products()

schema = graphene.Schema(query=Query)