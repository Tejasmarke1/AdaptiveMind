from django.http import JsonResponse
from django.views.decorators.http import require_GET

@require_GET
def home(request):
    name = request.GET.get("name", "Tejas")
    message = f"Hello, {name} from Django!"
    return JsonResponse({"message": message})   