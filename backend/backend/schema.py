import graphene
from products import schemas as product_schema


class Query(product_schema.Query, graphene.ObjectType):
    pass


class Mutation(product_schema.Mutation, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
