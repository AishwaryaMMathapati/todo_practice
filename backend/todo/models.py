from django.db import models

class Todo(models.Model):

    title=models.CharField(max_length=120)
    description=models.CharField(max_length=500)
    completed=models.BooleanField(default=False) #defult false


# to represent instances with name of tasks
    def __str__(self):
        return self.title

