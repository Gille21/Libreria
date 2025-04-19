from django.db import models
from datetime import date

class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    publication_year = models.PositiveIntegerField()
    isbn = models.CharField(max_length=13, unique=True)
    available_copies = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.title} by {self.author}"

    def age(self):
        current_year = date.today().year
        return current_year - self.publication_year
