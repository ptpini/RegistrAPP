from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse  # Agrega esta línea para importar HttpResponse

def home(request):
    return HttpResponse("Bienvenido a RegistrAPP API")  # Vista raíz para la página principal

urlpatterns = [
    path('admin/', admin.site.urls),  # Rutas del panel de administración
    path('api/', include('api.urls')),  # Incluye las rutas de la aplicación API
    path('', home),  # Vista raíz
]
