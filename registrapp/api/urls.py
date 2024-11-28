from django.urls import path
from .views import RegisterView, LoginView, AttendanceListView, RegisterAttendanceView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('attendance/', AttendanceListView.as_view(), name='attendance-list'),
    path('attendance/register/', RegisterAttendanceView.as_view(), name='register-attendance'),
]
