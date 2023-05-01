from django.shortcuts import render,HttpResponse
from django.http import JsonResponse, FileResponse
from myapp.models import Mymodel,Billno, GeneratedBills
import time
import json
import datetime
from myapp.generate_bill import generatepdf

# Create your views here.
def index(request):
    bills=Mymodel.objects.all()
    total=Billno.objects.get(id=1).billtotal
    return render(request,"index.html",{'bills':bills,'total':total})

def addentry(request):
    mydata=json.loads(request.POST.get('my_array'))
    total=json.loads(request.POST.get('total'))
    inttotal=int(total)
    sino=mydata[0]
    date=mydata[1]
    consignee=mydata[2]
    dest=mydata[3]
    weight=mydata[4]
    amount=mydata[5]

    obj=Mymodel(sno=sino,date=date,consignee=consignee,destination=dest,weight=weight,amount=amount)
    obj.save()
    bill = Billno.objects.get(id=1)
    bill.billtotal=inttotal
    bill.save()
    return HttpResponse("Added successfully")


def deleteitem(request):
    # print(Mymodel._meta.pk.name)
    row=int(request.POST.get('row'))
    bill = Mymodel.objects.get(sno=row)
    bill.delete()
    obj = Billno.objects.get(id=1)
    obj.billtotal=int(request.POST.get('total'))
    obj.save()

    print(str(row)+" deleted")
    return HttpResponse("Deleted successfully")

def getno(request):
    myint= Mymodel.objects.count()
    return JsonResponse({'count':myint,'date':datetime.date.today().strftime("%d/%m/%Y")})

def download(request):
    no = Billno.objects.all().count
    if no==0:
        return HttpResponse("No entries")
    else:
        bill = Billno.objects.get(id=1)
        no=bill.billno
        generatepdf(str(no))
        bill.billno=no+1
        bill.billtotal=0
        bill.save()
        Mymodel.objects.all().delete() 
        with open("static/bills/Bill_No_"+str(no)+".pdf","rb") as f:
            response = HttpResponse(f, content_type='application/pdf')
            response['Content-Disposition']='attachment;  filename="Bill_No_%s.pdf"' %no
            return response

def savechanges(request):
    data=json.loads(request.POST.get('table'))
    Mymodel.objects.all().delete()
    for i in range(1,len(data)-1):
        sino=data[i][0]
        date=data[i][1]
        consignee=data[i][2]
        dest=data[i][3]
        weight=data[i][4]
        amount=data[i][5]
        obj=Mymodel(sno=sino,date=date,consignee=consignee,destination=dest,weight=weight,amount=amount)
        obj.save()
    bil=Billno.objects.get(id=1)
    bil.billtotal=int(json.loads(request.POST.get('total')))
    bil.save()
        

    return HttpResponse("done")
