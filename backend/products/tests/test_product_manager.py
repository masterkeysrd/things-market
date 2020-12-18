from django.test import TestCase
from unittest.mock import Mock, call, patch

from products.tests import mocker
from products.models import Product
from products.manager import ProductManager, ProductQuerySet

class TestProductManager(TestCase):

    def test_get_query_set(self):
        product_manager = ProductManager()
        query_set = product_manager.get_queryset()
        self.assertIsInstance(query_set, ProductQuerySet)

    @patch('products.manager.ProductQuerySet.get_by_name')
    def test_get_by_name(self, mock_get_by_name: Mock):
        product_manager = ProductManager()

        name_query = "TEST_NAME"
        product_manager.get_by_name(name_query)

        self.assertTrue(mock_get_by_name.called)
        self.assertEquals(1, mock_get_by_name.call_count)
        self.assertEquals(call(name_query), mock_get_by_name.call_args)

    @patch('products.manager.ProductQuerySet.get_by_description')
    def test_get_by_description(self, mock_get_by_description: Mock):
        product_manager = ProductManager()

        description_query = "DESCRIPTION_NAME"
        product_manager.get_by_description(description_query)

        self.assertTrue(mock_get_by_description.called)
        self.assertEquals(1, mock_get_by_description.call_count)
        self.assertEquals(call(description_query), mock_get_by_description.call_args)

    @patch('products.manager.ProductQuerySet.products')
    def test_get_products(self, mock_products):
        product_manager = ProductManager()

        product_manager.products()

        self.assertTrue(mock_products.called)
        self.assertEquals(1, mock_products.call_count)
        self.assertEquals(call(), mock_products.call_args)

        
    @patch('products.manager.ProductQuerySet.get_by_id')
    def test_get_product_by_id(self, mock_get_by_id: Mock):
        product_manager = ProductManager()

        mock_get_by_id.return_value = mocker.get_mock_product(add_id=True)
        product = product_manager.get_by_id(mocker.WELL_KNOWN_PRODUCT_ID)
        
        self.assertTrue(mock_get_by_id.called)
        self.assertEquals(1, mock_get_by_id.call_count)
        self.assertEquals(call(mocker.WELL_KNOWN_PRODUCT_ID), mock_get_by_id.call_args)
        self.assertEquals(mocker.WELL_KNOWN_PRODUCT_ID, product.id)
        self.assertEquals(mocker.WELL_KNOWN_PRODUCT_NAME, product.name)
        self.assertEquals(mocker.WELL_KNOWN_PRODUCT_DESCRIPTION, product.description)
        self.assertEquals(mocker.WELL_KNOWN_PRODUCT_TYPE, product.type)

    
    @patch('products.manager.ProductQuerySet.get_by_id')
    def test_get_product_by_bad_id(self, mock_get_by_id: Mock):
        mock_get_by_id.side_effect = Product.DoesNotExist()

        product_manager = ProductManager()
        self.assertRaises(Product.DoesNotExist, product_manager.get_by_id, mocker.NOT_KNOWN_PRODUCT_ID)
