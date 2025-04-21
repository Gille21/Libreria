import os
import sys  # 💡 Añadido para modificar el sys.path
import django
import random

# 💡 Asegura que el directorio base del proyecto esté en el path
sys.path.append("/app")  # Esto permite importar library_api correctamente

# Configura Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'library_api.settings')
django.setup()

from books.models import Book

# Libros de ejemplo
sample_books = [
    {"title": "Cien años de soledad", "author": "Gabriel García Márquez", "publication_year": 1967, "isbn": "9780307474728"},
    {"title": "1984", "author": "George Orwell", "publication_year": 1949, "isbn": "9780451524935"},
    {"title": "El Principito", "author": "Antoine de Saint-Exupéry", "publication_year": 1943, "isbn": "9780156012195"},
    {"title": "El Señor de los Anillos: La Comunidad del Anillo", "author": "J.R.R. Tolkien", "publication_year": 1954, "isbn": "9780618640157"},
    {"title": "Don Quijote de la Mancha", "author": "Miguel de Cervantes", "publication_year": 1605, "isbn": "9788420412146"},
    {"title": "Rayuela", "author": "Julio Cortázar", "publication_year": 1963, "isbn": "9788437604572"},
    {"title": "Matar un ruiseñor", "author": "Harper Lee", "publication_year": 1960, "isbn": "9780061120084"},
    {"title": "Crimen y castigo", "author": "Fiódor Dostoyevski", "publication_year": 1866, "isbn": "9780143107637"},
    {"title": "Orgullo y prejuicio", "author": "Jane Austen", "publication_year": 1813, "isbn": "9780141439518"},
    {"title": "El Gran Gatsby", "author": "F. Scott Fitzgerald", "publication_year": 1925, "isbn": "9780743273565"},
    {"title": "Los juegos del hambre", "author": "Suzanne Collins", "publication_year": 2008, "isbn": "9780439023528"},
    {"title": "Harry Potter y la piedra filosofal", "author": "J.K. Rowling", "publication_year": 1997, "isbn": "9780590353427"},
    {"title": "El código Da Vinci", "author": "Dan Brown", "publication_year": 2003, "isbn": "9780307474278"},
    {"title": "La Odisea", "author": "Homero", "publication_year": 800, "isbn": "9780140268867"},  # 💡 Reemplacé el texto por número para evitar errores
    {"title": "En busca del tiempo perdido: Por el camino de Swann", "author": "Marcel Proust", "publication_year": 1913, "isbn": "9780142437964"},
    {"title": "Ulises", "author": "James Joyce", "publication_year": 1922, "isbn": "9781840226355"},
    {"title": "Los miserables", "author": "Victor Hugo", "publication_year": 1862, "isbn": "9780451419439"},
    {"title": "El Hobbit", "author": "J.R.R. Tolkien", "publication_year": 1937, "isbn": "9780547928227"},
    {"title": "Pedro Páramo", "author": "Juan Rulfo", "publication_year": 1955, "isbn": "9780802133908"},
    {"title": "El nombre de la rosa", "author": "Umberto Eco", "publication_year": 1980, "isbn": "9780156001311"},
]


# Crear libros en la base de datos con copias disponibles aleatorias entre 0 y 10
for data in sample_books:
    available_copies = random.randint(0, 10)
    book, created = Book.objects.get_or_create(
        isbn=data["isbn"],
        defaults={**data, "available_copies": available_copies}
    )
    if created:
        print(f"📘 Libro creado: {book}")
    else:
        print(f"📚 Ya existe: {book}")
