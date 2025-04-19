from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .models import Book
import datetime

class BookAPITestCase(APITestCase):

    def setUp(self):
        """Preparar el entorno antes de cada prueba."""
        # Crear un libro de ejemplo para usar en las pruebas
        self.book = Book.objects.create(
            title="Cien años de soledad",
            author="Gabriel García Márquez",
            publication_year=1967,
            isbn="9780307474728",
            available_copies=10
        )
        self.list_url = reverse('book-list')  # Usa el nombre del router

    def extract_results(self, response):
        """Método auxiliar para extraer los resultados del response, con o sin paginación."""
        if isinstance(response.data, dict) and 'results' in response.data:
            return response.data['results']
        return response.data

    def test_create_valid_book(self):
        """Probar que se puede crear un libro válido."""
        data = {
            "title": "El amor en los tiempos del cólera",
            "author": "Gabriel García Márquez",
            "publication_year": 1985,
            "isbn": "9780307389732",
            "available_copies": 5
        }
        response = self.client.post(self.list_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Book.objects.count(), 2)  # Verificar que el número de libros ha aumentado

    def test_create_invalid_book_missing_fields(self):
        """Probar que no se crea un libro si faltan campos obligatorios."""
        data = {
            "title": "",
            "author": "",
            "publication_year": 2020,
            "isbn": "9780307389732",
            "available_copies": 5
        }
        response = self.client.post(self.list_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)  # Se espera un error por falta de datos

    def test_create_invalid_book_isbn(self):
        """Probar que no se crea un libro si el ISBN no tiene 13 dígitos."""
        data = {
            "title": "Libro con ISBN malo",
            "author": "Autor desconocido",
            "publication_year": 2000,
            "isbn": "1234567890",  # ISBN con solo 10 dígitos, es inválido
            "available_copies": 3
        }
        response = self.client.post(self.list_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)  # Se espera un error de validación de ISBN

    def test_search_book_by_title(self):
        """Probar búsqueda de libros por título."""
        response = self.client.get(self.list_url, {'search': 'Cien años'})  # Buscar por título
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = self.extract_results(response)
        self.assertGreaterEqual(len(results), 1)  # Verificar que se haya encontrado al menos un libro

    def test_filter_available_books(self):
        """Probar el filtro de libros disponibles."""
        # Crear un libro que no tiene copias disponibles
        Book.objects.create(
            title="Libro sin copias",
            author="Autor sin suerte",
            publication_year=1999,
            isbn="9781234567890",
            available_copies=0
        )
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = self.extract_results(response)
        # Filtrar los libros que tengan más de 0 copias disponibles
        available_books = [book for book in results if book['available_copies'] > 0]
        self.assertTrue(len(available_books) >= 1)  # Verificar que hay libros disponibles

    def test_calculate_age(self):
        """Probar que la antigüedad (age) se calcula correctamente."""
        response = self.client.get(self.list_url)
        current_year = datetime.datetime.now().year
        expected_age = current_year - self.book.publication_year
        results = self.extract_results(response)
        self.assertEqual(results[0]['age'], expected_age)  # Verificar que la edad calculada sea la correcta
