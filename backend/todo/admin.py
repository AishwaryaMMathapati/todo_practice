from django.contrib import admin
from .models import Todo
class TodoAdmin(admin.ModelAdmin):
    list_display=("title","description","completed")

# we have to register model first 
admin.site.register(Todo,TodoAdmin)


