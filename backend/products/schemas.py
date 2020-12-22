import graphene
from graphene_django.types import DjangoObjectType, ObjectType

from products.utils import get_paginator
from products.models import Attribute, Product
from products.validators import validate_product


class PaginatedType(graphene.ObjectType):
    page = graphene.Int()
    pages = graphene.Int()
    total = graphene.Int()
    has_next = graphene.Boolean()
    has_prev = graphene.Boolean()


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

class ProductPaginatedType(PaginatedType):
    objects = graphene.List(ProductType)

class Query(ObjectType):
    product = graphene.Field(ProductType, id=graphene.String())
    products = graphene.Field(
        ProductPaginatedType, 
        page=graphene.Int(),
        page_size=graphene.Int(),
        search_text=graphene.String(required=False)
    )


    def resolve_product(self, info, **kwargs):
        id = kwargs.get('id')

        if id:
            return Product.objects.get_by_id(id)

        return None

    def resolve_products(self, info, **kwargs):
        page = kwargs.get('page', 1)
        page_size = kwargs.get('page_size', 10)
        search_text = kwargs.get('search_text')

        query = None
        
        if search_text:
            query = Product.objects.search(search_text)
        else:
            query = Product.objects.products()

        return get_paginator(query, page_size, page, ProductPaginatedType)


class AttributeInput(graphene.InputObjectType):
    name = graphene.String(required=True)
    value = graphene.String(required=True)


class ProductInput(graphene.InputObjectType):
    id = graphene.String()
    name = graphene.String(required=True)
    type = graphene.String(required=True)
    price= graphene.Float(required=True)
    description = graphene.String(required=True)
    attributes = graphene.List(AttributeInput)


class CreateProduct(graphene.Mutation):
    class Arguments:
        input = ProductInput(required=True)

    ok = graphene.Boolean()
    product = graphene.Field(ProductType)

    @staticmethod
    def mutate(root, info, input=None):
        validate_product(input)
        product_instance = Product.objects.create(
            name=input.name,
            type=input.type,
            description=input.description,
            attributes=input.attributes
        )

        return CreateProduct(ok=True, product=product_instance)


class UpdateProduct(graphene.Mutation):
    class Arguments:
        input = ProductInput(required=True)

    ok = graphene.Boolean()
    product = graphene.Field(ProductType)

    @staticmethod
    def mutate(root, info, input=None):
        product = Product.objects.get_by_id(input.id)

        if input.name:
            product.name = input.name

        if input.type:
            product.type = input.type

        if input.description:
            product.description = input.description

        if input.attributes:
            product.attributes = input.attributes

        validate_product(product)
        product.save()

        return UpdateProduct(ok=True, product=product)

class DeleteProduct(graphene.Mutation):
    class Arguments:
        id = graphene.String(required=True)

    ok = graphene.Boolean()
    product = graphene.Field(ProductType)

    @staticmethod
    def mutate(root, info, id=None):
        product = Product.objects.get_by_id(id)
        product.delete()
        return DeleteProduct(ok=True, product=product)


class Mutation(ObjectType):
    create_product = CreateProduct.Field()
    update_product = UpdateProduct.Field()
    delete_product = DeleteProduct.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)