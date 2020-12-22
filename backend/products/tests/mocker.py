import bson
from typing import List
from products.models import Product

WELL_KNOWN_PRODUCT_ID = bson.ObjectId("5fdbfe80b747cd99d130d14f")
WELL_KNOWN_PRODUCT_NAME = "Xiaomi Redmi Note 8"
WELL_KNOWN_PRODUCT_DESCRIPTION = "New Phone with some scratch in the screen."
WELL_KNOWN_PRODUCT_TYPE = "Phone"
WELL_KNOWN_PRODUCT_PRICE = 50

NOT_KNOWN_PRODUCT_ID = bson.ObjectId()


def get_mock_product(add_id=False, add_attributes=False) -> Product:
    product = Product(
        name=WELL_KNOWN_PRODUCT_NAME,
        description=WELL_KNOWN_PRODUCT_DESCRIPTION,
        type=WELL_KNOWN_PRODUCT_TYPE,
        price=WELL_KNOWN_PRODUCT_PRICE
    )

    if add_id:
        product.id = WELL_KNOWN_PRODUCT_ID

    if add_attributes:
        product.attributes = [
            {
                'name': 'Display',
                'value': '7.1 inches',
            },
            {
                'name': 'Camera',
                'value': '64MP',
            }
        ]

    return product


def get_mock_product_list(quantity=10, add_id=False, add_attributes=False):
    product_list: List[Product] = list()
    product_list.append(get_mock_product(add_id, add_attributes))

    for i in range(1, quantity + 1):
        product = Product(
            name=f'Product {i}',
            description=f"Description of product {i}",
            type=f"Product Type {i}")

        if add_id:
            product.id = bson.ObjectId()

        if add_attributes:
            product.attributes = [{'name': f'attribute_test {i}', 'value': f'attribute_value {i}'}]

        product_list.append(product)

    return product_list
