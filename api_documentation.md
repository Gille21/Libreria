## API

El sistema de gestión de biblioteca proporciona una API RESTful que permite realizar operaciones CRUD sobre los libros. A continuación se detallan los endpoints disponibles:

### 1. **GET /api/books/**
   - **Descripción**: Obtiene la lista completa de libros almacenados en la base de datos.
   - **Respuesta Exitosa**:
     ```json
     [
       {
         "id": 1,
         "title": "El Gran Gatsby",
         "author": "F. Scott Fitzgerald",
         "publication_year": 1925,
         "isbn": "9780743273565",
         "available_copies": 3
       },
       ...
     ]
     ```
   - **Código de Estado**: `200 OK`

### 2. **GET /api/books/{id}**
   - **Descripción**: Obtiene los detalles de un libro específico por su ID.
   - **Parámetros**: 
     - `id`: ID único del libro.
   - **Respuesta Exitosa**:
     ```json
     {
       "id": 1,
       "title": "El Gran Gatsby",
       "author": "F. Scott Fitzgerald",
       "publication_year": 1925,
       "isbn": "9780743273565",
       "available_copies": 3
     }
     ```
   - **Código de Estado**: `200 OK`
   - **Código de Estado si no se encuentra el libro**: `404 Not Found`

### 3. **POST /api/books/**
   - **Descripción**: Crea un nuevo libro en la base de datos.
   - **Cuerpo de la Solicitud**:
     ```json
     {
       "title": "Nuevo Libro",
       "author": "Autor Desconocido",
       "publication_year": 2021,
       "isbn": "1234567890123",
       "available_copies": 5
     }
     ```
   - **Respuesta Exitosa**:
     ```json
     {
       "id": 2,
       "title": "Nuevo Libro",
       "author": "Autor Desconocido",
       "publication_year": 2021,
       "isbn": "1234567890123",
       "available_copies": 5
     }
     ```
   - **Código de Estado**: `201 Created`

### 4. **PUT /api/books/{id}**
   - **Descripción**: Actualiza los detalles de un libro existente.
   - **Parámetros**:
     - `id`: ID único del libro.
   - **Cuerpo de la Solicitud**:
     ```json
     {
       "title": "El Gran Gatsby - Edición Especial",
       "author": "F. Scott Fitzgerald",
       "publication_year": 1925,
       "isbn": "9780743273565",
       "available_copies": 2
     }
     ```
   - **Respuesta Exitosa**:
     ```json
     {
       "id": 1,
       "title": "El Gran Gatsby - Edición Especial",
       "author": "F. Scott Fitzgerald",
       "publication_year": 1925,
       "isbn": "9780743273565",
       "available_copies": 2
     }
     ```
   - **Código de Estado**: `200 OK`
   - **Código de Estado si no se encuentra el libro**: `404 Not Found`

### 5. **DELETE /api/books/{id}**
   - **Descripción**: Elimina un libro de la base de datos por su ID.
   - **Parámetros**:
     - `id`: ID único del libro.
   - **Respuesta Exitosa**:
     ```json
     {
       "message": "Libro eliminado exitosamente."
     }
     ```
   - **Código de Estado**: `200 OK`
   - **Código de Estado si no se encuentra el libro**: `404 Not Found`

