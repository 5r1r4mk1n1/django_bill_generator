from django.db import models

# Create your models here.
class Mymodel(models.Model):
    sno=models.CharField(max_length=50,primary_key=True)
    date=models.CharField(max_length=50)    
    consignee=models.CharField(max_length=50)    
    destination=models.CharField(max_length=50)    
    weight=models.CharField(max_length=50)    
    amount=models.CharField(max_length=50)

class Billno(models.Model):
    billno = models.IntegerField()
    billtotal = models.BigIntegerField()
    
