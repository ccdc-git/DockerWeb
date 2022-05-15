import json
from json.decoder import JSONDecodeError
from django.core import exceptions
from django.http import response
from django.http.request import HttpRequest
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from items.models import Item


@method_decorator(csrf_exempt, name="dispatch")
class ItemPostView(View):
    def get(self, request: HttpRequest):
        items = Item.objects.all().order_by("pk")
        return response.JsonResponse(
            [
                {
                    "id": item.pk,
                    "name": item.name,
                    "price": item.price,
                }
                for item in items
            ],
            safe=False,
        )

    def post(self, request: HttpRequest):
        try:
            body = json.loads(request.body.decode())
            name = body["name"]
            price = body["price"]
        except (JSONDecodeError, KeyError):
            raise exceptions.ValidationError("parse error")

        item = Item(name=name, price=price)
        item.save()
        return response.JsonResponse(
            {
                "id": item.pk,
                "name": item.name,
                "price": item.price,
            }
        )


@method_decorator(csrf_exempt, name="dispatch")
class ItemView(View):
    def get(self, request: HttpRequest, pk):
        try:
            item = Item.objects.get(pk=pk)
        except Item.DoesNotExist:
            raise exceptions.ObjectDoesNotExist()
        return response.JsonResponse(
            {
                "id": item.pk,
                "name": item.name,
                "price": item.price,
            }
        )

    def put(self, request: HttpRequest, pk):
        try:
            body = json.loads(request.body.decode())
            name = body["name"]
            price = body["price"]
        except (JSONDecodeError, KeyError):
            raise exceptions.ValidationError("parse error")
        try:
            item: Item = Item.objects.get(pk=pk)
        except Item.DoesNotExist:
            raise exceptions.ObjectDoesNotExist()
        item.name = name
        item.price = price
        item.save()
        return response.JsonResponse(
            {
                "id": item.pk,
                "name": item.name,
                "price": item.price,
            }
        )

    def delete(self, request: HttpRequest, pk):
        try:
            item: Item = Item.objects.get(pk=pk)
            item.delete()
        except Item.DoesNotExist:
            raise exceptions.ObjectDoesNotExist()
        return response.HttpResponse(status=204)
