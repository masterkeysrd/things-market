from typing import List
from products.models import Attribute, Product

def validate_attributes(attributes: List[Attribute]):
    for attribute in attributes:
      validate_field('attribute.name', attribute.name, required=True, min_len=3, max_len=60)
      validate_field('attribute.value', attribute.value, required=True, min_len=3, max_len=60)

def validate_field(name, value, required=False, min_length=None, max_length=None):

    if required and value is None:
        raise ValueError(f'The field {name} is required.')

    if min_length and len(value) < min_length:
        raise ValueError(f'The minium caraters allows in the field {name} is {min_length}.')

    if max_length and value and len(value) > max_length:
        raise ValueError(f'The maximun caraters allows in the field {name} is {max_length}.')


def validate_product(product: Product) -> bool:
    validate_field('name', product.name, required=True, min_length=3, max_length=60)
    validate_field('type', product.type, required=True, min_length=3, max_length=60)
    validate_field('description', product.description, required=True, min_length=3, max_length=250)

    if product.attributes:
        validate_attributes(product.attributes)