from unittest import mock
from django.test import TestCase
from unittest.mock import Mock, patch
from products.tests import mocker
from products.schemas import Query
from products.models import Product

class TestProductQuery(TestCase):

    @patch('products.models.Product.objects.get_by_id')
    def test_resolve_product_whit_correct_id(self, mock_get_by_id: Mock):
        expected = mocker.get_mock_product_with_id()
        mock_get_by_id.return_value = expected

        query = Query()
        actual = query.resolve_product(None, id=mocker.WELL_KNOWN_PRODUCT_ID)

        self.assertEquals(expected, actual)

    @patch('products.models.Product.objects.get_by_id')
    def test_resolve_product_with_empty_id(self, mock_get_by_id: Mock):
        query = Query()
        actual = query.resolve_product(None, id="")
        self.assertIsNone(actual)
        self.assertEquals(False, mock_get_by_id.called)

    @patch('products.models.Product.objects.get_by_id')
    def test_resolve_product_with_none_id(self, mock_get_by_id: Mock):
        query = Query()
        actual = query.resolve_product(None, id="")
        self.assertIsNone(actual)
        self.assertEquals(False, mock_get_by_id.called)

    @patch('products.models.Product.objects.get_by_id')
    def test_resolve_product_with_bad_id(self, mock_get_by_id: Mock):
        mock_get_by_id.side_effect = Product.DoesNotExist()

        query = Query()
        self.assertRaises(Product.DoesNotExist, query.resolve_product, None, id=mocker.NOT_KNOWN_PRODUCT_ID)


