from typing import List
from products.models import Product

WELL_KNOWN_PRODUCT_ID = "5fdbfe80b747cd99d130d14f"
WELL_KNOWN_PRODUCT_NAME = "Xiaomi Redmi Note 8"
WELL_KNOWN_PRODUCT_DESCRIPTION = "New Phone with some scratch in the screen."
WELL_KNOWN_PRODUCT_TYPE = "Phone"

NOT_KNOWN_PRODUCT_ID = "xxxxx80b747cd99d130d1"

def get_mock_product():
    return Product(
        name=WELL_KNOWN_PRODUCT_NAME,
        description=WELL_KNOWN_PRODUCT_DESCRIPTION,
        type=WELL_KNOWN_PRODUCT_TYPE
    )

def get_mock_product_with_id():
    product = get_mock_product()
    product.id = WELL_KNOWN_PRODUCT_ID
    return product

def get_mock_product_with_attributes():
    product = get_mock_product()
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

def get_mock_product_list():
    product_list: List[Product] = list()
    product_list.append(get_mock_product())
    for i in range(9):
        product_list.append(
            Product(
                name=f'Product {i}',
                description=f"Description of product {i}",
                type=f"Product Type {i}"
            )
        )
    return product_list