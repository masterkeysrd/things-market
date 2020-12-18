from . import mocker
from django.test import TestCase
from unittest.mock import MagicMock, Mock, call, patch
from products.models import Product
from products.manager import ProductQuerySet


class TestProductQuerySet(TestCase):
    
    @patch('products.manager.super')
    def test_query_all(self, mock_query_set: MagicMock):

        query_set = ProductQuerySet(Product, using=[mocker.get_mock_records(100)])
        query_set.all()

        self.assertTrue(mock_query_set.called)
        mock_query_set.assert_called_once_with()

    def test_query_products(self):
        mock_instance = ProductQuerySet(Product)
        mock_instance.all = Mock()
        mock_instance.all.return_value = mock_instance

        ProductQuerySet.products(mock_instance)

        self.assertTrue(mock_instance.all.called)
        self.assertEquals(1, mock_instance.all.call_count)
        mock_instance.all.assert_called_once()
        
    @patch('products.manager.ProductQuerySet.filter')
    @patch('products.manager.ProductQuerySet.products')
    def test_query_get_by_name(self, mock_filter: Mock, mock_products: Mock):
        query_set = ProductQuerySet(Product)

        mock_filter.return_value = query_set
        mock_products.return_value = query_set
        
        name_query = 'TEST_SEARCH'
        ProductQuerySet.get_by_name(query_set, name_query)

        self.assertTrue(mock_filter.called)
        self.assertEquals(1, mock_filter.call_count)

        self.assertTrue(mock_products.called)
        self.assertEquals(1, mock_products.call_count)
        mock_products.assert_called_once_with(name=name_query)

    @patch('products.manager.ProductQuerySet.filter')
    @patch('products.manager.ProductQuerySet.products')
    def test_query_get_by_description(self, mock_filter: Mock, mock_products: Mock):
        query_set = ProductQuerySet(Product)

        mock_filter.return_value = query_set
        mock_products.return_value = query_set
        
        description_query = 'TEST_SEARCH'
        ProductQuerySet.get_by_description(query_set, description_query)

        self.assertTrue(mock_filter.called)
        self.assertEquals(1, mock_filter.call_count)

        self.assertTrue(mock_products.called)
        self.assertEquals(1, mock_products.call_count)
        mock_products.assert_called_once_with(description=description_query)

    @patch('products.manager.ProductQuerySet.get')
    def test_query_get_by_id(self, mock_get: Mock):
        query_set = ProductQuerySet(Product)

        mock_get.return_value = mocker.get_mock_product_with_id()

        product = query_set.get_by_id(mocker.WELL_KNOWN_PRODUCT_ID)

        self.assertTrue(mock_get.called)
        self.assertEquals(1, mock_get.call_count)
        self.assertEquals(call(id=mocker.WELL_KNOWN_PRODUCT_ID), mock_get.call_args)
        self.assertEquals(mocker.WELL_KNOWN_PRODUCT_ID, product.id)
        self.assertEquals(mocker.WELL_KNOWN_PRODUCT_NAME, product.name)
        self.assertEquals(mocker.WELL_KNOWN_PRODUCT_DESCRIPTION, product.description)
        self.assertEquals(mocker.WELL_KNOWN_PRODUCT_TYPE, product.type)

    @patch('products.manager.ProductQuerySet.get')
    def test_query_get_by_id(self, mock_get: Mock):
        query_set = ProductQuerySet(Product)

        mock_get.side_effect = Product.DoesNotExist()
        self.assertRaises(Product.DoesNotExist, query_set.get_by_id, mocker.NOT_KNOWN_PRODUCT_ID)

    
