from rest_framework import viewsets, filters
from rest_framework.response import Response
from .models import Book
from .serializers import BookSerializer

class BookViewSet(viewsets.ModelViewSet):
    serializer_class = BookSerializer
    queryset = Book.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'author']

    def get_queryset(self):
        queryset = super().get_queryset()
        disponibles = self.request.query_params.get('disponibles')
        if disponibles == 'true':
            queryset = queryset.filter(available_copies__gt=0)
        return queryset
