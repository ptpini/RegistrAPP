from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from .models import Attendance
from .serializers import UserSerializer, AttendanceSerializer

# Registro de usuario
class RegisterView(CreateAPIView):
    serializer_class = UserSerializer

# Iniciar sesión y obtener un token JWT
class LoginView(CreateAPIView):
    serializer_class = UserSerializer  # Define el serializer para validar datos entrantes

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_401_UNAUTHORIZED)

# Listar asistencias (requiere autenticación)
class AttendanceListView(ListAPIView):
    serializer_class = AttendanceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Attendance.objects.filter(student=self.request.user)

# Registrar asistencia
class RegisterAttendanceView(CreateAPIView):
    serializer_class = AttendanceSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = AttendanceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(student=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
