# we create serializers for models 
# job of the serializers is basically convert model instances to json so that the frontend can work on recived data easily 
# and json is the standard for data exchange on the web

from rest_framework import serializers 
from todo.models import Todo

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model =Todo
        fields = '__all__' #doubt
        field=('id','title','description','completed')
