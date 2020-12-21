from bson.objectid import ObjectId
from djongo.models import Manager, QuerySet

class ProductQuerySet(QuerySet):

    def all(self):
        return super().all()
        
    def products(self):
        return self.all()

    def get_by_id(self, id):
        id = ObjectId(id)
        return self.get(_id=id)

    def get_by_name(self, name):
        return self.products().filter(name__icontains=name)

    def get_by_description(self, description):
        return self.products().filter(description__icontains=description)

    def search(self, text_search):
        return self.get_by_name(text_search) | \
            self.get_by_description(text_search)


class ProductManager(Manager):
    def get_queryset(self) -> ProductQuerySet:
        return ProductQuerySet(self.model, using=self._db)
    
    def get_by_id(self, id):
        return self.get_queryset().get_by_id(id)

    def get_by_name(self, name):
        return self.get_queryset().get_by_name(name)

    def get_by_description(self, description):
        return self.get_queryset().get_by_description(description)

    def search(self, search_text):
        return self.get_queryset().search(search_text)

    def products(self) -> ProductQuerySet:
        return self.get_queryset().products()
