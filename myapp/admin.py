from django.contrib import admin
from myapp.models import Mymodel, Billno, GeneratedBills
# Register your models here.
admin.site.register(Mymodel)
admin.site.register(Billno)
admin.site.register(GeneratedBills)