import graphene
from graphene_django.types import DjangoObjectType, ObjectType
from products.models import Product


class ProductType(DjangoObjectType):
    class Meta:
        model = Product


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