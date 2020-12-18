from djongo.models import Manager, QuerySet

class ProductQuerySet(QuerySet):

    def all(self):
        return super().all()
        
    def products(self):
        return self.all()

    def get_by_id(self, id):
        return self.get(id=id)

    def get_by_name(self, name):
        return self.products().filter(name=name)

    def get_by_description(self, description):
        return self.products().filter(description=description)


class ProductManager(Manager):
    def get_queryset(self) -> ProductQuerySet:
        return ProductQuerySet(self.model, using=self._db)
    
    def get_by_id(self, id):
        return self.get_queryset().get_by_id(id)

    def get_by_name(self, name):
        return self.get_queryset().get_by_name(name)

    def get_by_description(self, description):
        return self.get_queryset().get_by_description(description)

    def products(self) -> ProductQuerySet:
        return self.get_queryset().products()
