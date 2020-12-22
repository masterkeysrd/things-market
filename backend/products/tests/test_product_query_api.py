import json

from bson.objectid import ObjectId
from products.models import Product
from products.tests import mocker
from unittest.mock import Mock, patch
from graphene_django.utils.testing import GraphQLTestCase


class TestProductQueryApi(GraphQLTestCase):

    def assertAllProductFields(self, product: dict, check_attributes=False):
        product_fields = ['id', 'name', 'type']
        self.assertIsInstance(product, dict)

        for field in product_fields:
            self.assertTrue(field in product)

        if check_attributes:
            self.assertTrue('attributes' in product)
            for attribute in product.get('attributes'):
                for field in ['name', 'value']:
                    self.assertTrue(field in attribute)

    def assertProductListFields(self, products: list, check_attributes=False):
        for product in products:
            self.assertAllProductFields(product, check_attributes)



    @patch('products.models.Product.objects.products')
    def test_product_query(self, mock_products: Mock):
        mock_products.return_value = mocker.get_mock_product_list(add_id=True)
        response = self.query( 'query { products { objects { id, name, type } } }')

        content: dict = json.loads(response.content)
        data = content.get('data')
        products = data.get('products')
        objects = products.get('objects')

        self.assertResponseNoErrors(response)
        self.assertIsInstance(objects, list)
        self.assertNotEquals(0, len(objects))
        self.assertProductListFields(objects)

    @patch('products.models.Product.objects.products')
    def test_product_query_with_attributes_list_empty(self, mock_products: Mock):
        mock_products.return_value = mocker.get_mock_product_list(add_id=True)
        response = self.query( 'query { products { objects { id, name, type attributes { name, value } } } }')

        content: dict = json.loads(response.content)
        data = content.get('data')
        products = data.get('products')
        objects = products.get('objects')

        self.assertResponseNoErrors(response)
        self.assertIsInstance(objects, list)
        self.assertNotEquals(0, len(objects))
        self.assertProductListFields(objects, check_attributes=True)

    @patch('products.models.Product.objects.products')
    def test_product_query_with_attributes_list_filled(self, mock_products: Mock):
        mock_products.return_value = mocker.get_mock_product_list(add_id=True, add_attributes=True)
        response = self.query( 'query { products { objects { id, name, type, attributes { name, value } } } }')

        content: dict = json.loads(response.content)
        data = content.get('data')
        products = data.get('products')
        objects = products.get('objects')

        self.assertResponseNoErrors(response)
        self.assertIsInstance(objects, list)
        self.assertNotEquals(0, len(objects))
        self.assertProductListFields(objects, check_attributes=True)

    @patch('products.models.Product.objects.get_by_id')
    def test_product_query_with_correct_id(self, mock_get_by_id: Mock):
        mock_get_by_id.return_value = mocker.get_mock_product(add_id=True)

        response = self.query(
            f'''query {{
                    product(id:"{mocker.WELL_KNOWN_PRODUCT_ID}"){{
                         id, name, description, type
                    }} 
                }}
            '''
        )

        content = json.loads(response.content)
        data = content.get('data')
        product = data.get('product')

        self.assertResponseNoErrors(response)
        self.assertIsInstance(product, dict)
        self.assertEquals(mocker.WELL_KNOWN_PRODUCT_ID, ObjectId(product.get('id')))
        self.assertEquals(mocker.WELL_KNOWN_PRODUCT_NAME, product.get('name'))
        self.assertEquals(mocker.WELL_KNOWN_PRODUCT_DESCRIPTION, product.get('description'))
        self.assertEquals(mocker.WELL_KNOWN_PRODUCT_TYPE, product.get('type'))

    @patch('products.models.Product.objects.get_by_id')
    def test_product_query_with_empty_id(self, mock_get_by_id: Mock):
        mock_get_by_id.return_value = mocker.get_mock_product(add_id=True)

        response = self.query(
            f'''query {{
                    product(id:""){{
                         id, name, description, type
                    }} 
                }}
            '''
        )

        content = json.loads(response.content)
        data = content.get('data')
        product = data.get('product')

        self.assertResponseNoErrors(response)
        self.assertIsNone(product)

    @patch('products.models.Product.objects.get_by_id')
    def test_product_query_with_none_id(self, mock_get_by_id: Mock):
        mock_get_by_id.return_value = mocker.get_mock_product(add_id=True)

        response = self.query(
            f'''query {{
                    product {{
                         id, name, description, type
                    }} 
                }}
            '''
        )

        content = json.loads(response.content)
        data = content.get('data')
        product = data.get('product')

        self.assertResponseNoErrors(response)
        self.assertIsNone(product)

    @patch('products.models.Product.objects.get_by_id')
    def test_product_query_with_bad_id(self, mock_get_by_id: Mock):
        mock_get_by_id.side_effect = Product.DoesNotExist()
        
        response = self.query(
            f'''query {{
                    product(id:"{mocker.NOT_KNOWN_PRODUCT_ID}"){{
                         id, name, description, type
                    }} 
                }}
            '''
        )

        content = json.loads(response.content)
        data = content.get('data')
        product = data.get('product')

        self.assertResponseHasErrors(response)
        self.assertIsNone(product)

    @patch('products.models.Product.objects.get_by_id')
    def test_product_query_with_bad_id(self, mock_get_by_id: Mock):
        mock_get_by_id.side_effect = Product.DoesNotExist()
        
        response = self.query(
            f'''query {{
                    product(id:"{mocker.NOT_KNOWN_PRODUCT_ID}"){{
                         id, name, description, type
                    }} 
                }}
            '''
        )

        content = json.loads(response.content)
        data = content.get('data')
        product = data.get('product')

        self.assertResponseHasErrors(response)
        self.assertIsNone(product)
        
