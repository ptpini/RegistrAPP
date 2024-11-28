from django.db import models
from django.contrib.auth.models import User

class Attendance(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    subject = models.CharField(max_length=255, default='General')  # Valor predeterminado
    status = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.student.username} - {self.subject} - {self.status}"
