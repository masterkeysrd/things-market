from django.test import TestCase
from unittest.mock import Mock, patch

from products.tests import mocker
from products.models import Product
from products.schemas import CreateProduct


class TestProductQuery(TestCase):

    @patch('products.manager.ProductManager.create')
    def test_create_product_mutation(self, mock_create: Mock):
        mock_create.return_value = mocker.get_mock_product(add_id=True)

        product_instance = Product(
            name=mocker.WELL_KNOWN_PRODUCT_NAME,
            description=mocker.WELL_KNOWN_PRODUCT_DESCRIPTION,
            type=mocker.WELL_KNOWN_PRODUCT_TYPE,
            price=mocker.WELL_KNOWN_PRODUCT_PRICE,
        )

        expected = mocker.get_mock_product(add_id=True)
        response = CreateProduct.mutate(None, None, product_instance)

        self.assertTrue(response.ok)
        self.assertEquals(expected, response.product)
