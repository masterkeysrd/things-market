from django.test import TestCase

from . import mocker
from products.models import Product


class TestProductModel(TestCase):

    def test_create_product_with_no_attributes(self):
        product = mocker.get_mock_product()
        product.save()

        filled_product = Product.objects.get_by_id(product.id)

        self.assertIsNotNone(product.pk, 'After create a Product it should have an ID')
        self.assertIsNotNone(filled_product)
        self.assertEquals(product.pk, filled_product.pk)
        self.assertEquals(mocker.WELL_KNOWN_PRODUCT_NAME, filled_product.name)
        self.assertEquals(mocker.WELL_KNOWN_PRODUCT_DESCRIPTION, filled_product.description)
        self.assertEquals(mocker.WELL_KNOWN_PRODUCT_TYPE, filled_product.type)

    def test_create_product_with_attributes(self):
        product = mocker.get_mock_product(add_attributes=True)
        product.save()

        filled_product = Product.objects.get_by_id(product.id)

        self.assertIsNotNone(product.pk, 'After create a Product it should have an ID')
        self.assertEqual(2, len(filled_product.attributes), 'The length of attribute should be equals as inserted')

    def test_product_find_all_products(self):
        mock_produts = mocker.get_mock_product_list()
        for p in mock_produts:
            p.save()

        products_list = Product.objects.all()
        product = products_list.get(name=mocker.WELL_KNOWN_PRODUCT_NAME)

        self.assertEquals(len(mock_produts), products_list.count())
        self.assertIsNotNone(product)

    def test_save_empty_product(self):
        product = Product()
        product.save()

        filled_product = Product.objects.get_by_id(product.id)
        print(filled_product.name)

        self.assertIsNotNone(product.id)
        self.assertEquals(product.id, filled_product.id)
        self.assertEquals("", filled_product.name)
        self.assertEquals("", filled_product.description)
        self.assertEquals("", filled_product.type)
        self.assertIsNone(filled_product.attributes)

    def test_find_not_existing_product(self):
        product = mocker.get_mock_product()
        product.save()

        self.assertRaises(Product.DoesNotExist, Product.objects.get_by_id, mocker.NOT_KNOWN_PRODUCT_ID)

    def test_update_product(self):
        product = mocker.get_mock_product()
        product.save()

        filled_product = Product.objects.get_by_id(product.id)
        filled_product.name = "Changed Name"
        filled_product.description = "Changed Description"
        filled_product.save()

        updated_product = Product.objects.get_by_id(product.id)

        self.assertIsNotNone(product)
        self.assertIsNotNone(filled_product)
        self.assertIsNotNone(updated_product)

        self.assertEquals(product.id, filled_product.id)
        self.assertEquals(product.id, updated_product.id)

        self.assertEquals(filled_product.name, updated_product.name)
        self.assertEquals(filled_product.description, updated_product.description)
