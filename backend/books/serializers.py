from rest_framework import serializers
from .models import Book
from datetime import date

class BookSerializer(serializers.ModelSerializer):
    age = serializers.SerializerMethodField()

    class Meta:
        model = Book
        fields = '__all__'

    def get_age(self, obj):
        return date.today().year - obj.publication_year

    def validate_isbn(self, value):
        if len(value) not in [10, 13]:
            raise serializers.ValidationError("El ISBN debe tener 10 o 13 caracteres.")
        return value

    def validate_publication_year(self, value):
        current_year = date.today().year
        if value > current_year:
            raise serializers.ValidationError("El año de publicación no puede ser en el futuro.")
        return value
