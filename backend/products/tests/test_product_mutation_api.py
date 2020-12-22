import json
from unittest.mock import Mock, patch
from products.tests import mocker
from graphene_django.utils.testing import GraphQLTestCase

ADD_PRODUCT_MUTATION = '''
    mutation createProductMutation($name: String!, $type: String!, $price: Float!, $description: String!) {
        createProduct(input: {
             name: $name
             type: $type 
             price: $price
             description: $description
        })
        {
            ok 
            product {
                id
                name
                type
                price
                description
            }
        }
    }
'''


class TestProductMutationApi(GraphQLTestCase):

    @patch('products.manager.ProductManager.create')
    def test_create_product_mutation(self, mock_create: Mock):
        mock_create.return_value = mocker.get_mock_product(add_id=True)
        variables = {
            'name': mocker.WELL_KNOWN_PRODUCT_NAME,
            'type': mocker.WELL_KNOWN_PRODUCT_TYPE,
            'description': mocker.WELL_KNOWN_PRODUCT_DESCRIPTION,
            'price': mocker.WELL_KNOWN_PRODUCT_PRICE
        }

        response = self.query(
            ADD_PRODUCT_MUTATION,
            op_name='createProductMutation',
            variables=variables
        )
        content = json.loads(response.content)
        data = content.get('data')
        create_product = data.get('createProduct')

        is_ok = create_product.get('ok')
        product = create_product.get('product')

        self.assertResponseNoErrors(response)
        self.assertIsNotNone(response)
        self.assertIsNotNone(data)
        self.assertTrue(is_ok)
        self.assertIsNotNone(product)
        self.assertEquals(str(mocker.WELL_KNOWN_PRODUCT_ID), product.get('id'))
        self.assertEquals(mocker.WELL_KNOWN_PRODUCT_NAME, product.get('name'))
        self.assertEquals(mocker.WELL_KNOWN_PRODUCT_TYPE, product.get('type'))
        self.assertEquals(mocker.WELL_KNOWN_PRODUCT_PRICE, product.get('price'))
        self.assertEquals(mocker.WELL_KNOWN_PRODUCT_DESCRIPTION, product.get('description'))

    @patch('products.manager.ProductManager.create')
    def test_create_product_mutation_with_none_values(self, mock_create: Mock):
        mock_create.return_value = mocker.get_mock_product(add_id=True)
        variables = {
            'name': None,
            'type': None,
            'description': None
        }

        response = self.query(
            ADD_PRODUCT_MUTATION,
            op_name='createProductMutation',
            variables=variables
        )
        self.assertResponseHasErrors(response)

    @patch('products.manager.ProductManager.create')
    def test_create_product_mutation_with_empty_name(self, mock_create: Mock):
        mock_create.return_value = mocker.get_mock_product(add_id=True)
        variables = {
            'name': '',
            'type': mocker.WELL_KNOWN_PRODUCT_TYPE,
            'description': mocker.WELL_KNOWN_PRODUCT_DESCRIPTION
        }

        response = self.query(
            ADD_PRODUCT_MUTATION,
            op_name='createProductMutation',
            variables=variables
        )
        self.assertResponseHasErrors(response)

    @patch('products.manager.ProductManager.create')
    def test_create_product_mutation_with_empty_incomplete_name(self, mock_create: Mock):
        mock_create.return_value = mocker.get_mock_product(add_id=True)
        variables = {
            'name': 'a',
            'type': mocker.WELL_KNOWN_PRODUCT_TYPE,
            'description': mocker.WELL_KNOWN_PRODUCT_DESCRIPTION
        }

        response = self.query(
            ADD_PRODUCT_MUTATION,
            op_name='createProductMutation',
            variables=variables
        )
        self.assertResponseHasErrors(response)

    @patch('products.manager.ProductManager.create')
    def test_create_product_mutation_with_empty_long_name(self, mock_create: Mock):
        mock_create.return_value = mocker.get_mock_product(add_id=True)
        variables = {
            'name': mocker.WELL_KNOWN_PRODUCT_NAME * 50,
            'type': mocker.WELL_KNOWN_PRODUCT_TYPE,
            'description': mocker.WELL_KNOWN_PRODUCT_DESCRIPTION
        }

        response = self.query(
            ADD_PRODUCT_MUTATION,
            op_name='createProductMutation',
            variables=variables
        )
        self.assertResponseHasErrors(response)

    @patch('products.manager.ProductManager.create')
    def test_create_product_mutation_with_empty_type(self, mock_create: Mock):
        mock_create.return_value = mocker.get_mock_product(add_id=True)
        variables = {
            'name': mocker.WELL_KNOWN_PRODUCT_NAME,
            'type': '',
            'description': mocker.WELL_KNOWN_PRODUCT_DESCRIPTION
        }

        response = self.query(
            ADD_PRODUCT_MUTATION,
            op_name='createProductMutation',
            variables=variables
        )
        self.assertResponseHasErrors(response)

    @patch('products.manager.ProductManager.create')
    def test_create_product_mutation_with_empty_incomplete_type(self, mock_create: Mock):
        mock_create.return_value = mocker.get_mock_product(add_id=True)
        variables = {
            'name': mocker.WELL_KNOWN_PRODUCT_NAME,
            'type': 'a',
            'description': mocker.WELL_KNOWN_PRODUCT_DESCRIPTION
        }

        response = self.query(
            ADD_PRODUCT_MUTATION,
            op_name='createProductMutation',
            variables=variables
        )
        self.assertResponseHasErrors(response)

    @patch('products.manager.ProductManager.create')
    def test_create_product_mutation_with_empty_long_type(self, mock_create: Mock):
        mock_create.return_value = mocker.get_mock_product(add_id=True)
        variables = {
            'name': mocker.WELL_KNOWN_PRODUCT_NAME,
            'type': mocker.WELL_KNOWN_PRODUCT_TYPE * 100,
            'description': mocker.WELL_KNOWN_PRODUCT_DESCRIPTION
        }

        response = self.query(
            ADD_PRODUCT_MUTATION,
            op_name='createProductMutation',
            variables=variables
        )
        self.assertResponseHasErrors(response)
