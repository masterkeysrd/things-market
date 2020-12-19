import graphene
from graphene_django.types import DjangoObjectType, ObjectType
from products.models import Attribute, Product


class AttributeType(DjangoObjectType):
    class Meta:
        model = Attribute

class ProductType(DjangoObjectType):
    id = graphene.String()
    attributes = graphene.List(AttributeType)
    class Meta:
        model = Product
        exclude = ('_id', )


    def resolve_attributes(self, info):
        if self.attributes:
            return [AttributeType(name=attribute.get('name'), value=attribute.get('value')) for attribute in self.attributes]
        
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