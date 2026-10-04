from datetime import datetime, timezone
from django.http import JsonResponse
from django.shortcuts import render


def home(request):
    return render(request, "index.html", {"served_at": datetime.now(timezone.utc).isoformat()})


def hello(request):
    return JsonResponse({"framework": "django", "message": "Hello from Django Compute", "served_at": datetime.now(timezone.utc).isoformat()})
